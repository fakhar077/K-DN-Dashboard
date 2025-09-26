import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Sidebar from './components/layout/Sidebar';
import SalesDashboard from './components/dashboards/SalesDashboard';
import ProjectManagementDashboard from './components/dashboards/ProjectManagementDashboard';
import EcommerceDashboard from './components/dashboards/EcommerceDashboard';
import Alerts from './components/pages/Alerts';
import Buttons from './components/pages/Buttons';
import UserList from './components/pages/UserList';
import UserProfile from './components/pages/UserProfile';
import RolesPermissions from './components/pages/RolesPermissions';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import SettingsPanel from './components/layout/SettingsPanel';
import Header from './components/layout/Header';

const themes = {
  blue: {
    '--color-primary': '#2563eb',
    '--color-primary-hover': '#1d4ed8',
    '--color-text-on-primary': '#ffffff',
  },
  teal: {
    '--color-primary': '#0d9488',
    '--color-primary-hover': '#0f766e',
    '--color-text-on-primary': '#ffffff',
  },
  green: {
    '--color-primary': '#16a34a',
    '--color-primary-hover': '#15803d',
    '--color-text-on-primary': '#ffffff',
  },
  pink: {
    '--color-primary': '#db2777',
    '--color-primary-hover': '#be185d',
    '--color-text-on-primary': '#ffffff',
  },
  purple: {
      '--color-primary': '#7c3aed',
      '--color-primary-hover': '#6d28d9',
      '--color-text-on-primary': '#ffffff',
  }
};


const App: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [themeName, setThemeName] = useState(() => {
    return localStorage.getItem('themeName') || 'blue';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  useEffect(() => {
    const selectedTheme = (themes as any)[themeName];
    if (selectedTheme) {
      for (const [key, value] of Object.entries(selectedTheme)) {
        document.documentElement.style.setProperty(key, value as string);
      }
      localStorage.setItem('themeName', themeName);
    }
  }, [themeName]);


  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  const isAuthPage = location.pathname.startsWith('/auth');

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  if (isAuthPage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <AnimatePresence mode="wait" key={location.pathname}>
          <Routes location={location}>
            <Route path="/auth/login" element={
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Login />
              </motion.div>
            } />
            <Route path="/auth/register" element={
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Register />
              </motion.div>
            } />
            <Route path="/auth/forgot-password" element={
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ForgotPassword />
              </motion.div>
            } />
            <Route path="/auth/reset-password" element={
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ResetPassword />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} onSettingsClick={() => setIsSettingsOpen(true)} onToggle={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header 
          onSettingsClick={() => setIsSettingsOpen(true)} 
          onSidebarToggle={toggleSidebar}
          onToggleTheme={toggleTheme}
          theme={theme}
        />
        <main className="flex-1">
          <AnimatePresence mode="wait" key={location.pathname}>
            <Routes location={location}>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <SalesDashboard theme={theme} />
              </motion.div>
            } />
              <Route path="/project-management" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <ProjectManagementDashboard theme={theme} />
                </motion.div>
              } />
              <Route path="/ecommerce" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <EcommerceDashboard theme={theme} />
                </motion.div>
              } />
              <Route path="/components/alerts" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Alerts />
                </motion.div>
              } />
              <Route path="/components/buttons" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Buttons />
                </motion.div>
              } />
              <Route path="/user-management/user-list" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <UserList />
                </motion.div>
              } />
              <Route path="/user-management/user-profile" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <UserProfile />
                </motion.div>
              } />
              <Route path="/user-management/roles-permissions" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <RolesPermissions />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} onSetTheme={setTheme} onSetThemeName={setThemeName} />
    </div>
  );
};

export default App;