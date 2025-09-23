import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ text: "Registration successful! Please login.", type: 'success' });
        setTimeout(() => {
            navigate('/auth/login', { replace: true });
        }, 1000);
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-8">
            <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">K-DN</h1>
            <h2 className="text-lg font-semibold text-center text-gray-600 dark:text-gray-300 mb-6">Register</h2>
            {message && (
                <div className={`text-center p-2 rounded-md mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Username" required className="w-full px-4 py-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
                <input type="email" placeholder="Email address" required className="w-full px-4 py-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
                <input type="password" placeholder="Password" required className="w-full px-4 py-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
                <input type="password" placeholder="Confirm Password" required className="w-full px-4 py-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
                <label className="flex items-center space-x-2 text-sm dark:text-gray-300">
                    <input type="checkbox" required className="w-4 h-4 dark:bg-gray-700" />
                    <span>I accept the <a href="#" className="text-primary hover:underline">Terms and Conditions</a></span>
                </label>
                <button type="submit" className="w-full bg-primary text-text-on-primary py-2 rounded-md hover:bg-primary-hover transition">Register</button>
            </form>
            <p className="text-center text-sm mt-6 dark:text-gray-300">
                Already have an account? <Link to="/auth/login" replace className="text-primary hover:underline">Login</Link>
            </p>
        </div>
    );
};

export default Register;