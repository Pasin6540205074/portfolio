"use client";

import { motion } from "framer-motion";
import { ExternalLink, ShoppingCart, Star, Clock, Users } from "lucide-react";
import { trackProductButtonClick, trackButtonClick } from "@/utils/analytics";

interface Product {
  id: string;
  title: string;
  titleTh: string;
  description: string;
  descriptionTh: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  type: "course" | "consulting" | "tool" | "affiliate";
  rating?: number;
  reviewCount?: number;
  duration?: string;
  students?: number;
  link: string;
  isExternal: boolean;
  badge?: string;
  badgeTh?: string;
  reviews?: ProductReview[];
}

interface ProductReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface ProductCardProps {
  product: Product;
  index: number;
  onProductClick?: (product: Product) => void;
  onPurchaseClick?: (product: Product) => void;
}

export function ProductCard({ product, index, onProductClick, onPurchaseClick }: ProductCardProps) {
  const handleCardClick = async () => {
    // Track card click
    await trackProductButtonClick(
      'product_card_click',
      'View Product Details',
      product.id,
      product.titleTh,
      product.price,
      product.currency,
      {
        productType: product.type,
        rating: product.rating,
        students: product.students,
        isExternal: product.isExternal
      }
    );

    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handlePurchaseClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click

    // Determine button type and text
    let buttonType = 'purchase_button';
    let buttonText = 'สั่งซื้อ';

    if (product.type === "affiliate") {
      buttonType = 'affiliate_link';
      buttonText = 'ดูรายละเอียด';
    } else if (product.price === 0) {
      buttonType = 'free_download';
      buttonText = 'รับฟรี';
    }

    // Track the purchase/action click
    await trackProductButtonClick(
      buttonType,
      buttonText,
      product.id,
      product.titleTh,
      product.price,
      product.currency,
      {
        productType: product.type,
        rating: product.rating,
        students: product.students,
        isExternal: product.isExternal,
        originalPrice: product.originalPrice,
        badge: product.badgeTh || product.badge
      }
    );

    if (product.isExternal) {
      window.open(product.link, '_blank', 'noopener,noreferrer');
    } else {
      if (onPurchaseClick) {
        onPurchaseClick(product);
      }
    }
  };

  const getTypeIcon = () => {
    switch (product.type) {
      case "course":
        return <Clock className="w-4 h-4" />;
      case "consulting":
        return <Users className="w-4 h-4" />;
      case "tool":
        return <ShoppingCart className="w-4 h-4" />;
      case "affiliate":
        return <ExternalLink className="w-4 h-4" />;
      default:
        return <ShoppingCart className="w-4 h-4" />;
    }
  };

  const getTypeColor = () => {
    switch (product.type) {
      case "course":
        return "bg-green-500";
      case "consulting":
        return "bg-blue-500";
      case "tool":
        return "bg-purple-500";
      case "affiliate":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeLabel = () => {
    switch (product.type) {
      case "course":
        return { en: "Course", th: "คอร์ส" };
      case "consulting":
        return { en: "Consulting", th: "ที่ปรึกษา" };
      case "tool":
        return { en: "Tool", th: "เครื่องมือ" };
      case "affiliate":
        return { en: "Partner", th: "พาร์ทเนอร์" };
      default:
        return { en: "Product", th: "ผลิตภัณฑ์" };
    }
  };

  const displayImage = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {displayImage ? (
          <img
            src={displayImage}
            alt={product.titleTh}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                {getTypeIcon()}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {getTypeLabel().th}
              </span>
            </div>
          </div>
        )}

        {/* Image count indicator */}
        {product.images && product.images.length > 1 && (
          <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
            +{product.images.length - 1}
          </div>
        )}

        {/* Type Badge */}
        <div className={`absolute top-3 left-3 ${getTypeColor()} text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
          {getTypeIcon()}
          <span className="hidden sm:inline">{getTypeLabel().th}</span>
        </div>

        {/* Special Badge */}
        {product.badge && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {product.badgeTh || product.badge}
          </div>
        )}

        {/* External Link Indicator */}
        {product.isExternal && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white p-1 rounded-full">
            <ExternalLink className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 thai-text">
          {product.titleTh}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {product.title}
        </p>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 thai-text">
          {product.descriptionTh}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{product.rating}</span>
              {product.reviewCount && (
                <span>({product.reviewCount})</span>
              )}
            </div>
          )}

          {product.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{product.duration}</span>
            </div>
          )}

          {product.students && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{product.students.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {product.price === 0 ? "ฟรี" : `${product.price.toLocaleString()} ${product.currency}`}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice.toLocaleString()} {product.currency}
              </span>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handlePurchaseClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
        >
          {product.type === "affiliate" ? (
            <>
              <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="thai-text">ดูรายละเอียด</span>
            </>
          ) : product.price === 0 ? (
            <>
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="thai-text">รับฟรี</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="thai-text">สั่งซื้อ</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
