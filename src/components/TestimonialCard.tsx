"use client";

import { motion } from "framer-motion";
import { StarRating } from "./StarRating";
import { Building2, Calendar, Clock, TrendingUp } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  rating: number;
  comment: string;
  project: string;
  serviceType: string;
  duration: string;
  date: string;
  language: "th" | "en";
  results: string;
  avatar?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
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
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            {testimonial.avatar ? (
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              testimonial.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {testimonial.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {testimonial.position}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
              <Building2 className="w-3 h-3" />
              <span>{testimonial.company}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          {new Date(testimonial.date).toLocaleDateString(
            testimonial.language === "th" ? "th-TH" : "en-US",
            { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            }
          )}
        </div>
      </div>

      {/* Service Type & Duration */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
          <span>{testimonial.serviceType}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
          <Clock className="w-3 h-3" />
          <span>{testimonial.duration}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} readonly size="md" showValue />
      </div>

      {/* Project */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
          {testimonial.project}
        </h4>
      </div>

      {/* Comment */}
      <p className={`text-gray-700 dark:text-gray-300 leading-relaxed mb-4 ${
        testimonial.language === "th" ? "thai-text" : ""
      }`}>
        "{testimonial.comment}"
      </p>

      {/* Results */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-green-800 dark:text-green-200 thai-text">
            ผลลัพธ์ที่ได้
          </span>
        </div>
        <p className={`text-sm text-green-700 dark:text-green-300 ${
          testimonial.language === "th" ? "thai-text" : ""
        }`}>
          {testimonial.results}
        </p>
      </div>

      {/* Language indicator */}
      <div className="flex justify-end">
        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
          {testimonial.language === "th" ? "ไทย" : "EN"}
        </span>
      </div>
    </motion.div>
  );
}
