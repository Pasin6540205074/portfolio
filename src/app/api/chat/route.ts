import { NextRequest, NextResponse } from "next/server";
import { createSignatureHeader, generateSessionToken } from "@/lib/webhook-security";

// Portfolio data for the AI to reference (โครงสร้างเดิม ทุกคีย์เหมือนเดิม ปรับเป็นของผม)
const portfolioData = {
  name: "Pasin Wongtecha (Mon)",
  title: "Network & IT Support Student | Computer Engineering, KU CKK",
  contact: {
    phone: "(+66) 970192625",
    email: "pasin.wo@ku.th",
    address: "Sakon Nakhon, Thailand",
  },
  summary:
    "นิสิตปีที่ 4 วิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตเฉลิมพระเกียรติ จังหวัดสกลนคร สนใจสาย Network Engineering และ IT Support มุ่งเน้นผลลัพธ์และการลงมือแก้ปัญหาจริง มีประสบการณ์ฝึกปฏิบัติ (≈0.1 ปี) จากแลบและมินิโปรเจกต์ เช่น Subnetting/VLAN, Routing/NAT, DHCP/DNS, การวิเคราะห์ทราฟฟิกด้วย Wireshark และงานซัพพอร์ตผู้ใช้ (Wi-Fi/Printer/Remote Access) เป้าหมายระยะสั้นคือฝึกงานสาย Network/IT Support และเตรียมสอบ CompTIA Network+ / CCNA",
  skills: {
    languages: ["JavaScript/TypeScript (พื้นฐาน)", "Python (พื้นฐาน)", "Bash (พื้นฐาน)"],
    frameworks: ["React/Next.js (พื้นฐาน)", "Node.js (พื้นฐาน)"],
    ai: ["Prompting (พื้นฐาน)", "พื้นฐานการประยุกต์ใช้ ML ในงานไอที"],
    cloud: [
      "Linux/Windows Administration (Basic)",
      "SSH/RDP",
      "Docker (Fundamentals)",
      "Git & CI (พื้นฐาน)",
      "Documentation/KB",
    ],
    databases: ["PostgreSQL (พื้นฐาน)", "SQLite (พื้นฐาน)"],
    other: [
      "Wireshark",
      "Cisco Packet Tracer",
      "GNS3",
      "Subnetting/VLAN",
      "Routing/NAT",
      "DHCP/DNS",
      "Ticketing/Helpdesk",
    ],
  },
  experience: [
    {
      company:
        "Network Lab • Kasetsart University, Chalermphrakiat Sakon Nakhon Campus",
      position: "Student (Network & IT Support Track)",
      period: "Aug 2024 – Present",
      location: "Sakon Nakhon, Thailand",
      description:
        "ทำแลบและมินิโปรเจกต์ด้านเครือข่าย: ออกแบบ Addressing/Subnetting, แยก VLAN, ตั้งค่า DHCP/DNS, NAT/PAT และ Routing เบื้องต้นบนอุปกรณ์จำลอง พร้อมวิเคราะห์ทราฟฟิกด้วย Wireshark เพื่อแก้ไขปัญหาเชิงระบบ",
    },
    {
      company:
        "Department/Computer Center • Kasetsart University, CKK (Student Assistant)",
      position: "IT Support (Part-time/On-campus)",
      period: "Oct 2024 – Present",
      location: "Sakon Nakhon, Thailand",
      description:
        "ช่วยซัพพอร์ตผู้ใช้ภายในคณะ/ห้องแลบ: แก้ปัญหาเชื่อมต่อ Wi-Fi/802.1X, ปริ้นไม่ออก, Remote Desktop/SSH เข้าไม่ได้, ทำเอกสาร/แบบฟอร์ม Ticket และบันทึกงานอย่างเป็นระบบ",
    },
  ],
  projects: [
    {
      name: "VLAN & Subnetting Lab",
      client: "KU CKK (Course/Lab)",
      year: "2024",
      status: "Completed",
      description:
        "ออกแบบผังเครือข่ายจำลอง แยก Broadcast Domain ด้วย VLAN, กำหนด IP Plan และทดสอบการเชื่อมต่อ",
      tech: ["Cisco Packet Tracer", "GNS3", "VLAN", "Subnetting"],
    },
    {
      name: "Wireshark Traffic Analysis",
      client: "KU CKK (Lab)",
      year: "2024",
      status: "Completed",
      description:
        "วิเคราะห์ DNS/ARP/HTTP เพื่อค้นหาคอขวดด้าน Latency และอธิบายสาเหตุ-แนวทางแก้ไข",
      tech: ["Wireshark", "DNS", "ARP", "HTTP"],
    },
    {
      name: "Helpdesk Runbook & Ticket Template",
      client: "On-campus Support",
      status: "In Progress",
      description:
        "จัดทำคู่มือแก้ไขปัญหาพื้นฐาน (Wi-Fi/Printer/Remote) และเทมเพลตการรับแจ้งเหตุเพื่อให้ซัพพอร์ตได้เป็นระบบ",
    },
  ],
  education: [
    {
      degree: "B.Eng. Computer Engineering (Year 4)",
      school:
        "Kasetsart University, Chalermphrakiat Sakon Nakhon Campus (KU CKK)",
      period: "2022 – Present (Expected 2026)",
    },
  ],
  internships: [
    {
      company: "Network/IT Support Co-op (Planned)",
      position: "Network Trainee",
      location: "Sakon Nakhon ",
      year: "2025–2026",
      achievement:
        "มุ่งเก็บประสบการณ์ภาคสนามกับอุปกรณ์จริง และการดูแลผู้ใช้ในองค์กร",
    },
  ],
  certifications: [
    "CompTIA Network+ (Preparing)",
    "Cisco CCNA (Preparing)",
    "TryHackMe: Security Fundamentals (Basic)",
  ],
};

