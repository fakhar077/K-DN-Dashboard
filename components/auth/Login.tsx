import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login logic
        setMessage({ text: "Login successful! Redirecting...", type: 'success' });
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-8">
            <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">K-DN</h1>
            <h2 className="text-lg font-semibold text-center text-gray-600 dark:text-gray-300 mb-6">Login</h2>
            {message && (
                <div className={`text-center p-2 rounded-md mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" placeholder="Email address" required defaultValue="test@example.com" className="w-full px-4 py-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="password" placeholder="Password" required defaultValue="password" className="w-full px-4 py-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                <div className="flex items-center justify-between text-sm dark:text-gray-300">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded dark:bg-gray-700" />
                        <span>Remember me</span>
                    </label>
                    <Link to="/auth/forgot-password" replace className="text-primary hover:underline">Forgot Password?</Link>
                </div>
                <button type="submit" className="w-full bg-primary text-text-on-primary py-2 rounded-md hover:bg-primary-hover transition">Login</button>
            </form>
            <p className="text-center text-sm mt-6 dark:text-gray-300">
                Don't have an account yet? <Link to="/auth/register" replace className="text-primary hover:underline">Register</Link>
            </p>
        </div>
    );
};

export default Login;