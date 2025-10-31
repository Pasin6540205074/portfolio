import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('📊 Analytics API received data:', {
      eventType: body.eventType,
      buttonType: body.buttonType,
      buttonText: body.buttonText,
      sessionId: body.userInfo?.sessionId
    });

    // Forward to n8n webhook
    const n8nWebhookUrl = 'http://localhost:5678/webhook/920d88cd-0272-4208-bfa8-a134848697cd';

    try {
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'boom-portfolio-2024'
        },
        body: JSON.stringify(body),
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) {
        console.warn('❌ n8n webhook returned error:', response.status, response.statusText);
        // Still return success to client since we received the data
        return NextResponse.json({
          success: true,
          warning: 'Data received but n8n webhook failed',
          n8nStatus: response.status
        });
      }

      console.log('✅ Successfully forwarded analytics data to n8n');
      return NextResponse.json({ success: true, n8nStatus: 'ok' });

    } catch (n8nError) {
      console.warn('❌ Failed to reach n8n webhook:', n8nError);
      // Still return success to client since we received the data
      return NextResponse.json({
        success: true,
        warning: 'Data received but n8n webhook unreachable',
        error: n8nError instanceof Error ? n8nError.message : 'Unknown error'
      });
    }

  } catch (error) {
    console.error('❌ Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
