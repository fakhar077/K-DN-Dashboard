import React, { useMemo, useCallback, useState, useEffect } from 'react';
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
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard icon="shopping-cart" title="ORDERS" value="1,245" change="+12.5%" />
                <StatCard icon="dollar-sign" title="REVENUE" value="$45,678" change="+8.2%" />
                <StatCard icon="users" title="CUSTOMERS" value="3,492" change="+5.7%" />
                <StatCard icon="package" title="PRODUCTS" value="567" change="+3.1%" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Sales by Category" chartId="salesByCategoryChart" chartConfig={salesByCategoryConfig} />
                <ChartCard title="Revenue Trend" chartId="revenueTrendChart" chartConfig={revenueTrendConfig} />
            </div>
        </div>
    );
};

export default EcommerceDashboard;