export async function POST(request: NextRequest) {
  let userMessage = "";
  let sessionId = "";

  try {
    const { message, history, sessionId: clientSessionId } = await request.json();
    userMessage = message || "";
    sessionId = clientSessionId || `session_${Date.now()}`;

    if (!userMessage) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    console.log(
      `[Chat API] Session: ${sessionId}, Message: ${userMessage.substring(0, 50)}...`
    );

    // Try to send to n8n webhook first
    try {
      const payload = JSON.stringify({
        message: userMessage,
        history,
        portfolioData,
        sessionId,
        responseUrl: `https://cb5c-223-206-189-83.ngrok-free.app/api/webhook`,
        sessionToken: generateSessionToken(sessionId),
        timestamp: new Date().toISOString(),
      });

      const signature = createSignatureHeader(payload);

      const webhookResponse = await fetch(
        "http://localhost:5678/webhook/920d88cd-0272-4208-bfa8-a134848697cd",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-session-id": sessionId,
            "x-webhook-source": "portfolio-chat",
            "x-signature": signature,
          },
          body: payload,
          signal: AbortSignal.timeout(15000),
        }
      );

      if (webhookResponse.ok) {
        const webhookData = await webhookResponse.json();
        console.log(`[Chat API] Webhook success for session ${sessionId}:`, webhookData);

        if (
          webhookData.useSSE ||
          webhookData.async ||
          webhookData.status === "processing" ||
          (webhookData.message &&
            webhookData.message.includes("Workflow was started"))
        ) {
          console.log(
            `[Chat API] Using SSE mode for session ${sessionId} - n8n will send response later`
          );
          return NextResponse.json({
            success: true,
            useSSE: true,
            sessionId,
            message: "Response will be sent via real-time connection",
          });
        }

        let responseMessage = "";
        if (typeof webhookData === "string") {
          responseMessage = webhookData;
        } else if (webhookData.response) {
          responseMessage = webhookData.response;
        } else if (webhookData.message) {
          responseMessage = webhookData.message;
        } else if (webhookData.reply) {
          responseMessage = webhookData.reply;
        } else if (webhookData.text) {
          responseMessage = webhookData.text;
        } else {
          console.log(`[Chat API] Unexpected webhook response format:`, webhookData);
          console.log(
            `[Chat API] Using fallback response for session ${sessionId}`
          );
          throw new Error("Unexpected webhook response format");
        }

        console.log(
          `[Chat API] Immediate response for session ${sessionId}:`,
          responseMessage
        );
        return NextResponse.json({ message: responseMessage, useSSE: false });
      } else {
        const errorText = await webhookResponse.text();
        console.log(`[Chat API] Webhook error ${webhookResponse.status}:`, errorText);
        throw new Error(`Webhook returned status: ${webhookResponse.status}`);
      }
    } catch (webhookError) {
      console.log(
        `[Chat API] Webhook failed for session ${sessionId}, using fallback:`,
        webhookError
      );
      const response = generateResponse(userMessage.toLowerCase());
      console.log(
        `[Chat API] Fallback response for session ${sessionId}:`,
        response.substring(0, 100) + "..."
      );
      return NextResponse.json({
        message: response,
        useSSE: false,
        fallback: true,
      });
    }
  } catch (error) {
    console.error(`[Chat API] Final error for session ${sessionId}:`, error);
    const response = generateResponse(userMessage.toLowerCase() || "");
    console.log(
      `[Chat API] Final fallback response for session ${sessionId}:`,
      response.substring(0, 100) + "..."
    );
    return NextResponse.json({
      message: response,
      useSSE: false,
      fallback: true,
      error: "System temporarily unavailable",
    });
  }
}

