
import React, { useState } from 'react';

const Alert: React.FC<{ type: 'success' | 'warning' | 'error' | 'info' | 'custom', title: string, message: string }> = ({ type, title, message }) => {
    const [isVisible, setIsVisible] = useState(true);
    if (!isVisible) return null;

    const baseClasses = "px-4 py-3 rounded relative border";
    const typeClasses = {
        success: "bg-green-100 dark:bg-green-900 border-green-400 dark:border-green-600 text-green-700 dark:text-green-300",
        warning: "bg-yellow-100 dark:bg-yellow-900 border-yellow-400 dark:border-yellow-600 text-yellow-700 dark:text-yellow-300",
        error: "bg-red-100 dark:bg-red-900 border-red-400 dark:border-red-600 text-red-700 dark:text-red-300",
        info: "bg-blue-100 dark:bg-blue-900 border-blue-400 dark:border-blue-600 text-blue-700 dark:text-blue-300",
        custom: "bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300",
    };

    const iconColors = {
        success: "text-green-500",
        warning: "text-yellow-500",
        error: "text-red-500",
        info: "text-blue-500",
        custom: "text-gray-500",
    }

    return (
        <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
            <strong className="font-bold">{title}</strong>
            <span className="block sm:inline"> {message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setIsVisible(false)}>
                <svg className={`fill-current h-6 w-6 ${iconColors[type]}`} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                </svg>
            </span>
        </div>
    );
};

const Alerts: React.FC = () => {
    return (
        <div className="p-6 space-y-4">
            <h3 className="text-xl font-semibold mb-4">Alert Variants</h3>
            <Alert type="success" title="Success!" message="Your action was completed successfully." />
            <Alert type="warning" title="Warning!" message="Please check your input data." />
            <Alert type="error" title="Error!" message="Something went wrong. Please try again." />
            <Alert type="info" title="Info!" message="This is an informational message." />
            <Alert type="custom" title="Note:" message="This is a dismissible alert with an icon." />
        </div>
    );
};

export default Alerts;
