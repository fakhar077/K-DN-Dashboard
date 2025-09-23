
import React, { useState, useEffect } from 'react';
import Icon from '../ui/Icon';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationItem {
    id: number;
    html: string;
    time: string;
    initials: string;
}

const generateRandomNotifications = (): NotificationItem[] => {
    const templates = [
        { title: 'New user registered', tpl: '📩 New user <b>Ali</b> registered', initials: 'A' },
        { title: 'Order completed', tpl: `Order <b>#${1000 + Math.floor(Math.random() * 9000)}</b> completed`, initials: 'O' },
        { title: 'Backup finished', tpl: 'Server backup finished', initials: 'B' },
        { title: 'Update available', tpl: 'New update available', initials: 'U' },
    ];
    const count = Math.floor(Math.random() * 3) + 2;
    return Array.from({ length: count }, (_, i) => {
        const sel = templates[Math.floor(Math.random() * templates.length)];
        const minutes = Math.floor(Math.random() * 59) + 1;
        return { id: Date.now() + i, html: sel.tpl, time: `${minutes}m`, initials: sel.initials };
    });
};

const NotificationCard: React.FC<{ item: NotificationItem; onDismiss: (id: number) => void }> = ({ item, onDismiss }) => (
    <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex-none w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 text-white flex items-center justify-center text-lg font-semibold">{item.initials}</div>
        <div className="flex-1">
            <div className="text-sm text-gray-800 dark:text-gray-100" dangerouslySetInnerHTML={{ __html: item.html }}></div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.time} ago</div>
        </div>
        <div className="flex-none self-start">
            <button onClick={() => onDismiss(item.id)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm px-2 py-1 rounded" aria-label="Dismiss">Dismiss</button>
        </div>
    </div>
);

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setNotifications(generateRandomNotifications());
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
        document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleDismiss = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  const handleMarkAllRead = () => {
    setNotifications([]);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-md mx-4 rounded-xl shadow-2xl ring-1 ring-black/10 z-10 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-lg">Notifications</h3>
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">{notifications.length}</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close notifications">
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 max-h-80 overflow-y-auto space-y-3 bg-gray-50 dark:bg-gray-900">
          {notifications.length > 0 ? (
            notifications.map(item => <NotificationCard key={item.id} item={item} onDismiss={handleDismiss} />)
          ) : (
            <div className="p-6 text-center text-gray-600 dark:text-gray-400">
              <div className="mt-2 font-semibold">You're all caught up.</div>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center px-4 py-3 bg-white/50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">{notifications.length > 0 ? `You have ${notifications.length} notifications` : 'No new notifications'}</span>
            <button onClick={handleMarkAllRead} className="px-3 py-1 rounded-md text-sm text-gray-600 dark:text-gray-300 hover:underline">Mark all read</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
