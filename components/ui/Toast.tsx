"use client";

import { useEffect, useRef, useState } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { clsx } from "clsx";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  show: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  type = "success",
  show,
  onClose,
  duration = 4000,
}: ToastProps) {
  const [visible, setVisible] = useState(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (show) {
      requestAnimationFrame(() => setVisible(true));
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onCloseRef.current(), 300);
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [show, duration]);

  if (!show) return null;

  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <div
      className={clsx(
        "fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl transition-all duration-300 max-w-sm",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0",
        type === "success"
          ? "bg-green-600 text-white"
          : "bg-red-600 text-white"
      )}
      role="alert"
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(() => onCloseRef.current(), 300);
        }}
        className="p-0.5 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
        aria-label="Fechar"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}