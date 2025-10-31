"use client"; 

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Github, MessageCircle } from "lucide-react";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "pasin.wo@ku.th",                 // ✅ เปลี่ยนเป็นอีเมลของคุณ
      href: "mailto:pasin.wo@ku.th",           // ✅ mailto ของคุณ
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "(+66) 65-xxx-5665",
      href: "tel:+6665xxx5665",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Sakon Nakhon, Thailand",         // ✅ เปลี่ยนที่อยู่เป็นสกลนคร
      href: "https://maps.google.com/?q=Sakon+Nakhon+Thailand", // ✅ ลิงก์แผนที่สกลนคร
      color: "text-red-600 dark:text-red-400"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Boom-Vitt",
      color: "hover:text-gray-900 dark:hover:text-white"
    },
    {
      icon: MessageCircle,
      label: "Chat",
      href: "#",
      color: "hover:text-green-600 dark:hover:text-green-400",
      onClick: () => {
        // This would trigger the chat widget
        console.log("Open chat widget");
      }
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ติดต่อ
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            พร้อมที่จะร่วมงานในโครงการต่อไปของคุณหรือไม่? มาคุยกันว่าเราจะนำไอเดียของคุณมาสู่ความเป็นจริงด้วยโซลูชัน AI และ Full-stack ที่ล้ำสมัย
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              ข้อมูลการติดต่อ
            </h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group hover:scale-105"
                >
                  <div className={`p-3 rounded-lg ${info.color} bg-opacity-10`}>
                    <info.icon className={`w-6 h-6 ${info.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {info.label}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Connect With Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    onClick={social.onClick}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className={`p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-600 dark:text-gray-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700"
            >
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <h4 className="font-semibold text-green-800 dark:text-green-300">
                  Available for Projects
                </h4>
              </div>
              <p className="text-green-700 dark:text-green-300 text-sm">
                Currently accepting new projects and collaborations. Response time: 24-48 hours.
              </p>
            </motion.div>
          </motion.div>

          {/* Chat Invitation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              คุยกับ AI ของ Pasin
            </h3>

            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  มีคำถามเกี่ยวกับผลงานของ Pasin?
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  ลองคุยกับ AI ผู้ช่วยของ Pasin ได้เลย! สามารถถามเกี่ยวกับประสบการณ์ ทักษะ โครงการ หรืออะไรก็ได้
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
                <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">
                  ตัวอย่างคำถามที่คุณสามารถถามได้:
                </h5>
                <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                  <p>• "บอกเกี่ยวกับประสบการณ์ทำงานของ Pasin หน่อย"</p>
                  <p>• "Pasin มีทักษะด้าน AI อะไรบ้าง?"</p>
                  <p>• "มีอะไรน่าสนใจใน AI ไหม?"</p>
                  <p>• "ติดต่อ Pasin ได้อย่างไร?"</p>
                </div>
              </div>

              <button
                onClick={() => {
                  // This would trigger the chat widget to open
                  const chatButton = document.querySelector('[aria-label="Toggle chat"]') as HTMLButtonElement;
                  if (chatButton) chatButton.click();
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration:200 flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                เริ่มคุยกับ AI ของ Pasin
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
