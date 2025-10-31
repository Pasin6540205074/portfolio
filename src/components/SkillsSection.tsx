"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Brain, Cloud, Smartphone } from "lucide-react";

// Helper function to get gradient colors for each category
const getCategoryGradient = (colorClass: string) => {
  const gradients = {
    "bg-blue-500": "#3b82f6, #1d4ed8",
    "bg-purple-500": "#a855f7, #7c3aed",
    "bg-green-500": "#10b981, #059669",
    "bg-orange-500": "#f97316, #ea580c",
    "bg-pink-500": "#ec4899, #db2777",
    "bg-indigo-500": "#6366f1, #4f46e5",
  };
  return gradients[colorClass as keyof typeof gradients] || "#3b82f6, #1d4ed8";
};

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // ✅ โครงสร้างเดิมทั้งหมดเหมือนเดิม เปลี่ยนเฉพาะเนื้อหาให้เป็นของผม (นิสิตปี 4 ทำแลบเน็ตเวิร์ค สนใจ Network/IT Support)
  const skillCategories = [
    {
      icon: Code,
      title: "Networking Basics",
      color: "bg-blue-500",
      skills: [
        { name: "IP/Subnetting & VLAN", level: 40 },
        { name: "Routing/NAT (Static, Basic)", level: 60 },
        { name: "DHCP / DNS Setup", level: 60 },
        { name: "Wireshark Traffic Analysis", level: 10 },
      ],
    },
    {
      icon: Brain,
      title: "Troubleshooting & Support",
      color: "bg-purple-500",
      skills: [
        { name: "Helpdesk / Ticketing", level: 10 },
        { name: "Documentation (KB/Runbook)", level: 10 },
        { name: "Remote Access (SSH/RDP)", level: 10 },
        { name: "Communication with Users", level: 10 },
      ],
    },
    {
      icon: Cloud,
      title: "Systems & Tools",
      color: "bg-green-500",
      skills: [
        { name: "Linux/Windows Administration (Basic)", level: 30 },
        { name: "Git & Version Control", level: 20 },
        { name: "Docker (Fundamentals)", level: 60 },
        { name: "Monitoring & Logs (Basics)", level: 20 },
      ],
    },
    {
      icon: Smartphone,
      title: "Endpoint & Peripheral",
      color: "bg-pink-500",
      skills: [
        { name: "Wi-Fi & 802.1X Setup", level: 30 },
        { name: "Printer/Scanner Troubleshooting", level: 0.5 },
        { name: "Mobile/MDM (Basics)", level: 20 },
        { name: "User Onboarding/Access", level: 20 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 thai-text">
            ทักษะทางเทคนิค
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto thai-text">
            โฟกัสสายเครือข่ายและ IT Support จากการทำแลบและมินิโปรเจกต์ในมหาวิทยาลัย
            เน้นการตั้งค่า ตรวจสอบ และแก้ปัญหาเพื่อให้ผู้ใช้ทำงานได้ต่อเนื่อง
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 ${category.color} rounded-lg mr-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white thai-text">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {skill.name}
                      </span>
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={
                          isInView
                            ? { width: `${skill.level}%` }
                            : { width: 0 }
                        }
                        transition={{
                          duration: 1,
                          delay:
                            categoryIndex * 0.1 + skillIndex * 0.05 + 0.3,
                          ease: "easeOut",
                        }}
                        className={`h-3 rounded-full ${category.color} shadow-sm relative overflow-hidden`}
                        style={{
                          background: `linear-gradient(90deg, ${getCategoryGradient(
                            category.color
                          )})`,
                        }}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Achievements (ปรับให้เข้ากับสาย Network/IT Support) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center thai-text">
            ผลงานทางเทคนิคที่สำคัญ
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                20+
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium thai-text">
                แลบ/แบบฝึกหัดเครือข่าย
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 thai-text">
                Subnetting, VLAN, Routing, NAT
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                30+
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium thai-text">
                เคสซัพพอร์ตที่แก้ไข
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 thai-text">
                Wi-Fi/Printer/Remote Access
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                4
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium thai-text">
                โทโพโลยีเครือข่ายจำลอง
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 thai-text">
                แยก VLAN • DHCP/DNS • NAT
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
