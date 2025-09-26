import React from "react";
import { motion } from "framer-motion";

interface AlertProps {
  type: "success" | "error" | "warning" | "info" | "loading" | "network" | "custom";
  title: string;
  message: string;
  onClose?: () => void;
}

const alertVariants = {
  success: "bg-green-50 border-l-8 border-green-400 dark:bg-green-900 dark:border-green-600",
  error: "bg-red-50 border-l-8 border-red-400 dark:bg-red-900 dark:border-red-600",
  warning: "bg-yellow-50 border-l-8 border-yellow-400 dark:bg-yellow-900 dark:border-yellow-600",
  info: "bg-blue-50 border-l-8 border-blue-400 dark:bg-blue-900 dark:border-blue-600",
  loading: "bg-gray-50 border-l-8 border-gray-400 dark:bg-gray-900 dark:border-gray-600",
  network: "bg-purple-50 border-l-8 border-purple-400 dark:bg-purple-900 dark:border-purple-600",
  custom: "bg-pink-50 border-l-8 border-pink-400 dark:bg-pink-900 dark:border-pink-600",
};

const iconSVG = {
  success: (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M4.93 19h14.14c1.16 0 1.76-1.24 1.16-2.16L13.16 4.84a1.25 1.25 0 00-2.32 0L3.77 16.84c-.6.92 0 2.16 1.16 2.16z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 6a9 9 0 110 18 9 9 0 010-18z" />
    </svg>
  ),
  loading: (
    <svg className="animate-spin w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
  ),
  network: (
    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
    </svg>
  ),
  custom: (
    <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -30, scale: 0.95, rotate: -2 },
  visible: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 150, damping: 20 } },
};

const Alerts: React.FC = () => {
  const Alert: React.FC<AlertProps> = ({ type, title, message, onClose }) => (
    <motion.div
      variants={itemVariants}
      className={`flex items-start justify-between p-5 rounded-xl shadow-lg transition-transform transform hover:scale-[1.03] ${alertVariants[type]}`}
    >
      <div className="flex items-center gap-3">
        {iconSVG[type]}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          ×
        </button>
      )}
    </motion.div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Dynamic Alerts Showcase</h2>

      {/* Success Alerts */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-green-600 dark:text-green-400 mb-2">✅ Success Alerts</h3>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
          <Alert type="success" title="Operation Successful" message="Your data has been saved successfully!" />
          <Alert type="success" title="Profile Updated" message="Profile changes applied without any errors." />
        </motion.div>
      </div>

      {/* Error Alerts */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-red-600 dark:text-red-400 mb-2">❌ Error Alerts</h3>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
          <Alert type="error" title="Action Failed" message="Something went wrong. Try again later." />
          <Alert type="network" title="Network Error" message="Cannot connect to the server." />
        </motion.div>
      </div>

      {/* Warning Alerts */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-yellow-600 dark:text-yellow-400 mb-2">⚠️ Warning Alerts</h3>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
          <Alert type="warning" title="Delete Confirmation" message="This action cannot be undone!" />
          <Alert type="custom" title="Custom Warning" message="Make sure you check all options before proceeding." />
        </motion.div>
      </div>

      {/* Info & Loading Alerts */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400 mb-2">ℹ️ Info & Loading</h3>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
          <Alert type="info" title="Information" message="Your subscription will renew next month." />
          <Alert type="loading" title="Processing" message="Please wait while we process your request..." />
        </motion.div>
      </div>
    </div>
  );
};

export default Alerts;
