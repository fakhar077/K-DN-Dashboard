import React from 'react';
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
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Panel */}
      <div className={`fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-800 shadow-lg p-6 z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'transform translate-x-0' : 'transform translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button onClick={onClose}><Icon name="x" className="w-6 h-6" /></button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Mode</h3>
          <div className="flex gap-4">
            <button onClick={() => onSetTheme('light')} className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
              <Icon name="sun" className="w-4 h-4" /> Light
            </button>
            <button onClick={() => onSetTheme('dark')} className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
              <Icon name="moon" className="w-4 h-4" /> Dark
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Colors</h3>
          <div className="flex gap-2">
              {themeColors.map(({ name, color }) => (
                  <button 
                      key={name}
                      onClick={() => onSetThemeName(name)}
                      className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-primary"
                      style={{ backgroundColor: color }}
                      aria-label={`Set theme to ${name}`}
                  />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;