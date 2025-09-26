
import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  description: string;
  icon: string;
  gradient: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, changeType, description, icon, gradient }) => {
  return (
    <motion.div
      className="kpi-card bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex items-start gap-3 hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className={`p-3 rounded-lg ${gradient} text-white`}>
        <Icon name={icon} className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-2xl font-bold">{value}</h4>
          <span className={`text-sm ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>{change}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">{description}</p>
      </div>
    </motion.div>
  );
};

export default KpiCard;
