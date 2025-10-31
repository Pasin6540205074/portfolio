"use client";

import { motion } from "framer-motion";
import { StarRating } from "./StarRating";
import { ExternalLink, Users, Clock, Award, Gift } from "lucide-react";
import { trackAffiliateClick } from "@/utils/analytics";

interface AffiliatePromotion {
  id: string;
  title: string;
  titleTh: string;
  description: string;
  descriptionTh: string;
  originalPrice: number;
  salePrice: number;
  currency: string;
  discount: string;
  rating: number;
  students: number;
  instructor: string;
  duration: string;
  image: string;
  affiliateLink: string;
  category: string;
  categoryTh: string;
  highlights: string[];
  badge: string;
  badgeTh: string;
}

interface AffiliateCardProps {
  promotion: AffiliatePromotion;
  index: number;
}

export function AffiliateCard({ promotion, index }: AffiliateCardProps) {
  const handleClick = async () => {
    // Track the affiliate click
    await trackAffiliateClick(
      promotion.id,
      promotion.titleTh,
      promotion.affiliateLink,
      {
        category: promotion.categoryTh,
        rating: promotion.rating,
        students: promotion.students,
        originalPrice: promotion.originalPrice,
        salePrice: promotion.salePrice,
        discount: promotion.discount,
        badge: promotion.badgeTh
      }
    );

    // Open the affiliate link
    window.open(promotion.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const getBadgeColor = () => {
    switch (promotion.badge) {
      case "Best Seller":
        return "bg-orange-500";
      case "Free Trial":
        return "bg-green-500";
      case "Popular":
        return "bg-blue-500";
      case "Certification":
        return "bg-purple-500";
      case "Professional":
        return "bg-indigo-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={promotion.image}
          alt={promotion.titleTh}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge */}
        <div className={`absolute top-3 left-3 ${getBadgeColor()} text-white px-3 py-1 rounded-full text-sm font-medium`}>
          {promotion.badgeTh}
        </div>

        {/* Discount */}
        {promotion.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {promotion.discount}
          </div>
        )}

        {/* External Link Indicator */}
        <div className="absolute bottom-3 right-3 bg-black/50 text-white p-2 rounded-full">
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
            {promotion.categoryTh}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 thai-text line-clamp-2">
          {promotion.titleTh}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          โดย {promotion.instructor}
        </p>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2 thai-text">
          {promotion.descriptionTh}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <StarRating rating={promotion.rating} readonly size="sm" />
            <span>{promotion.rating}</span>
          </div>

          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{(promotion.students / 1000).toFixed(0)}K</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{promotion.duration}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <ul className="space-y-1">
            {promotion.highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 thai-text">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {promotion.salePrice === 0 ? "ฟรี" : `${promotion.salePrice.toLocaleString()} ${promotion.currency}`}
            </span>
            {promotion.originalPrice > promotion.salePrice && (
              <span className="text-sm text-gray-500 line-through">
                {promotion.originalPrice.toLocaleString()} {promotion.currency}
              </span>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={async (e) => {
            e.stopPropagation();
            await handleClick();
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
        >
          <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="thai-text">ดูรายละเอียด</span>
        </button>
      </div>
    </motion.div>
  );
}
