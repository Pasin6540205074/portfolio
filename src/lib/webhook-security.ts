import crypto from 'crypto';

// Webhook secret - in production, store in environment variables
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'boom-portfolio-webhook-secret-2024';

/**
 * Generate HMAC signature for webhook payload
 */
export function generateSignature(payload: string): string {
  return crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(payload, 'utf8')
    .digest('hex');
}

/**
 * Verify webhook signature
 */
export function verifySignature(payload: string, signature: string): boolean {
  const expectedSignature = generateSignature(payload);
  
  // Use crypto.timingSafeEqual to prevent timing attacks
  const expectedBuffer = Buffer.from(`sha256=${expectedSignature}`, 'utf8');
  const actualBuffer = Buffer.from(signature, 'utf8');
  
  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }
  
  return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
}

/**
 * Generate signature header for outgoing webhooks
 */
export function createSignatureHeader(payload: string): string {
  return `sha256=${generateSignature(payload)}`;
}

/**
 * Validate incoming webhook request
 */
export function validateWebhookRequest(
  payload: string, 
  signatureHeader: string | null
): { valid: boolean; error?: string } {
  if (!signatureHeader) {
    return { valid: false, error: 'Missing signature header' };
  }

  if (!signatureHeader.startsWith('sha256=')) {
    return { valid: false, error: 'Invalid signature format' };
  }

  const isValid = verifySignature(payload, signatureHeader);
  
  if (!isValid) {
    return { valid: false, error: 'Invalid signature' };
  }

  return { valid: true };
}

/**
 * Generate session-based token for additional security
 */
export function generateSessionToken(sessionId: string): string {
  const timestamp = Date.now().toString();
  const data = `${sessionId}:${timestamp}`;
  const signature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(data, 'utf8')
    .digest('hex');
  
  return `${timestamp}.${signature}`;
}

/**
 * Verify session token (valid for 1 hour)
 */
export function verifySessionToken(sessionId: string, token: string): boolean {
  try {
    const [timestamp, signature] = token.split('.');
    
    if (!timestamp || !signature) {
      return false;
    }

    // Check if token is not older than 1 hour
    const tokenTime = parseInt(timestamp);
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    if (now - tokenTime > oneHour) {
      return false;
    }

    // Verify signature
    const data = `${sessionId}:${timestamp}`;
    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(data, 'utf8')
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    return false;
  }
}
