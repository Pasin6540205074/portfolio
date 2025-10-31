import { NextRequest, NextResponse } from "next/server";
import { sendToSession, getConnectionInfo } from "../../sse/route";

// Completely open endpoint for n8n - no authentication required
export async function POST(request: NextRequest) {
  try {
    console.log("=== n8n Public Endpoint Called ===");
    console.log("Headers:", Object.fromEntries(request.headers.entries()));

    const body = await request.json();
    console.log("Body received:", body);

    // Extract response from various possible formats
    const response = body.response || body.message || body.reply || body.text || body.content || "ข้อความจาก n8n";
    const sessionId = body.sessionId || body.chatId || body.conversationId;

    console.log("Processed response:", response);
    console.log("Session ID:", sessionId);
    console.log("SSE Connection Info:", getConnectionInfo());

    // Send the response via SSE to the chat if we have a session ID
    if (sessionId) {
      const sent = sendToSession(sessionId, {
        type: 'response',
        message: response,
        timestamp: new Date().toISOString()
      });
      console.log(`✅ SSE message sent to session ${sessionId}:`, sent);

      if (sent) {
        return NextResponse.json({
          success: true,
          message: "✅ Response sent to chat via SSE",
          sessionId: sessionId,
          processedResponse: response,
          timestamp: new Date().toISOString()
        }, {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        });
      } else {
        console.log(`❌ Failed to send SSE message to session ${sessionId}`);
      }
    } else {
      console.log("❌ No session ID found in request");
    }

    // Return success response (fallback)
    return NextResponse.json({
      success: true,
      message: "✅ Response received successfully from n8n",
      processedResponse: response,
      timestamp: new Date().toISOString(),
      receivedData: body
    }, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });

  } catch (error) {
    console.error("❌ n8n public endpoint error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process n8n response",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// GET endpoint to check if the service is running
export async function GET() {
  return NextResponse.json({
    status: "🟢 ACTIVE",
    message: "n8n public endpoint is running - NO AUTHENTICATION REQUIRED",
    timestamp: new Date().toISOString(),
    endpoint: "/api/public/n8n",
    methods: ["POST", "GET", "OPTIONS"],
    example: {
      url: "http://localhost:3000/api/public/n8n",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        response: "Your AI response here",
        sessionId: "optional-session-id"
      }
    }
  });
}
