"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, TrendingUp, Users, Filter } from "lucide-react";
import { trackButtonClick } from "@/utils/analytics";

/** ----------------------------------------------------------------
 *  SINGLE-FILE VERSION
 *  - รวม type Product, SuccessModal, ProductCard, ProductDetailModal, PaymentModal
 *  - ไม่มีการ import component จากไฟล์อื่น
 *  - ปุ่ม "สั่งซื้อ/รับฟรี" จะแสดง Popup สำเร็จทันที
 *  ---------------------------------------------------------------- */

/** -------------------------------
 *  Type สินค้า (อยู่ในไฟล์นี้)
 * ------------------------------- */
export type Product = {
  id: string;
  title: string;
  titleTh: string;
  description: string;
  descriptionTh: string;
  price: number; // บังคับเป็น number เพื่อเลี่ยง TS2719
  originalPrice?: number;
  currency: string;
  images: string[];
  type: "course" | "consulting" | "tool" | "affiliate";
  rating?: number;
  reviewCount?: number;
  duration?: string;
  students?: number;
  link?: string;
  isExternal?: boolean;
  badge?: string;
  badgeTh?: string;
  reviews?: Array<{
    id: string;
    name: string;
    rating: number;
    comment: string;
    date: string;
    verified: boolean;
  }>;
};

/** -------------------------------
 * Success Popup (อยู่ในไฟล์เดียว)
 * ------------------------------- */
