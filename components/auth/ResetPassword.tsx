import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ text: "Password has been reset successfully!", type: 'success' });
        setTimeout(() => {
            navigate('/auth/login', { replace: true });
        }, 1000);
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <h1 className="text-2xl font-bold text-primary dark:text-primary mb-2 tracking-wide">K-DN</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Recover your password now.</p>
            {message && (
                <div className={`text-center p-2 rounded-md mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="password" placeholder="New Password" required className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                <input type="password" placeholder="Confirm New Password" required className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gamma-700 dark:text-white" />
                <button type="submit" className="w-full bg-primary text-text-on-primary py-2 rounded-lg hover:bg-primary-hover transition">Reset password</button>
            </form>
            <div className="mt-4 text-center dark:text-gray-300">
                <Link to="/auth/login" replace className="text-primary hover:underline">Back to Login</Link>
            </div>
        </div>
    );
};

export default ResetPassword;