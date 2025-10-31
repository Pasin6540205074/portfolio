"use client";

import { motion } from "framer-motion";
import { StarRating } from "./StarRating";
import { User, Calendar } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  project?: string;
  date: string;
  language: "th" | "en";
  avatar?: string;
}

interface ReviewCardProps {
  review: Review;
  index: number;
}

export function ReviewCard({ review, index }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            {review.avatar ? (
              <img 
                src={review.avatar} 
                alt={review.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {review.name}
            </h3>
            {review.project && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {review.project}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          {new Date(review.date).toLocaleDateString(
            review.language === "th" ? "th-TH" : "en-US",
            { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            }
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={review.rating} readonly size="md" showValue />
      </div>

      {/* Comment */}
      <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${
        review.language === "th" ? "thai-text" : ""
      }`}>
        "{review.comment}"
      </p>

      {/* Language indicator */}
      <div className="mt-4 flex justify-end">
        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
          {review.language === "th" ? "ไทย" : "EN"}
        </span>
      </div>
    </motion.div>
  );
}
