import { NextRequest, NextResponse } from "next/server";
import { sendToSession } from "../sse/route";
import { validateWebhookRequest, verifySessionToken } from "@/lib/webhook-security";

// Store for pending chat responses - in production, use Redis or database
const pendingResponses = new Map<string, string>();

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    let body;

    try {
      body = JSON.parse(rawBody);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    // Check authentication method (API key OR signature)
    const apiKey = request.headers.get('x-api-key');
    const signature = request.headers.get('x-signature');
    const expectedApiKey = 'boom-portfolio-2024';

    let isAuthenticated = false;

    // Method 1: API Key authentication (for backward compatibility)
    if (apiKey && apiKey === expectedApiKey) {
      isAuthenticated = true;
      console.log('[Webhook] Authenticated via API key');
    }

    // Method 2: Signature authentication (more secure)
    else if (signature) {
      const validation = validateWebhookRequest(rawBody, signature);
      if (validation.valid) {
        isAuthenticated = true;
        console.log('[Webhook] Authenticated via signature');
      } else {
        console.log('[Webhook] Signature validation failed:', validation.error);
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Please include either 'x-api-key: boom-portfolio-2024' or valid 'x-signature' header"
        },
        { status: 401 }
      );
    }
    console.log("Webhook received:", body);

    // Extract the response data from n8n
    const {
      sessionId,
      response,
      message,
      reply,
      chatId,
      conversationId
    } = body;

    // Get the actual response message from various possible fields
    let responseMessage = "";
    if (response) {
      responseMessage = response;
    } else if (message) {
      responseMessage = message;
    } else if (reply) {
      responseMessage = reply;
    } else if (typeof body === 'string') {
      responseMessage = body;
    } else {
      responseMessage = "ได้รับข้อมูลจาก AI แล้ว แต่ไม่สามารถแสดงผลได้";
    }

    // Store the response with a session/chat ID for retrieval
    const id = sessionId || chatId || conversationId || Date.now().toString();
    pendingResponses.set(id, responseMessage);

    // Send real-time update via SSE if session exists
    if (sessionId || chatId || conversationId) {
      const sent = sendToSession(id, {
        type: 'response',
        message: responseMessage,
        timestamp: new Date().toISOString()
      });
      console.log(`SSE message sent to session ${id}:`, sent);
    }

    // Clean up old responses (older than 5 minutes)
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    for (const [key, value] of pendingResponses.entries()) {
      if (parseInt(key) < fiveMinutesAgo) {
        pendingResponses.delete(key);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Response received and stored",
      id: id
    });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "ID parameter required" },
        { status: 400 }
      );
    }

    const response = pendingResponses.get(id);

    if (response) {
      // Remove the response after retrieving it
      pendingResponses.delete(id);
      return NextResponse.json({
        success: true,
        message: response
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No response found for this ID"
      });
    }

  } catch (error) {
    console.error("Webhook GET error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve response" },
      { status: 500 }
    );
  }
}

// Export the current pending responses for debugging (remove in production)
export async function DELETE(request: NextRequest) {
  try {
    pendingResponses.clear();
    return NextResponse.json({
      success: true,
      message: "All pending responses cleared"
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to clear responses" },
      { status: 500 }
    );
  }
}
