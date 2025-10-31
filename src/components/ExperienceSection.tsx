"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building, Calendar, MapPin, Briefcase } from "lucide-react";

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // ✅ โครงสร้างเหมือนเดิม เปลี่ยนเนื้อหาให้เป็นประสบการณ์ทำแลปเน็ตเวิร์คในมหาวิทยาลัย
  const experiences = [
    {
      company:
        "ห้องปฏิบัติการเครือข่ายคอมพิวเตอร์ (Network Lab) • มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตเฉลิมพระเกียรติ จังหวัดสกลนคร",
      position: "Student (Network & IT Support Track)",
      period: "สิงหาคม 2567 – ปัจจุบัน",
      location: "สกลนคร, ประเทศไทย",
      type: "ภาคการศึกษา / แลบ",
      description:
        "ทำแลบและมินิโปรเจกต์ด้านเครือข่าย ตั้งแต่การออกแบบแผนผังเครือข่ายย่อย การตั้งค่าอุปกรณ์เบื้องต้น ไปจนถึงการวิเคราะห์ทราฟฟิกและแก้ไขปัญหาเชิงระบบ พร้อมช่วยสนับสนุนผู้ใช้ในสภาพแวดล้อมจริงของภาควิชา/ห้องแลบ",
      achievements: [
        "ออกแบบ Subnetting และ VLAN สำหรับแลบหลายกลุ่ม แยก Broadcast Domain และวางแผน Addressing Scheme",
        "ตั้งค่า DHCP/DNS, NAT/PAT และ Static/Dynamic Routing เบื้องต้นบนอุปกรณ์จำลอง (Cisco Packet Tracer/GNS3)",
        "วิเคราะห์ทราฟฟิกด้วย Wireshark เพื่อหาต้นตอปัญหา (DNS Resolve ช้า/ARP ซ้ำซ้อน/Latency สูง)",
        "จัดทำคู่มือการใช้งานเบื้องต้นของห้องแลบ และบันทึก Ticket การแก้ไขปัญหาอย่างเป็นระบบ",
      ],
      technologies: [
        "Cisco Packet Tracer",
        "GNS3",
        "Wireshark",
        "Linux/Windows",
        "DHCP/DNS",
        "NAT",
        "Routing Basics",
        "VLAN/Trunk",
      ],
    },
    {
      company:
        "ศูนย์คอมพิวเตอร์/ห้องปฏิบัติการภาควิชา • มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตเฉลิมพระเกียรติ จังหวัดสกลนคร",
      position: "IT Support (Student Assistant)",
      period: "ตุลาคม 2567 – ปัจจุบัน",
      location: "สกลนคร, ประเทศไทย",
      type: "ผู้ช่วยนักศึกษา",
      description:
        "ช่วยซัพพอร์ตผู้ใช้พื้นฐานภายในคณะ/ห้องแลบ ดูแลเครื่องลูกข่าย เครือข่ายไร้สาย ปริ้นเตอร์ และการเข้าถึงทรัพยากรภายในมหาวิทยาลัย",
      achievements: [
        "แก้ปัญหาเชื่อมต่อ Wi-Fi/802.1X, ปริ้นเตอร์ไม่ออก, Remote Desktop/SSH เข้าไม่ได้",
        "ทำ Inventory อุปกรณ์ (Asset เบื้องต้น) และวางตารางบำรุงรักษา (Update/Antivirus/Backup)",
        "ทำ Checklist ตรวจสอบก่อนใช้งานห้องแลบ และแบบฟอร์มรับแจ้งเหตุ (Ticket Template)",
        "สื่อสารกับผู้ใช้งานและอาจารย์ผู้สอนอย่างชัดเจน พร้อมสรุปงานหลังแก้ปัญหา",
      ],
      technologies: [
        "Windows/Mac/Linux",
        "RDP/SSH",
        "Printer/Scanner",
        "Wi-Fi/WPA2-Enterprise",
        "Documentation",
        "Ticketing",
      ],
    },
  ];

  // ✅ คงส่วน Internships เดิมไว้ แต่ปรับเนื้อหาให้สอดคล้องกับตัวตน (แลบ/โครงการเชิงปฏิบัติ)
  const internships = [
    {
      company: "University Network Co-op (Practice)",
      position: "Network Trainee (Lab/Project)",
      period: "2568 (วางแผน)",
      location: "สกลนคร, ประเทศไทย",
      achievement:
        "เตรียมฝึกงานด้าน Network/IT Support เน้นปฏิบัติจริงกับอุปกรณ์และระบบขององค์กร",
      technologies: ["CCNA Prep", "Subnetting/VLAN", "Routing/NAT", "Wireshark"],
    },
    {
      company: "Self-Study & Bootcamps",
      position: "Networking & IT Support Track",
      period: "2567 – ปัจจุบัน",
      location: "Online & On-Campus",
      achievement:
        "ทำแบบฝึกหัด/แบบจำลองสถานการณ์และโจทย์ปัญหาจริงเพื่อสะสมพอร์ต พร้อมเตรียมสอบ CompTIA Network+ / CCNA",
      technologies: ["Cisco PT", "GNS3", "Linux Basics", "Documentation"],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ประสบการณ์ทำงาน
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            ประสบการณ์ทำแลบและปฏิบัติการด้านเครือข่ายในมหาวิทยาลัย พร้อมงานซัพพอร์ตผู้ใช้จริงในบริบทการเรียนการสอน
          </p>
        </motion.div>

        {/* Main Experience */}
        <div className="space-y-8 lg:space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
              }
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Building className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {exp.company}
                    </h3>
                  </div>
                  <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {exp.position}
                  </h4>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {exp.period}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {exp.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {exp.type}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {exp.description}
              </p>

              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Key Achievements:
                </h5>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, achIndex) => (
                    <motion.li
                      key={achIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isInView
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -20 }
                      }
                      transition={{
                        duration: 0.6,
                        delay: index * 0.2 + achIndex * 0.1,
                      }}
                      className="flex items-start text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Technologies Used:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={
                        isInView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.8 }
                      }
                      transition={{
                        duration: 0.6,
                        delay: index * 0.2 + techIndex * 0.05,
                      }}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Internships */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Internships
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {internships.map((internship, index) => (
              <motion.div
                key={internship.company}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 border border-blue-100 dark:border-gray-600"
              >
                <div className="flex items-center mb-3">
                  <Building className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {internship.company}
                  </h4>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                  {internship.position}
                </p>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  {internship.period}
                  <span className="mx-2">•</span>
                  <MapPin className="w-4 h-4 mr-1" />
                  {internship.location}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {internship.achievement}
                </p>
                <div className="flex flex-wrap gap-2">
                  {internship.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
