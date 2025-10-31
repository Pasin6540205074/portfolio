"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

export function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Education & Certifications
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            นิสิตปีที่ 4 มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตเฉลิมพระเกียรติ จังหวัดสกลนคร
            มุ่งสู่สาย Network Engineering และ IT Support
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Card 1: ปริญญาตรีปัจจุบัน */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-600 rounded-lg mr-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  B.Eng. Computer Engineering
                  <span className="block text-sm text-green-600 dark:text-green-400 font-medium">
                    Year 4 (Undergraduate)
                  </span>
                </h3>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
                  มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตเฉลิมพระเกียรติ จังหวัดสกลนคร
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                2022 – ปัจจุบัน (คาดว่า 2026)
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                สกลนคร, ประเทศไทย
              </div>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                Current
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              โฟกัสด้านเครือข่ายคอมพิวเตอร์และการสนับสนุนผู้ใช้ (IT Support) ฝึกปฏิบัติจากแลบและมินิโปรเจกต์
              เช่น Subnetting/VLAN, การตั้งค่าอุปกรณ์เครือข่ายเบื้องต้น, การตรวจสอบทราฟฟิกด้วย Wireshark,
              และงานแก้ปัญหาเครื่องลูกข่าย/การเชื่อมต่อในสภาพแวดล้อมจริง
            </p>
          </motion.div>

          {/* Card 2: ใบรับรอง/การอบรม */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-600 rounded-lg mr-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Certifications & Training
                  <span className="block text-sm text-green-600 dark:text-green-400 font-medium">
                    Networking & IT Support (In Progress)
                  </span>
                </h3>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
                  Self-paced / Online & On-campus Labs
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                2024 – ปัจจุบัน
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                สกลนคร & ออนไลน์
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-1" />
                เตรียมสอบ: CompTIA Network+, Cisco CCNA
              </div>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                In Progress
              </span>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-700 mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Lab / Project Highlights
              </h4>
              <p className="text-gray-700 dark:text-gray-300 italic">
                “VLAN & Subnetting Lab • Basic Routing/NAT • Wireshark Traffic Analysis •
                Printer/Wi-Fi Troubleshooting • Remote Access (SSH/RDP) Setup”
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-green-200 dark:border-green-700">
                <p className="font-medium text-green-700 dark:text-green-300">
                  CompTIA Network+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  สรุปคอนเซ็ปต์/ทำข้อสอบฝึกหัด และทำแลบทบทวนหัวข้อ OSI, IP, DHCP/DNS
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-green-200 dark:border-green-700">
                <p className="font-medium text-green-700 dark:text-green-300">
                  Cisco CCNA (Prep)
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ฝึกตั้งค่าอุปกรณ์เบื้องต้น, Routing/Switching, Access Control, และแนวทาง Security พื้นฐาน
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
