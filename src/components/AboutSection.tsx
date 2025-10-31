"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code, Smartphone, Cloud, Award, Users, AArrowUp } from "lucide-react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // ✔️ โครงสร้างเดิมทั้งหมดเหมือนเดิม เปลี่ยนเฉพาะเนื้อหาให้เป็นนิสิตปี 4 สนใจ Network / IT Support
  const highlights = [
    {
      icon: Brain,
      title: "Networking Fundamentals",
      description: "เข้าใจพื้นฐาน IP/Subnetting, VLAN, Routing/NAT, DHCP/DNS และแนวทางวางโครงสร้างเครือข่ายขนาดเล็ก"
    },
    {
      icon: Code,
      title: "IT Support Skills",
      description: "มีทักษะ Helpdesk/Service Desk การรับแจ้งปัญหา วิเคราะห์อาการ และแก้ไขปัญหาเครื่องลูกข่ายเบื้องต้น"
    },
    {
      icon: Smartphone,
      title: "Endpoint & Peripheral",
      description: "ตั้งค่าอุปกรณ์ผู้ใช้ Wi-Fi, Printer, Scanner, Remote Desktop และแนวทางดูแลอุปกรณ์มือถือในองค์กร"
    },
    {
      icon: Cloud,
      title: "System & Tools",
      description: "ใช้งาน Linux/Windows เบื้องต้น, SSH/RDP, Ping/Traceroute, Wireshark, Nmap, และเครื่องมือ Monitoring เบื้องต้น"
    },
    {
      icon: Award,
      title: "Learning Mindset",
      description: "ผู้เรียนรู้ไว มุ่งเน้นผลลัพธ์ กำลังเตรียมสอบ CompTIA Network+ และ CCNA เพื่อพัฒนาสาย Network/IT Support"
    },
    {
      icon: Users,
      title: "Communication & Teamwork",
      description: "สื่อสารกับผู้ใช้งานได้ดี บันทึกงานเป็นระบบ ทำงานร่วมกับทีมโครงสร้างพื้นฐานและผู้พัฒนาได้อย่างราบรื่น"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            เกี่ยวกับฉัน
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            นิสิตชั้นปีที่ 4 สาขาวิศวกรรมคอมพิวเตอร์ สนใจสาย <span className="font-semibold">Network Engineering</span> และ{" "}
            <span className="font-semibold">IT Support</span> มุ่งเน้นลงมือจริง แก้ปัญหาได้เป็นขั้นตอน
            และพร้อมเรียนรู้เครื่องมือใหม่ ๆ เพื่อยกระดับเสถียรภาพระบบและประสบการณ์ผู้ใช้
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              เส้นทางการทำงาน
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                ผมเริ่มสนใจงานเครือข่ายจากแลบและมินิโปรเจกต์ในมหาวิทยาลัย
                ฝึกตั้งค่าอุปกรณ์เบื้องต้นและจำลองสถานการณ์จริงเพื่อเข้าใจโครงสร้างและการแก้ปัญหาเชิงระบบ
              </p>
              <p>
                ด้านงานสนับสนุนผู้ใช้ ผมให้ความสำคัญกับการสื่อสาร การซักถามอาการ และการบันทึก Ticket อย่างเป็นระบบ
                ใช้เครื่องมืออย่าง Ping/Traceroute/Wireshark เพื่อค้นหาต้นตอของปัญหาและแก้ไขอย่างตรงจุด
              </p>
              <p>
                เป้าหมายระยะสั้นของผมคือโอกาสฝึกงาน/งานเริ่มต้นในสาย Network หรือ IT Support
                เพื่อเก็บประสบการณ์ภาคสนาม และเตรียมสอบใบรับรอง <span className="font-semibold">CompTIA Network+</span> และ{" "}
                <span className="font-semibold">CCNA</span> เพื่อสร้างรากฐานที่มั่นคงในสายอาชีพ
              </p>
              <p>
                ผมเชื่อว่าการดูแลระบบที่ดีคือการป้องกันปัญหาเชิงรุก (proactive) ผสานกับการตอบสนองอย่างรวดเร็ว (reactive)
                เพื่อให้ผู้ใช้ทำงานได้ต่อเนื่องและองค์กรเดินหน้าได้อย่างราบรื่น
              </p>
            </div>
          </motion.div>

          {/* Right Column - Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 p-4 lg:p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
                    <highlight.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {highlight.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section (คงโครงเดิมไว้ เปลี่ยนข้อความให้สอดคล้องนิสิตปี 4) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">0.1+</div>
            <div className="text-gray-600 dark:text-gray-300">ปี ฝึกปฏิบัติ/แล็บ</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10+</div>
            <div className="text-gray-600 dark:text-gray-300">แลบ/มินิโปรเจกต์เครือข่าย</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">30+</div>
            <div className="text-gray-600 dark:text-gray-300">เคสช่วยผู้ใช้ (Tickets)</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">กำลังเตรียม</div>
            <div className="text-gray-600 dark:text-gray-300">CompTIA Net+ / CCNA</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
