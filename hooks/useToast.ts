"use client";

import { useState, useCallback, useRef } from "react";
import type { Toast } from "@/types";

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timerRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  const addToast = useCallback(
    (icon: string, message: string, type: Toast["type"] = "success") => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const toast: Toast = { id, icon, message, type };

      setToasts((prev) => [...prev.slice(-3), toast]); // max 4 toasts

      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        timerRef.current.delete(id);
      }, 3000);

      timerRef.current.set(id, timer);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    const timer = timerRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timerRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
