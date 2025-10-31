"use client";

import { motion } from "framer-motion";
import { StarRating } from "@/components/StarRating";
import { AffiliateCard } from "@/components/AffiliateCard";
import { Star, TrendingUp, Users, MessageSquare } from "lucide-react";

// Affiliate promotions - easy to update by pasting new links and info
const affiliatePromotions = [
  {
    id: "1",
    title: "Udemy - Complete Python Bootcamp",
    titleTh: "คอร์ส Python ครบวงจร",
    description: "From Zero to Hero in Python 3",
    descriptionTh: "เรียน Python จากศูนย์จนเป็นมืออาชีพ",
    originalPrice: 3199,
    salePrice: 599,
    currency: "THB",
    discount: "81%",
    rating: 4.6,
    students: 1500000,
    instructor: "Jose Portilla",
    duration: "22 ชั่วโมง",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
    affiliateLink: "https://www.udemy.com/course/complete-python-bootcamp/?referralCode=BOOM2024",
    category: "Programming",
    categoryTh: "โปรแกรมมิ่ง",
    highlights: [
      "เรียนรู้ Python ตั้งแต่พื้นฐาน",
      "สร้างโปรเจคจริง 10+ โปรเจค",
      "เตรียมตัวสอบสัมภาษณ์งาน",
      "รับประกันคืนเงิน 30 วัน"
    ],
    badge: "Best Seller",
    badgeTh: "ขายดี"
  },
  {
    id: "2",
    title: "Coursera - Machine Learning Specialization",
    titleTh: "หลักสูตร Machine Learning จาก Stanford",
    description: "Andrew Ng's Complete ML Course",
    descriptionTh: "เรียน Machine Learning กับ Andrew Ng จาก Stanford",
    originalPrice: 2499,
    salePrice: 0,
    currency: "THB",
    discount: "Free Trial",
    rating: 4.9,
    students: 4200000,
    instructor: "Andrew Ng",
    duration: "3 เดือน",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    affiliateLink: "https://www.coursera.org/specializations/machine-learning-introduction?irclickid=BOOM2024",
    category: "AI/ML",
    categoryTh: "ปัญญาประดิษฐ์",
    highlights: [
      "เรียนจากผู้เชี่ยวชาญระดับโลก",
      "ใบประกาศนียบัตรจาก Stanford",
      "โปรเจค Hands-on จริง",
      "ทดลองฟรี 7 วัน"
    ],
    badge: "Free Trial",
    badgeTh: "ทดลองฟรี"
  },
  {
    id: "3",
    title: "Pluralsight - Complete Web Development",
    titleTh: "คอร์สพัฒนาเว็บไซต์ครบวงจร",
    description: "Full-Stack Web Development Path",
    descriptionTh: "เส้นทางการเรียนรู้พัฒนาเว็บไซต์แบบเต็มรูปแบบ",
    originalPrice: 1999,
    salePrice: 299,
    currency: "THB",
    discount: "85%",
    rating: 4.7,
    students: 850000,
    instructor: "Multiple Experts",
    duration: "40+ ชั่วโมง",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    affiliateLink: "https://www.pluralsight.com/paths/web-development?aid=BOOM2024",
    category: "Web Development",
    categoryTh: "พัฒนาเว็บไซต์",
    highlights: [
      "HTML, CSS, JavaScript ครบถ้วน",
      "React, Node.js, และ Database",
      "โปรเจคจริงที่ใช้งานได้",
      "ใบประกาศนียบัตรอาชีพ"
    ],
    badge: "Popular",
    badgeTh: "ยอดนิยม"
  },
  {
    id: "4",
    title: "AWS Cloud Practitioner Certification",
    titleTh: "ใบประกาศนียบัตร AWS Cloud Practitioner",
    description: "Complete AWS Cloud Fundamentals Course",
    descriptionTh: "คอร์สพื้นฐาน AWS Cloud แบบครบถ้วน",
    originalPrice: 2999,
    salePrice: 799,
    currency: "THB",
    discount: "73%",
    rating: 4.8,
    students: 320000,
    instructor: "Stephane Maarek",
    duration: "15 ชั่วโมง",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    affiliateLink: "https://www.udemy.com/course/aws-certified-cloud-practitioner-new/?referralCode=BOOM2024",
    category: "Cloud Computing",
    categoryTh: "คลาวด์คอมพิวติ้ง",
    highlights: [
      "เตรียมสอบ AWS Certification",
      "เรียนรู้ AWS Services หลัก",
      "Hands-on Labs และ Practice Tests",
      "รับประกันผ่านการสอบ"
    ],
    badge: "Certification",
    badgeTh: "ใบประกาศนียบัตร"
  },
  {
    id: "5",
    title: "Skillshare - UI/UX Design Masterclass",
    titleTh: "คอร์ส UI/UX Design แบบเชี่ยวชาญ",
    description: "Complete UI/UX Design Course with Real Projects",
    descriptionTh: "คอร์ส UI/UX Design ครบถ้วนพร้อมโปรเจคจริง",
    originalPrice: 1299,
    salePrice: 0,
    currency: "THB",
    discount: "2 Months Free",
    rating: 4.6,
    students: 180000,
    instructor: "Gary Simon",
    duration: "25+ ชั่วโมง",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    affiliateLink: "https://www.skillshare.com/r/user/boom2024",
    category: "Design",
    categoryTh: "ดีไซน์",
    highlights: [
      "เรียนรู้ Figma และ Adobe XD",
      "สร้าง Portfolio ที่โดดเด่น",
      "User Research และ Prototyping",
      "ทดลองฟรี 2 เดือน"
    ],
    badge: "Free Trial",
    badgeTh: "ทดลองฟรี"
  },
  {
    id: "6",
    title: "LinkedIn Learning - Data Science Path",
    titleTh: "เส้นทางการเรียน Data Science",
    description: "Complete Data Science Learning Path",
    descriptionTh: "เส้นทางการเรียนรู้ Data Science แบบครบถ้วน",
    originalPrice: 1999,
    salePrice: 299,
    currency: "THB",
    discount: "85%",
    rating: 4.7,
    students: 95000,
    instructor: "Various Experts",
    duration: "30+ ชั่วโมง",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    affiliateLink: "https://www.linkedin.com/learning/paths/become-a-data-scientist?u=boom2024",
    category: "Data Science",
    categoryTh: "วิทยาศาสตร์ข้อมูล",
    highlights: [
      "Python, R, และ SQL",
      "Machine Learning และ Statistics",
      "Data Visualization",
      "ใบประกาศนียบัตรจาก LinkedIn"
    ],
    badge: "Professional",
    badgeTh: "มืออาชีพ"
  }
];

// Calculate statistics
const totalPromotions = affiliatePromotions.length;
const averageRating = affiliatePromotions.reduce((sum, promo) => sum + promo.rating, 0) / totalPromotions;
const totalStudents = affiliatePromotions.reduce((sum, promo) => sum + promo.students, 0);
const categories = [...new Set(affiliatePromotions.map(p => p.categoryTh))].length;

export default function ReviewsPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Reviews Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 thai-text">
              คอร์สแนะนำ
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto thai-text">
              คอร์สเรียนออนไลน์คุณภาพสูงจากแพลตฟอร์มชั้นนำ พร้อมส่วนลดพิเศษ
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {affiliatePromotions.map((promotion, index) => (
              <AffiliateCard key={promotion.id} promotion={promotion} index={index} />
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