function generateResponse(message: string): string {
  // Skills-related queries
  if (
    message.includes("skill") ||
    message.includes("technology") ||
    message.includes("programming") ||
    message.includes("ทักษะ") ||
    message.includes("เทคโนโลยี") ||
    message.includes("โปรแกรม")
  ) {
    return `Mon focuses on Network & IT Support skills:

**Core Networking:** Subnetting/VLAN, Routing/NAT (basic), DHCP/DNS, Wireshark  
**Systems & Tools:** Linux/Windows admin (basic), SSH/RDP, Docker (fundamentals), Git/CI (basic), Documentation/KB  
**Programming (basic):** ${portfolioData.skills.languages.join(", ")}  
**Other Tools:** ${portfolioData.skills.other.join(", ")}

กำลังพัฒนาทักษะเพื่อเตรียมสอบ CompTIA Network+ และ CCNA.`;
  }

  // Experience-related queries
  if (
    message.includes("experience") ||
    message.includes("work") ||
    message.includes("job") ||
    message.includes("ประสบการณ์")
  ) {
    return `Mon ทำแลบและมินิโปรเจกต์ด้านเครือข่ายที่ KU CKK: ออกแบบ Subnetting/VLAN, ตั้งค่า DHCP/DNS, NAT/PAT และ Routing เบื้องต้น พร้อมใช้ Wireshark วิเคราะห์ทราฟฟิก
รวมถึงช่วยงาน IT Support ภายในภาควิชา/ห้องแลบ เช่น แก้ปัญหา Wi-Fi/Printer/Remote Access และจัดทำเอกสาร Runbook/Ticket อย่างเป็นระบบ.`;
  }

  // Projects-related queries
  if (message.includes("project") || message.includes("portfolio") || message.includes("โครงการ")) {
    return `ตัวอย่างโครงการ/แลบที่เกี่ยวข้อง:

• **VLAN & Subnetting Lab (2024)** — ออกแบบ IP Plan แยก VLAN และทดสอบการเชื่อมต่อ  
• **Wireshark Traffic Analysis (2024)** — วิเคราะห์ DNS/ARP/HTTP หา Root Cause ของ Latency  
• **Helpdesk Runbook & Ticket Template** — จัดทำคู่มือและเทมเพลตสำหรับรับแจ้งเหตุและสรุปผลการแก้ไข`;
  }

  // Education-related queries
  if (
    message.includes("education") ||
    message.includes("study") ||
    message.includes("university") ||
    message.includes("degree") ||
    message.includes("การศึกษา") ||
    message.includes("มหาวิทยาลัย")
  ) {
    return `การศึกษา:
• **B.Eng. Computer Engineering (Year 4)** — Kasetsart University, CKK (2022 – ปัจจุบัน, คาดว่า 2026)  
ใบรับรองที่เตรียมสอบ: CompTIA Network+, Cisco CCNA`;
  }

  // Contact-related queries
  if (
    message.includes("contact") ||
    message.includes("email") ||
    message.includes("phone") ||
    message.includes("reach") ||
    message.includes("ติดต่อ")
  ) {
    return `ติดต่อ Mon ได้ที่:
📧 **Email:** ${portfolioData.contact.email}
📍 **Location:** ${portfolioData.contact.address}`;
  }

  // Networking / IT Support specific queries
  if (
    message.includes("network") ||
    message.includes("it support") ||
    message.includes("เครือข่าย") ||
    message.includes("ซัพพอร์ต")
  ) {
    return `โฟกัสงาน Network/IT Support: Subnetting/VLAN, DHCP/DNS, Routing/NAT, Wireshark, SSH/RDP, และงานช่วยผู้ใช้ (Wi-Fi/Printer/Remote) พร้อมจัดทำเอกสาร Runbook/Ticket เพื่อให้ซัพพอร์ตอย่างเป็นระบบ`;
  }

  // General greeting or introduction
  if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("สวัสดี") ||
    message.includes("who") ||
    message.includes("about") ||
    message.includes("เกี่ยวกับ")
  ) {
    return `สวัสดีครับ! ผมคือผู้ช่วยของ Mon (Pasin Wongtecha) 😊

${portfolioData.summary}

คุณสามารถถามเรื่องทักษะ ประสบการณ์ โครงการ การศึกษา หรือช่องทางการติดต่อได้เลยครับ`;
  }

  // Default response
  return `ขอบคุณที่ติดต่อครับ! คุณอยากทราบเรื่องใดของ Mon (Pasin Wongtecha) ระหว่าง:
• ทักษะและเครื่องมือด้าน Network/IT Support
• ประสบการณ์ทำแลบ/ซัพพอร์ต
• โครงการ/ตัวอย่างงาน
• การศึกษา/ใบรับรอง
• ช่องทางการติดต่อ`;
}
