// Analytics and user tracking utilities

interface UserInfo {
  timestamp: string;
  sessionId: string;
  userAgent: string;
  language: string;
  timezone: string;
  screenResolution: string;
  referrer: string;
  currentUrl: string;
  ipAddress?: string;
  fingerprint: string;
}

interface ButtonClickEvent {
  eventType: 'button_click';
  buttonType: string;
  buttonText: string;
  pageUrl: string;
  elementId?: string;
  productId?: string;
  productName?: string;
  price?: number;
  currency?: string;
  userInfo: UserInfo;
  additionalData?: Record<string, any>;
}

// Generate a simple browser fingerprint
function generateFingerprint(): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Browser fingerprint', 2, 2);
  }

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL()
  ].join('|');

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(36);
}

// Get or create session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('boom_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    sessionStorage.setItem('boom_session_id', sessionId);
  }
  return sessionId;
}

// Collect user information
function collectUserInfo(): UserInfo {
  return {
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    userAgent: navigator.userAgent,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screenResolution: `${screen.width}x${screen.height}`,
    referrer: document.referrer || 'direct',
    currentUrl: window.location.href,
    fingerprint: generateFingerprint()
  };
}

// Send data to n8n webhook via internal API
async function sendToN8nWebhook(data: ButtonClickEvent): Promise<void> {
  console.log('🚀 Sending analytics data via internal API:', data);

  try {
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.warn('❌ Failed to send analytics data:', response.status, response.statusText, errorData);
    } else {
      const responseData = await response.json().catch(() => ({}));
      console.log('✅ Analytics data sent successfully via internal API:', responseData);

      if (responseData.warning) {
        console.warn('⚠️ Analytics warning:', responseData.warning);
      }
    }
  } catch (error) {
    console.warn('❌ Error sending analytics data:', error);
    // Don't throw error to avoid breaking user experience
  }
}

// Main function to track button clicks
export async function trackButtonClick(
  buttonType: string,
  buttonText: string,
  elementId?: string,
  additionalData?: Record<string, any>
): Promise<void> {
  console.log('📊 trackButtonClick called:', { buttonType, buttonText, elementId });

  const userInfo = collectUserInfo();

  const eventData: ButtonClickEvent = {
    eventType: 'button_click',
    buttonType,
    buttonText,
    pageUrl: window.location.href,
    elementId,
    userInfo,
    additionalData
  };

  await sendToN8nWebhook(eventData);
}

// Specific function for product-related button clicks
export async function trackProductButtonClick(
  buttonType: string,
  buttonText: string,
  productId: string,
  productName: string,
  price?: number,
  currency?: string,
  additionalData?: Record<string, any>
): Promise<void> {
  const userInfo = collectUserInfo();

  const eventData: ButtonClickEvent = {
    eventType: 'button_click',
    buttonType,
    buttonText,
    pageUrl: window.location.href,
    productId,
    productName,
    price,
    currency,
    userInfo,
    additionalData
  };

  await sendToN8nWebhook(eventData);
}

// Function to track affiliate link clicks
export async function trackAffiliateClick(
  promotionId: string,
  promotionTitle: string,
  affiliateLink: string,
  additionalData?: Record<string, any>
): Promise<void> {
  const userInfo = collectUserInfo();

  const eventData: ButtonClickEvent = {
    eventType: 'button_click',
    buttonType: 'affiliate_link',
    buttonText: 'ดูรายละเอียด',
    pageUrl: window.location.href,
    productId: promotionId,
    productName: promotionTitle,
    userInfo,
    additionalData: {
      ...additionalData,
      affiliateLink,
      destinationUrl: affiliateLink
    }
  };

  await sendToN8nWebhook(eventData);
}
