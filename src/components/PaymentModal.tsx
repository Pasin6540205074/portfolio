"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, CheckCircle } from "lucide-react";
import { trackProductButtonClick } from "@/utils/analytics";

interface Product {
  id: string;
  title: string;
  titleTh: string;
  price: number;
  currency: string;
  images: string[];
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

// Dummy PromptPay QR Code - replace with actual QR code image
const PROMPTPAY_QR_CODE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ3aGl0ZSIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9ImJsYWNrIi8+CiAgPHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgZmlsbD0id2hpdGUiLz4KICA8cmVjdCB4PSIzMCIgeT0iMzAiIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIiBmaWxsPSJibGFjayIvPgogIDxyZWN0IHg9IjQwIiB5PSI0MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IndoaXRlIi8+CiAgPHJlY3QgeD0iNTAiIHk9IjUwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iYmxhY2siLz4KICA8cmVjdCB4PSI2MCIgeT0iNjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0id2hpdGUiLz4KICA8cmVjdCB4PSI3MCIgeT0iNzAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iYmxhY2siLz4KICA8cmVjdCB4PSI4MCIgeT0iODAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0id2hpdGUiLz4KICA8cmVjdCB4PSI5MCIgeT0iOTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz4KPC9zdmc+";

export function PaymentModal({ isOpen, onClose, product }: PaymentModalProps) {
  const [countdown, setCountdown] = useState(600); // 10 minutes
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(600);
      setIsSuccess(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };



  if (!product) return null;

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
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            {isSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 thai-text">
                  ได้รับการแจ้งชำระเงินแล้ว!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 thai-text">
                  เราจะตรวจสอบการชำระเงินและส่งข้อมูลการเข้าถึงให้คุณทางไลน์
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white thai-text">
                    ชำระเงิน
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Countdown */}
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <span className="text-sm font-medium text-orange-800 dark:text-orange-200 thai-text">
                      เวลาที่เหลือ: {formatTime(countdown)}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2 thai-text">
                    {product.titleTh}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 thai-text">ราคา:</span>
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {product.price.toLocaleString()} {product.currency}
                    </span>
                  </div>
                </div>

                {/* PromptPay QR Code */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4 text-center thai-text">
                    สแกน QR Code เพื่อชำระเงิน
                  </h3>
                  <div className="flex justify-center mb-4">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                      <img
                        src={PROMPTPAY_QR_CODE}
                        alt="PromptPay QR Code"
                        className="w-48 h-48"
                      />
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 thai-text">
                      สแกน QR Code ด้วยแอปธนาคารของคุณ
                    </p>
                  </div>
                </div>

                {/* Line Contact Instructions */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                  <div className="text-center">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 thai-text">
                      หลังจากชำระเงินแล้ว
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mb-3 thai-text">
                      กรุณาแจ้งการชำระเงินผ่านไลน์
                    </p>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 inline-block">
                      <p className="font-bold text-green-600 dark:text-green-400 text-lg">
                        @pasin
                      </p>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2 thai-text">
                      พร้อมแนบหลักฐานการโอนเงิน
                    </p>
                  </div>
                </div>

                {/* Confirmation Button */}
                <button
                  onClick={async () => {
                    // Track payment confirmation
                    if (product) {
                      await trackProductButtonClick(
                        'payment_confirmation',
                        'ชำระเงินแล้ว',
                        product.id,
                        product.titleTh,
                        product.price,
                        product.currency,
                        {
                          paymentMethod: 'promptpay',
                          paymentStatus: 'confirmed_by_user'
                        }
                      );
                    }
                    setIsSuccess(true);
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="thai-text">ชำระเงินแล้ว</span>
                </button>

                {/* Terms */}
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4 thai-text">
                  กรุณาแจ้งการชำระเงินผ่านไลน์ @pasin เพื่อยืนยันการสั่งซื้อ
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
