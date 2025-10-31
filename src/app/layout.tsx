import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { ChatWidget } from "@/components/ChatWidget";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "(MonKun) - Network & IT Support Student",
  description:
    "Portfolio ของ Pasin Wongtecha (Mon) นิสิตปีที่ 4 มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตเฉลิมพระเกียรติ จังหวัดสกลนคร สนใจ Network Engineering และ IT Support ทำแลบเครือข่าย (Subnetting/VLAN, Routing/NAT, DHCP/DNS, Wireshark) และเตรียมสอบ CompTIA Network+ / CCNA",
  keywords:
    "Pasin Wongtecha, MonKun, Network Engineering, IT Support, Subnetting, VLAN, Routing, NAT, DHCP, DNS, Wireshark, CCNA, CompTIA Network+, Kasetsart CKK, สกลนคร",
  authors: [{ name: "Pasin Wongtecha (Mon)" }],
  openGraph: {
    title: "Pasin Wongtecha (Mon) - Network & IT Support Student",
    description:
      "พอร์ตโฟลิโอของนิสิตปี 4 ม.เกษตรศาสตร์ วิทยาเขตเฉลิมพระเกียรติ จ.สกลนคร โฟกัสสายเครือข่ายและซัพพอร์ตผู้ใช้ พร้อมตัวอย่างแลบและมินิโปรเจกต์",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansThai.variable} antialiased bg-white text-gray-900`}
        suppressHydrationWarning
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <ChatWidget />
      </body>
    </html>
  );
}
