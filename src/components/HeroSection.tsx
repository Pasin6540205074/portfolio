"use client";

import { motion } from "framer-motion";
import { ChevronDown, Play, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 shadow-xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <Image
                  src="https://lh3.googleusercontent.com/d/1uqqXTKLYVKet1NSTWBKekAGJIIWB0pMj=s200"
                  alt="Pasin wongtecha (mon)"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Name and Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Pasin wongtecha
              <span className="block text-xl sm:text-2xl md:text-3xl text-blue-600 font-normal mt-2">
                (mon)
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8">
              Network Enginer
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 text-xs sm:text-sm md:text-base text-gray-600"
          >
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>(+66) 65‑xxx‑5665</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>pasin.wo@ku.th</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Sakon Nakhon, Thailand</span>
            </div>
          </motion.div>

          {/* Brief Summary */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <p className="text-lg text-gray-800 dark:text-gray-800 leading-relaxed">
              นิสิตชั้นปีที่ 4 สาขาวิศวกรรมคอมพิวเตอร์<strong>ประสบการณ์กว่า 0.1 ปี</strong> ผู้มีความสนใจในด้าน Network Engineering
              และการพัฒนาเทคโนโลยีระบบเครือข่าย ถึงแม้ยังอยู่ในช่วงเริ่มต้นของเส้นทางอาชีพ แต่เป็นผู้มุ่งเน้นผลลัพธ์และมีความตั้งใจเรียนรู้สูง
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Mail size={20} />
              Get In Touch
            </Link>
            <Link
              href="https://www.youtube.com/@shora5245"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-black px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <Play size={20} />
              YouTube Channel
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex justify-center"
          >
            <Link
              href="#about"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown size={32} />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
