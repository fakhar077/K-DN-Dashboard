import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../ui/Icon';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSetTheme: (theme: 'light' | 'dark') => void;
  onSetThemeName: (themeName: string) => void;
}

const themeColors = [
    { name: 'blue', color: '#2563eb' },
    { name: 'teal', color: '#0d9488' },
    { name: 'green', color: '#16a34a' },
    { name: 'pink', color: '#db2777' },
    { name: 'purple', color: '#7c3aed' },
];

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose, onSetTheme, onSetThemeName }) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const panelVariants = {
    hidden: { x: '100%', opacity: 0, scale: 0.95 },
    visible: { x: 0, opacity: 1, scale: 1 },
    exit: { x: '100%', opacity: 0, scale: 0.95 }
  };

  const handleLightMode = React.useCallback(() => {
    onSetTheme('light');
  }, [onSetTheme]);

  const handleDarkMode = React.useCallback(() => {
    onSetTheme('dark');
  }, [onSetTheme]);

  const handleColorSelect = React.useCallback((name: string) => {
    onSetThemeName(name);
    window.location.reload();
  }, [onSetThemeName]);

  return (
    <>
      {/* Panel */}
      <motion.div 
        variants={panelVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "exit"}
        exit="exit"
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-800 shadow-lg p-6 z-50"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Settings</h2>
          <motion.button 
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon name="x" className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Mode</h3>
          <div className="flex gap-4">
            <motion.button 
              onClick={handleLightMode} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <Icon name="sun" className="w-4 h-4" /> Light
            </motion.button>
            <motion.button 
              onClick={handleDarkMode} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <Icon name="moon" className="w-4 h-4" /> Dark
            </motion.button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Colors</h3>
          <div className="flex gap-2">
              {themeColors.map(({ name, color }) => (
                  <motion.button
                      key={name}
                      onClick={() => handleColorSelect(name)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-primary"
                      style={{ backgroundColor: color }}
                      aria-label={`Set theme to ${name}`}
                  />
              ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default React.memo(SettingsPanel);
