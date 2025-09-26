import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChartCard from '../ui/ChartCard';
import Icon from '../ui/Icon';

interface EcommerceDashboardProps {
    theme: 'light' | 'dark';
}

const StatCard: React.FC<{ icon: string, title: string, value: string, change: string }> = ({ icon, title, value, change }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <div className="flex items-center gap-2 mb-2">
                <Icon name={icon} className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
            </div>
            <h2 className="text-2xl font-bold">{value} <span className="text-green-500 text-sm">{change}</span></h2>
        </div>
    );
};

const EcommerceDashboard: React.FC<EcommerceDashboardProps> = ({ theme }) => {
    const [primaryColor, setPrimaryColor] = useState('#2563eb');

    const containerVariants = {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    };

    useEffect(() => {
        const color = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
        setPrimaryColor(color);
    }, [theme, primaryColor]);

    const baseChartOptions = useCallback(() => {
        const isDark = theme === 'dark';
        const gridColor = () => isDark ? '#374151' : '#e5e7eb';
        const tickColor = () => isDark ? '#e5e7eb' : '#374151';
        return {
            responsive: true,
            plugins: { legend: { labels: { color: tickColor() } }, tooltip: { backgroundColor: isDark ? '#1f2937' : '#ffffff', titleColor: tickColor(), bodyColor: tickColor() } },
            scales: { x: { ticks: { color: tickColor() }, grid: { color: gridColor() } }, y: { ticks: { color: tickColor() }, grid: { color: gridColor() } } }
        };
    }, [theme]);

    const salesByCategoryConfig = useMemo(() => ({
        type: 'bar',
        data: {
            labels: ["Electronics", "Clothing", "Home", "Books", "Sports"],
            datasets: [{ label: "Sales", data: [120, 90, 70, 50, 40], backgroundColor: primaryColor }]
        },
        options: baseChartOptions()
    }), [baseChartOptions, primaryColor]);

    const revenueTrendConfig = useMemo(() => ({
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{ label: "Revenue", data: [10000, 12000, 15000, 18000, 20000, 22000], borderColor: primaryColor, fill: false, tension: 0.4 }]
        },
        options: baseChartOptions()
    }), [baseChartOptions, primaryColor]);
    
    return (
        <motion.div
            className="p-6 space-y-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
                variants={containerVariants}
            >
                <motion.div variants={itemVariants}>
                    <StatCard icon="shopping-cart" title="ORDERS" value="1,245" change="+12.5%" />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <StatCard icon="dollar-sign" title="REVENUE" value="$45,678" change="+8.2%" />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <StatCard icon="users" title="CUSTOMERS" value="3,492" change="+5.7%" />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <StatCard icon="package" title="PRODUCTS" value="567" change="+3.1%" />
                </motion.div>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Sales by Category" chartId="salesByCategoryChart" chartConfig={salesByCategoryConfig} />
                <ChartCard title="Revenue Trend" chartId="revenueTrendChart" chartConfig={revenueTrendConfig} />
            </div>
            {/* 🔹 Top Selling Products */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Top Selling Products</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">Last 30 days</span>
                </div>
                <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-left">
                        <th className="py-3 px-4 rounded-l-lg">Product</th>
                        <th className="py-3 px-4">Units</th>
                        <th className="py-3 px-4 rounded-r-lg">Revenue</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <td className="py-3 px-4 font-medium flex items-center gap-2">
                        Headphones
                        </td>
                        <td className="py-3 px-4">420</td>
                        <td className="py-3 px-4 text-green-600 font-semibold">$12,600</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <td className="py-3 px-4 font-medium flex items-center gap-2">
                        Smartwatch
                        </td>
                        <td className="py-3 px-4">310</td>
                        <td className="py-3 px-4 text-green-600 font-semibold">$9,300</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <td className="py-3 px-4 font-medium flex items-center gap-2">
                        Shoes
                        </td>
                        <td className="py-3 px-4">280</td>
                        <td className="py-3 px-4 text-green-600 font-semibold">$8,400</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>

            {/* 🔹 Low Stock Alerts */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Low Stock Alerts</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">Critical items</span>
                </div>
                <ul className="space-y-3 text-sm">
                {[
                    { name: "Wireless Mouse", stock: "5 left" },
                    { name: "Keyboard", stock: "8 left" },
                    { name: "USB Cable", stock: "12 left" },
                ].map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-200">{item.name}</span>
                    <span className="text-red-600 font-semibold">{item.stock}</span>
                    </li>
                ))}
                </ul>
            </div>

            {/* 🔹 Average Order Value */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Average Order Value</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Per order revenue</p>
                <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">$52.30</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-green-600 text-sm font-medium">▲ +4.2%</span>
                    <span className="text-xs text-gray-500">vs last month</span>
                </div>
                <div className="mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                </div>
                </div>
            </div>
            </div>


            {/* 🔹 Sales by Region */}
            <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Sales by Region</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">YTD Summary</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-left">
                    <th className="py-3 px-4 rounded-l-lg">Region</th>
                    <th className="py-3 px-4">Orders</th>
                    <th className="py-3 px-4 rounded-r-lg">Revenue</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="py-3 px-4 font-medium">North America</td>
                    <td className="py-3 px-4">1,230</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">$22,400</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="py-3 px-4 font-medium">Europe</td>
                    <td className="py-3 px-4">980</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">$18,300</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="py-3 px-4 font-medium">Asia</td>
                    <td className="py-3 px-4">1,540</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">$25,600</td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
            {/* 🔹 Conversion Rate + Cart Abandonment */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Conversion Rate</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Visitors to buyers</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">3.8%</p>
                <div className="flex items-center gap-2 mt-2">
                <span className="text-green-600 text-sm font-medium">▲ +1.1%</span>
                <span className="text-xs text-gray-500">from last month</span>
                </div>
                <div className="mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-2/5"></div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Cart Abandonment</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Unfinished checkouts</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">62%</p>
                <div className="flex items-center gap-2 mt-2">
                <span className="text-red-600 text-sm font-medium">▼ -3.4%</span>
                <span className="text-xs text-gray-500">this month</span>
                </div>
                <div className="mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full w-3/5"></div>
                </div>
            </div>
            </div>

            {/* 🔹 Customer Feedback */}
            <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Customer Feedback</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Based on recent reviews</p>
            <div className="flex items-center space-x-3">
                <div className="flex text-yellow-400 text-2xl">
                <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-300 dark:text-gray-600">★</span>
                </div>
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">4.2 / 5</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">(1,240 reviews)</span>
            </div>
            </div>

        </motion.div>
    );
};

export default EcommerceDashboard;