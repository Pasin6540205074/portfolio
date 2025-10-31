import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/n8n-response
 * ให้ n8n ส่งผลลัพธ์ (คำตอบ AI ฯลฯ) กลับมาที่ Next.js
 * ใช้ Authorization: Bearer <token> (อ่านจาก .env: N8N_API_KEY)
 */
export async function POST(request: NextRequest) {
  try {
    // ✅ ตรวจสอบ Authorization Bearer
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.N8N_API_KEY;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Missing Bearer token in Authorization header" },
        { status: 401 }
      );
    }
    if (!expectedToken) {
      return NextResponse.json(
        { error: "Server misconfigured", message: "N8N_API_KEY is not set" },
        { status: 500 }
      );
    }

    const providedToken = authHeader.slice("Bearer ".length).trim();
    if (providedToken !== expectedToken) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Invalid API token" },
        { status: 401 }
      );
    }

    // ✅ รับ payload
    const body = await request.json();
    console.log("📩 n8n response received:", body);

    // ✅ รองรับหลายรูปแบบที่ n8n อาจส่งกลับ
    const responseText =
      body.answer ??
      body.response ??
      body.message ??
      body.reply ??
      body.text ??
      body.data?.answer ??
      "ไม่สามารถประมวลผลคำตอบได้";

    // (ตัวเลือก) ส่งกลับไปหน้าเว็บผ่าน SSE ถ้าคุณส่ง sessionId มาด้วย
    // เพื่อใช้ ให้มี endpoint /api/sse ที่เก็บ client ไว้ใน global.__SSE_CLIENTS__
    try {
      const sessionId = body.sessionId;
      if (sessionId && typeof sessionId === "string") {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/sse-push`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, message: responseText }),
        }).catch(() => {});
      }
    } catch (e) {
      console.warn("SSE relay failed (optional):", e);
    }

    console.log("🧠 Processed response:", responseText);

    return NextResponse.json({
      success: true,
      message: "Response received successfully",
      processedResponse: responseText,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("❌ n8n response error:", error?.message || error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process n8n response",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
