"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ToastType = "success" | "danger" | "info" | "warning";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
  timeStr: string;
};

interface ToastContextType {
  showToast: (message: string, timeStr: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (
    message: string,
    timeStr: string,
    type: ToastType = "info"
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, timeStr }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3  flex justify-center items-start flex-col rounded-md shadow-md animate-slide-in ${
              toast.type === "success"
                ? "bg-green-100 text-black border border-green-800"
                : toast.type === "danger"
                ? "bg-red-100 text-black border border-red-800"
                : toast.type === "warning"
                ? "bg-yellow-100 text-black border border-yellow-800"
                : "bg-blue-100 text-black border border-blue-800"
            }`}
          >
            <p>{toast.message}</p>
            <p>{toast.timeStr}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
