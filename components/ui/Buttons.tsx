import React from "react";
import { motion } from "framer-motion";

const Buttons: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const Button: React.FC<{
    children: React.ReactNode;
    variant: "primary" | "secondary" | "danger" | "success";
    size: "sm" | "md" | "lg";
    onClick?: () => void;
  }> = ({ children, variant, size, onClick }) => {
    const baseClasses = "font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    };

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
        onClick={onClick}
      >
        {children}
      </motion.button>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-bold mb-4">Button Examples</h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Primary Buttons</h3>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Secondary Buttons</h3>
          <div className="flex gap-4 flex-wrap">
            <Button variant="secondary" size="sm">Small</Button>
            <Button variant="secondary" size="md">Medium</Button>
            <Button variant="secondary" size="lg">Large</Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Danger Buttons</h3>
          <div className="flex gap-4 flex-wrap">
            <Button variant="danger" size="sm">Small</Button>
            <Button variant="danger" size="md">Medium</Button>
            <Button variant="danger" size="lg">Large</Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Success Buttons</h3>
          <div className="flex gap-4 flex-wrap">
            <Button variant="success" size="sm">Small</Button>
            <Button variant="success" size="md">Medium</Button>
            <Button variant="success" size="lg">Large</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Buttons;
