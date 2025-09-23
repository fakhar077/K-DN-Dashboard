import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NotificationModal from './NotificationModal';
import Icon from '../ui/Icon';

interface HeaderProps {
    onSettingsClick: () => void;
    onSidebarToggle: () => void;
    onToggleTheme: () => void;
    theme: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick, onSidebarToggle, onToggleTheme, theme }) => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const location = useLocation();

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/': return 'Sales Dashboard';
            case '/project-management': return 'Project Management';
            case '/ecommerce': return 'E-Commerce Dashboard';
            case '/components/alerts': return 'Alerts Components';
            case '/components/buttons': return 'Buttons Components';
            default: return 'Dashboard';
        }
    };

    return (
        <>
            <header className="sticky top-0 z-40 flex justify-between items-center bg-white dark:bg-gray-800 shadow px-6 py-4">
                <div className="flex items-center gap-4">
                    <button onClick={onSidebarToggle} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700" title="Toggle Sidebar">
                        <Icon name="menu" className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={onToggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700" title="Toggle theme">
                        <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700" title="Search">
                        <Icon name="search" className="w-5 h-5" />
                    </button>
                    <button onClick={() => setIsNotificationOpen(true)} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700" title="Notifications">
                        <Icon name="bell" className="w-5 h-5" />
                    </button>
                    <button onClick={onSettingsClick} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700" title="Settings">
                        <Icon name="settings" className="w-5 h-5" />
                    </button>
                    <img src="https://i.pravatar.cc/40" className="w-9 h-9 rounded-full border" alt="User" />
                </div>
            </header>
            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 px-6 py-3 shadow-sm">
                <h2 className="text-lg font-semibold">{getPageTitle()}</h2>
                <div className="flex items-center gap-3">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm font-medium">
                        View on GitHub
                    </a>
                </div>
            </div>
            <NotificationModal isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
        </>
    );
};

export default Header;
