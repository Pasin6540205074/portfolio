"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Clock, Users, ExternalLink, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { StarRating } from "./StarRating";

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

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onPurchaseClick?: (product: Product) => void;
}

export function ProductDetailModal({ isOpen, onClose, product, onPurchaseClick }: ProductDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const handlePurchaseClick = () => {
    if (product.isExternal) {
      window.open(product.link, '_blank', 'noopener,noreferrer');
    } else {
      if (onPurchaseClick) {
        onPurchaseClick(product);
      }
    }
  };

  const nextImage = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const displayImage = product.images && product.images.length > 0 ? product.images[currentImageIndex] : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white thai-text">
                รายละเอียดสินค้า
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div>
                  <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden mb-4">
                    {displayImage ? (
                      <img
                        src={displayImage}
                        alt={product.titleTh}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <ShoppingCart className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                            {product.type}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Image Navigation */}
                    {product.images && product.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                          {currentImageIndex + 1} / {product.images.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {product.images && product.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                            currentImageIndex === index
                              ? "border-blue-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.titleTh} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 thai-text">
                    {product.titleTh}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {product.title}
                  </p>

                  {/* Rating & Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <StarRating rating={product.rating} readonly size="sm" />
                        <span>{product.rating}</span>
                        {product.reviewCount && (
                          <span>({product.reviewCount} รีวิว)</span>
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
                        <span>{product.students.toLocaleString()} คน</span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {product.price === 0 ? "ฟรี" : `${product.price.toLocaleString()} ${product.currency}`}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-lg text-gray-500 line-through">
                        {product.originalPrice.toLocaleString()} {product.currency}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 thai-text">
                      รายละเอียด
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed thai-text">
                      {product.descriptionTh}
                    </p>
                  </div>

                  {/* Purchase Button */}
                  <button
                    onClick={handlePurchaseClick}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mb-4"
                  >
                    {product.type === "affiliate" ? (
                      <>
                        <ExternalLink className="w-5 h-5" />
                        <span className="thai-text">ดูรายละเอียด</span>
                      </>
                    ) : product.price === 0 ? (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span className="thai-text">รับฟรี</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span className="thai-text">สั่งซื้อ</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Product Reviews */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 thai-text">
                    รีวิวสินค้า
                  </h3>
                  <div className="space-y-4">
                    {product.reviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {review.name}
                            </span>
                            {review.verified && (
                              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                                ยืนยันการซื้อ
                              </span>
                            )}
                          </div>
                          <StarRating rating={review.rating} readonly size="sm" />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          {review.comment}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {new Date(review.date).toLocaleDateString('th-TH')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