function SuccessModal({
  open,
  text,
  onClose,
}: {
  open: boolean;
  text: string;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/30"
      onClick={onClose}
    >
      <div
        className="w-full sm:w-auto max-w-sm rounded-xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="M22 4 12 14.01l-3-3" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              ดำเนินการสำเร็จ
            </h4>
            <p className="text-gray-700 dark:text-gray-300">{text}</p>
          </div>
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
}

/** -------------------------------
 * Card สินค้า (เวอร์ชันเบา ใช้ prop ตามหน้าเพจนี้)
 * ------------------------------- */
function ProductCard({
  product,
  index,
  onViewDetail,
  onPurchase,
  onGetFree,
}: {
  product: Product;
  index: number;
  onViewDetail: () => void;
  onPurchase: () => void;
  onGetFree: () => void;
}) {
  const isFree =
    !product.price ||
    product.price === 0 ||
    product.badge === "Free" ||
    product.badgeTh === "ฟรี";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={product.images?.[0] ?? "https://picsum.photos/600/400"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
        />
        {product.badge || product.badgeTh ? (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {product.badgeTh ?? product.badge}
          </span>
        ) : null}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
          {product.titleTh}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
          {product.descriptionTh}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {isFree ? "ฟรี" : `${product.price.toLocaleString()} ${product.currency}`}
            </span>
            {product.originalPrice ? (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice.toLocaleString()} {product.currency}
              </span>
            ) : null}
          </div>
          {product.rating ? (
            <div className="text-sm text-yellow-600 dark:text-yellow-400">
              ★ {product.rating}
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={onViewDetail}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            ดูรายละเอียด
          </button>
          <button
            onClick={isFree ? onGetFree : onPurchase}
            className="flex-1 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isFree ? "รับฟรี" : "สั่งซื้อ"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/** -------------------------------
 * Modal รายละเอียด (ภายในไฟล์)
 * ------------------------------- */
function ProductDetailModal({
  isOpen,
  onClose,
  product,
  onPurchase,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onPurchase: (p: Product) => void;
}) {
  if (!isOpen || !product) return null;

  const isFree =
    !product.price ||
    product.price === 0 ||
    product.badge === "Free" ||
    product.badgeTh === "ฟรี";

  return (
    <div className="fixed inset-0 bg-black/50 z-[90] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={product.images?.[0] ?? "https://picsum.photos/1200/700"}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <button
            className="absolute top-3 right-3 bg-black/60 text-white rounded-full px-3 py-1 text-sm"
            onClick={onClose}
          >
            ปิด
          </button>
        </div>

        <div className="p-5">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {product.titleTh}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            {product.descriptionTh}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {isFree ? "ฟรี" : `${product.price.toLocaleString()} ${product.currency}`}
              </span>
              {product.originalPrice ? (
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPrice.toLocaleString()} {product.currency}
                </span>
              ) : null}
            </div>
            {product.rating ? (
              <div className="text-sm text-yellow-600 dark:text-yellow-400">
                ★ {product.rating} ({product.reviewCount ?? 0})
              </div>
            ) : null}
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              ปิด
            </button>
            <button
              onClick={() => onPurchase(product)}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isFree ? "รับฟรี" : "สั่งซื้อ"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** -------------------------------
 * (ทางเลือก) PaymentModal แบบสั้น ๆ
 *  - ตอนนี้ไม่ถูกเรียกใช้งาน แต่คงไว้กัน error
 * ------------------------------- */
function PaymentModal({
  isOpen,
  onClose,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}) {
  if (!isOpen || !product) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-[95] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">ยืนยันการชำระเงิน</h3>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{product.titleTh}</p>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
}

/** -------------------------------
 *   ข้อมูลสินค้า (รวม products ไว้ในไฟล์นี้)
 * ------------------------------- */
const products: Product[] = [
  {
    id: "1",
    title: "Complete AI Development Course",
    titleTh: "คอร์สพัฒนา AI ครบวงจร",
    description: "Learn to build AI applications from scratch with hands-on projects",
    descriptionTh:
      "เรียนรู้การสร้างแอปพลิเคชัน AI ตั้งแต่เริ่มต้นพร้อมโปรเจคจริง รวมถึงการสร้าง Chatbot, Computer Vision, และ NLP พร้อมโปรเจคจริงที่นำไปใช้ได้ทันที",
    price: 2990,
    originalPrice: 4990,
    currency: "THB",
    images: [
      "https://images.unsplash.com/photo-1743419672503-3e363bcd3634?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    ],
    type: "course",
    rating: 4.8,
    reviewCount: 127,
    duration: "6 ชั่วโมง",
    students: 1250,
    link: "#",
    isExternal: false,
    badge: "Best Seller",
    badgeTh: "ขายดี",
    reviews: [
      {
        id: "r1",
        name: "สมชาย ใจดี",
        rating: 5,
        comment: "คอร์สดีมาก อธิบายเข้าใจง่าย มีโปรเจคให้ทำจริง แนะนำเลยครับ",
        date: "2024-01-15",
        verified: true,
      },
      {
        id: "r2",
        name: "นิดา สวยงาม",
        rating: 5,
        comment: "เนื้อหาครบถ้วน อาจารย์สอนดี ตอบคำถามเร็ว คุ้มค่ามาก",
        date: "2024-01-10",
        verified: true,
      },
    ],
  },
  {
    id: "2",
    title: "1-on-1 AI Consulting",
    titleTh: "ที่ปรึกษา AI แบบตัวต่อตัว",
    description: "Personal consultation for your AI project needs",
    descriptionTh:
      "คำปรึกษาส่วนตัวสำหรับโปรเจค AI ของคุณ วิเคราะห์ปัญหา ออกแบบโซลูชัน และให้คำแนะนำการพัฒนาแบบละเอียด",
    price: 3500,
    currency: "THB",
    images: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
    ],
    type: "consulting",
    duration: "2 ชั่วโมง",
    link: "#",
    isExternal: false,
  },
  {
    id: "3",
    title: "AI Code Generator Tool",
    titleTh: "เครื่องมือสร้างโค้ด AI",
    description: "Automated code generation tool for faster development",
    descriptionTh:
      "เครื่องมือสร้างโค้ดอัตโนมัติเพื่อการพัฒนาที่รวดเร็ว รองรับหลายภาษาโปรแกรม มี Template สำเร็จรูป",
    price: 0,
    currency: "THB",
    images: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"],
    type: "tool",
    rating: 4.5,
    reviewCount: 89,
    link: "#",
    isExternal: false,
    badge: "Free",
    badgeTh: "ฟรี",
    reviews: [
      {
        id: "r3",
        name: "วิชัย โค้ดดี",
        rating: 4,
        comment:
          "ใช้งานง่าย ช่วยประหยัดเวลาได้เยอะ แต่บางครั้งโค้ดที่ออกมายังต้องแก้ไขเพิ่มเติม",
        date: "2024-01-08",
        verified: true,
      },
    ],
  },
  {
    id: "4",
    title: "Advanced Flutter Course",
    titleTh: "คอร์ส Flutter ขั้นสูง",
    description: "Master Flutter development with advanced techniques",
    descriptionTh:
      "เชี่ยวชาญการพัฒนา Flutter ด้วยเทคนิคขั้นสูง สร้างแอปที่สวยงามและมีประสิทธิภาพ รวมถึง State Management และ Animation",
    price: 1990,
    originalPrice: 2990,
    currency: "THB",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
    ],
    type: "course",
    rating: 4.7,
    reviewCount: 203,
    duration: "8 ชั่วโมง",
    students: 890,
    link: "#",
    isExternal: false,
  },
  {
    id: "5",
    title: "Cloud Architecture Consulting",
    titleTh: "ที่ปรึกษาสถาปัตยกรรม Cloud",
    description: "Expert guidance for cloud infrastructure design",
    descriptionTh:
      "คำแนะนำจากผู้เชี่ยวชาญสำหรับการออกแบบโครงสร้าง Cloud ครอบคลุม AWS, Azure, GCP และ Best Practices",
    price: 5000,
    currency: "THB",
    images: ["https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"],
    type: "consulting",
    duration: "3 ชั่วโมง",
    link: "#",
    isExternal: false,
  },
  {
    id: "6",
    title: "Udemy - Machine Learning A-Z",
    titleTh: "Udemy - Machine Learning A-Z",
    description: "Comprehensive ML course on Udemy platform",
    descriptionTh:
      "คอร์ส Machine Learning ครบวงจรบนแพลตฟอร์ม Udemy เรียนรู้ทุกอย่างตั้งแต่พื้นฐานจนถึงขั้นสูง",
    price: 599,
    originalPrice: 1999,
    currency: "THB",
    images: ["https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop"],
    type: "affiliate",
    rating: 4.9,
    reviewCount: 15420,
    duration: "44 ชั่วโมง",
    students: 125000,
    link: "https://udemy.com",
    isExternal: true,
    badge: "70% OFF",
    badgeTh: "ลด 70%",
  },
];

/** -------------------------------
 *   หมวดหมู่
 * ------------------------------- */
const categories = [
  { id: "all", label: "ทั้งหมด", labelEn: "All" },
  { id: "course", label: "คอร์ส", labelEn: "Courses" },
  { id: "consulting", label: "ที่ปรึกษา", labelEn: "Consulting" },
  { id: "tool", label: "เครื่องมือ", labelEn: "Tools" },
  { id: "affiliate", label: "พาร์ทเนอร์", labelEn: "Partners" },
] as const;

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]["id"]>("all");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // (เผื่ออนาคต) PaymentModal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [productToPurchase, setProductToPurchase] = useState<Product | null>(null);

  // Success popup
  const [successOpen, setSuccessOpen] = useState(false);
  const [successText, setSuccessText] = useState("");

  useEffect(() => {
    if (!successOpen) return;
    const t = setTimeout(() => setSuccessOpen(false), 2500);
    return () => clearTimeout(t);
  }, [successOpen]);

  const filteredProducts = products.filter(
    (p) => selectedCategory === "all" || p.type === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.price ?? 0) - (b.price ?? 0);
      case "price-high":
        return (b.price ?? 0) - (a.price ?? 0);
      case "rating":
        return (b.rating ?? 0) - (a.rating ?? 0);
      case "popular":
        return (b.students ?? 0) - (a.students ?? 0);
      default:
        return 0;
    }
  });

  const handleProductClick = async (product: Product) => {
    await trackButtonClick?.(
      "product_modal_open",
      "Open Product Details",
      `modal-${product.id}`,
      {
        productId: product.id,
        productName: product.titleTh,
        productType: product.type,
      }
    );
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const showSuccess = (msg: string) => {
    setSuccessText(msg);
    setSuccessOpen(true);
  };

  // ปุ่ม "สั่งซื้อ/รับฟรี" → โชว์สำเร็จทันที (affiliate จะเปิดลิงก์ตามหลังเล็กน้อย)
  const handleInstantPurchase = async (product: Product) => {
    try {
      await trackButtonClick?.(
        "instant_purchase",
        "Instant Purchase Success",
        `buy-${product.id}`,
        {
          productId: product.id,
          productName: product.titleTh,
          productType: product.type,
          price: product.price,
        }
      );

      const isFree =
        !product.price ||
        product.price === 0 ||
        product.badge === "Free" ||
        product.badgeTh === "ฟรี";

      // เพิ่ม delay เล็กน้อยเพื่อความลื่นไหล
      await new Promise((resolve) => setTimeout(resolve, 400));

      showSuccess(
        isFree
          ? "รับฟรีสำเร็จ! คุณสามารถใช้งานได้ทันที 🎉"
          : "สั่งซื้อสำเร็จ! ขอบคุณที่อุดหนุน 🙏"
      );

      if (product.isExternal && product.link) {
        setTimeout(
          () => window.open(product.link!, "_blank", "noopener,noreferrer"),
          900
        );
      }
    } catch (error) {
      console.error("Error during purchase:", error);
      showSuccess("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง ❌");
    }
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setProductToPurchase(null);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 thai-text">
              ร้านค้าและผลิตภัณฑ์
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 thai-text">
              คอร์สเรียน บริการที่ปรึกษา และเครื่องมือที่จะช่วยพัฒนาทักษะของคุณ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {products.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 thai-text">
                ผลิตภัณฑ์
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                4.8
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 thai-text">
                คะแนนเฉลี่ย
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx_auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                2.5K+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 thai-text">
                นักเรียน
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                95%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 thai-text">
                ความพึงพอใจ
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row justify_between items-start md:items-center gap-4"
          >
            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={async () => {
                    await trackButtonClick?.(
                      "category_filter",
                      category.label,
                      `category-${category.id}`,
                      {
                        previousCategory: selectedCategory,
                        newCategory: category.id,
                      }
                    );
                    setSelectedCategory(category.id);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 thai-text">
                เรียงตาม:
              </span>
              <select
                value={sortBy}
                onChange={async (e) => {
                  const newSortBy = e.target.value;
                  await trackButtonClick?.(
                    "sort_filter",
                    `Sort by: ${newSortBy}`,
                    `sort-${newSortBy}`,
                    {
                      previousSort: sortBy,
                      newSort: newSortBy,
                    }
                  );
                  setSortBy(newSortBy);
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="featured">แนะนำ</option>
                <option value="price-low">ราคาต่ำ - สูง</option>
                <option value="price-high">ราคาสูง - ต่ำ</option>
                <option value="rating">คะแนนสูงสุด</option>
                <option value="popular">ยอดนิยม</option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 thai-text">
              ผลิตภัณฑ์และบริการ
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto thai-text">
              เลือกจากคอร์สเรียน บริการที่ปรึกษา และเครื่องมือที่หลากหลาย
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onViewDetail={() => handleProductClick(product)}
                onPurchase={() => handleInstantPurchase(product)}
                onGetFree={() => handleInstantPurchase(product)}
              />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 thai-text">
                ไม่พบผลิตภัณฑ์
              </h3>
              <p className="text-gray-600 dark:text-gray-400 thai-text">
                ลองเปลี่ยนหมวดหมู่หรือเงื่อนไขการค้นหา
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modals */}
      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        product={selectedProduct}
        onPurchase={(p) => handleInstantPurchase(p)}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        product={productToPurchase}
      />

      {/* Success Popup */}
      <SuccessModal
        open={successOpen}
        text={successText}
        onClose={() => setSuccessOpen(false)}
      />
    </div>
  );
}
