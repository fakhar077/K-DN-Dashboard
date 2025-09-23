import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ text: "Password reset link sent to your email.", type: 'success' });
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Forgot Password</h2>
            {message && (
                <div className={`text-center p-2 rounded-md mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" placeholder="Email address" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                <button type="submit" className="w-full bg-primary text-text-on-primary py-2 rounded-lg hover:bg-primary-hover">Reset Password</button>
            </form>
            <div className="mt-4 text-center dark:text-gray-300">
                <Link to="/auth/login" replace className="text-primary hover:underline">Back to Login</Link>
            </div>
        </div>
    );
};

export default ForgotPassword;