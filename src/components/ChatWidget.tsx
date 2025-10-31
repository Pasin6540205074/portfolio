"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  isLoading?: boolean;
}

// Generate unique session ID
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => generateSessionId());
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "สวัสดีครับ! ผมเป็น AI ผู้ช่วยของpasin สามารถถามเกี่ยวกับประสบการณ์ ทักษะ หรือโครงการของเขาได้เลยครับ!",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Setup SSE connection when chat opens
  useEffect(() => {
    if (isOpen && !eventSource) {
      setConnectionStatus('connecting');
      const es = new EventSource(`/api/sse?sessionId=${sessionId}`);

      es.onopen = () => {
        setConnectionStatus('connected');
      };

      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'connected') {
            setConnectionStatus('connected');
          } else if (data.type === 'response') {
            // Remove loading message and add real response
            setMessages(prev => {
              const filtered = prev.filter(msg => !msg.isLoading);
              return [...filtered, {
                id: Date.now().toString(),
                content: data.message,
                role: "assistant",
                timestamp: new Date(),
              }];
            });
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Error parsing SSE data:', error);
        }
      };

      es.onerror = (error) => {
        console.warn('SSE connection error, will retry:', error);
        setConnectionStatus('disconnected');
        es.close();
        setEventSource(null);

        // Retry connection after a delay
        setTimeout(() => {
          if (isOpen && !eventSource) {
            console.log('Retrying SSE connection...');
            // The useEffect will handle reconnection
          }
        }, 3000);
      };

      setEventSource(es);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
      }
    };
  }, [isOpen, sessionId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    // Add loading message
    const loadingMessage: Message = {
      id: `loading_${Date.now()}`,
      content: "กำลังคิด...",
      role: "assistant",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput("");
    setIsLoading(true);

    // Set a timeout to handle cases where response never comes
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setMessages((prev) => {
          const filtered = prev.filter(msg => !msg.isLoading);
          return [...filtered, {
            id: (Date.now() + 2).toString(),
            content: "ขออภัยครับ การตอบกลับใช้เวลานานกว่าปกติ กรุณาลองใหม่อีกครั้งครับ",
            role: "assistant",
            timestamp: new Date(),
          }];
        });
        setIsLoading(false);
      }
    }, 30000); // 30 second timeout

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: messages,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      // Clear timeout since we got a response
      clearTimeout(timeoutId);

      // If we get immediate response (fallback), handle it
      if (data.message && !data.useSSE) {
        console.log('Received immediate response:', data);
        setMessages((prev) => {
          const filtered = prev.filter(msg => !msg.isLoading);
          return [...filtered, {
            id: (Date.now() + 1).toString(),
            content: data.message,
            role: "assistant",
            timestamp: new Date(),
          }];
        });
        setIsLoading(false);
      } else if (connectionStatus === 'disconnected' && data.message) {
        // If SSE is not working, use fallback response
        console.log('Using fallback response due to disconnected SSE:', data);
        setMessages((prev) => {
          const filtered = prev.filter(msg => !msg.isLoading);
          return [...filtered, {
            id: (Date.now() + 1).toString(),
            content: data.message,
            role: "assistant",
            timestamp: new Date(),
          }];
        });
        setIsLoading(false);
      } else if (data.useSSE) {
        console.log('Waiting for SSE response for session:', sessionId);
        // Keep loading state, wait for SSE response
      } else {
        // Fallback if no clear response format
        console.log('No clear response format, using fallback');
        setMessages((prev) => {
          const filtered = prev.filter(msg => !msg.isLoading);
          return [...filtered, {
            id: (Date.now() + 1).toString(),
            content: "ขออภัยครับ ได้รับข้อความแล้ว แต่ระบบมีปัญหาในการตอบกลับ กรุณาลองใหม่อีกครั้งครับ",
            role: "assistant",
            timestamp: new Date(),
          }];
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      clearTimeout(timeoutId);
      setMessages((prev) => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          id: (Date.now() + 1).toString(),
          content: "ขออภัยครับ ตอนนี้มีปัญหาในการตอบกลับ กรุณาลองใหม่อีกครั้งครับ",
          role: "assistant",
          timestamp: new Date(),
        }];
      });
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-16 right-4 sm:bottom-24 sm:right-6 z-40 w-80 sm:w-96 h-80 sm:h-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col"
          >
            {/* Header */}
            <div className="bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-t-lg">
              <h3 className="font-semibold">คุยกับ AI ของPasin</h3>
              <p className="text-sm text-blue-100 dark:text-blue-200">ถามอะไรเกี่ยวกับPasinได้เลย!</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div
                      className={`p-2 rounded-full ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {message.role === "user" ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      }`}
                    >
                      {message.isLoading ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 size={16} className="animate-spin" />
                          <p className="text-sm">{message.content}</p>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="ถามอะไรก็ได้..."
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
