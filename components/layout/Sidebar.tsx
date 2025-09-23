import React, { useState, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from '../ui/Icon';

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `sidebar-link block px-4 py-2 hover:text-primary ${
        isActive ? 'text-primary dark:text-primary font-semibold' : 'font-normal'
      }`
    }
  >
    {children}
  </NavLink>
);

interface AccordionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  isCollapsed: boolean;
  activeAccordion: string | null;
  setActiveAccordion: (title: string | null) => void;
  onToggle: () => void;
}

const Accordion: React.FC<AccordionProps> = ({ title, icon, children, isCollapsed, activeAccordion, setActiveAccordion, onToggle }) => {
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

  React.useEffect(() => {
    if (hasActiveChild) {
      setActiveAccordion(title);
    }
  }, [hasActiveChild, title, setActiveAccordion]);

  const isOpen = activeAccordion === title;

  const handleToggle = () => {
    if (isCollapsed) {
      onToggle();
    } else {
      setActiveAccordion(isOpen ? null : title);
    }
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className={`w-full flex items-center px-6 py-2 font-semibold uppercase text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${isCollapsed ? 'justify-center' : 'justify-between'}`}
      >
        <span className={`flex items-center ${isCollapsed ? '' : 'space-x-2'}`}>
          <Icon name={icon} className="w-4 h-4" />
          {!isCollapsed && <span>{title}</span>}
        </span>
        {!isCollapsed && (
          <Icon
            name="chevron-down"
            className={`w-4 h-4 transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </button>
      {isOpen && !isCollapsed && <div className="ml-10 space-y-1">{children}</div>}
    </>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
  onSettingsClick: () => void;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onSettingsClick, onToggle }) => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>('Dashboards');

  const commonAccordionProps = {
    isCollapsed,
    activeAccordion,
    setActiveAccordion,
    onToggle,
  };

  return (
    <aside className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between overflow-y-auto z-50 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div>
        <div className={`flex items-center w-full px-6 py-4 ${isCollapsed ? 'justify-center' : 'space-x-2'}`}>
          <img src="https://img.icons8.com/fluency/48/dashboard-layout.png" className="w-8 h-8 flex-shrink-0" alt="logo" />
          {!isCollapsed && <span className="text-xl font-bold text-primary dark:text-primary">K-DN</span>}
        </div>
        <nav className="mt-2 text-sm select-none">
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
        </nav>
      </div>
      <div className="p-6">
        <button onClick={onSettingsClick} className={`w-full flex items-center justify-center bg-primary text-text-on-primary py-2 rounded-lg shadow hover:bg-primary-hover ${isCollapsed ? '' : 'gap-2'}`}>
          <Icon name="sliders-horizontal" className="w-5 h-5" />
          {!isCollapsed && <span>Customize</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;