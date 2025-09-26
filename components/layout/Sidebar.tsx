import React, { useState, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../ui/Icon';

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, children }) => (
  <motion.div
    whileHover={{ scale: 1.05, x: 5 }}
    whileTap={{ scale: 0.95 }}
    className="rounded-lg relative"
  >
    <div className="absolute left-0 top-1/2 flex items-center transform -translate-y-1/2 z-10">
      <div className="w-px h-1.5 bg-primary dark:bg-primary rounded-full mr-1" /> {/* Vertical curve attachment */}
      <div className="w-5 h-px bg-primary dark:bg-primary rounded-r-full" /> {/* Horizontal with right curve to text */}
    </div>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `sidebar-link block pl-7 py-2 transition-colors duration-300 hover:text-primary ${
          isActive ? 'text-primary dark:text-primary font-bold bg-gray-100 dark:bg-gray-700' : 'font-bold'
        } rounded-lg`
      }
    >
      {children}
    </NavLink>
  </motion.div>
);

interface AccordionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  isCollapsed: boolean;
  activeAccordions: string[];
  setActiveAccordions: (accordions: string[]) => void;
  onToggle: () => void;
  isMounted: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  icon,
  children,
  isCollapsed,
  activeAccordions,
  setActiveAccordions,
  onToggle,
  isMounted,
}) => {
  const location = useLocation();

  const hasActiveChild = useMemo(() => {
    let active = false;
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && (child.props as any).to) {
        const path = (child.props as any).to;
        if (path === '/') {
          if (location.pathname === '/') active = true;
        } else if (location.pathname.startsWith(path)) {
          active = true;
        }
      }
    });
    return active;
  }, [location.pathname, children]);

  const isOpen = activeAccordions.includes(title);

  const handleToggle = () => {
    if (isCollapsed) {
      onToggle();
    } else {
      setActiveAccordions(prev => {
        if (isOpen) {
          return prev.filter(acc => acc !== title);
        } else {
          let newAccordions = [...prev, title];
          if (newAccordions.length > 2) {
            newAccordions = newAccordions.slice(-2); // Keep last 2, remove oldest
          }
          return newAccordions;
        }
      });
    }
  };

  return (
    <>
      <motion.button
        onClick={handleToggle}
        whileTap={{ scale: 0.98 }}
        className={`w-full flex items-center px-6 py-2 font-bold uppercase text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 ${
          isCollapsed ? 'justify-center' : 'justify-between'
        }`}
      >
        <span className={`flex items-center ${isCollapsed ? '' : 'space-x-2'}`}>
          <Icon name={icon} className={isCollapsed ? 'w-8 h-8' : 'w-5 h-5'} />
          {!isCollapsed && <span>{title}</span>}
        </span>
        {!isCollapsed && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Icon name="chevron-down" className="w-4 h-4" />
          </motion.div>
        )}
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && !isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="ml-8 space-y-1 overflow-hidden relative pt-2"
          >
            <div className="absolute left-0 top-0 h-full w-px bg-primary dark:bg-primary" />
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
  onSettingsClick: () => void;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onSettingsClick, onToggle }) => {
  const [activeAccordions, setActiveAccordions] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const commonAccordionProps = {
    isCollapsed,
    activeAccordions,
    setActiveAccordions,
    onToggle,
    isMounted,
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between overflow-y-auto z-50 transition-all duration-500 shadow-lg ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        <nav className="text-sm select-none" style={{ paddingTop: '50px' }}>
          <Accordion title="Dashboards" icon="home" {...commonAccordionProps}>
            <NavItem to="/">Sales</NavItem>
            <NavItem to="/project-management">Project Management</NavItem>
            <NavItem to="/ecommerce">E-Commerce</NavItem>
          </Accordion>
          <Accordion title="Components" icon="settings" {...commonAccordionProps}>
            <NavItem to="/components/alerts">Alerts</NavItem>
            <NavItem to="/components/buttons">Buttons</NavItem>
          </Accordion>
          <Accordion title="Authentication" icon="lock" {...commonAccordionProps}>
            <NavItem to="/auth/login">Login</NavItem>
            <NavItem to="/auth/register">Register</NavItem>
            <NavItem to="/auth/forgot-password">Forgot Password</NavItem>
            <NavItem to="/auth/reset-password">Reset Password</NavItem>
          </Accordion>
          <Accordion title="User Management" icon="users" {...commonAccordionProps}>
            <NavItem to="/user-management/user-list">User List</NavItem>
            <NavItem to="/user-management/user-profile">User Profile</NavItem>
            <NavItem to="/user-management/roles-permissions">Roles & Permissions</NavItem>
          </Accordion>
        </nav>
      </div>

      <div className="p-6">
        {!isCollapsed && (
          <motion.button
            onClick={onSettingsClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center bg-primary text-text-on-primary py-2 rounded-lg shadow-md hover:bg-primary-hover gap-2 transition-all duration-300"
          >
            <Icon name="sliders-horizontal" className="w-5 h-5" />
            <span>Customize</span>
          </motion.button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
