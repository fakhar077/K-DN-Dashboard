import React, { useState, useEffect, useCallback, useMemo } from 'react';
import KpiCard from '../ui/KpiCard';
import ChartCard from '../ui/ChartCard';

// Make flatpickr globally available
declare const flatpickr: any;
declare const jspdf: any;

interface Transaction {
    id: number;
    customer: string;
    product: string;
    amount: string;
    date: string;
    status: string;
}

interface SalesDashboardProps {
    theme: 'light' | 'dark';
}

const generateTransactions = (): Transaction[] => {
    return Array.from({ length: 42 }, (_, i) => ({
        id: i + 1,
        customer: `Customer ${i + 1}`,
        product: ['Alpha', 'Beta', 'Gamma'][i % 3],
        amount: (Math.random() * 200 + 20).toFixed(2),
        date: `2025-0${(i % 9) + 1}-0${(i % 25) + 1}`,
        status: ['Paid', 'Pending', 'Refunded'][i % 3],
    }));
};

const SalesDashboard: React.FC<SalesDashboardProps> = ({ theme }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [primaryColor, setPrimaryColor] = useState('#2563eb');
    
    const pageSize = 8;

    useEffect(() => {
        setTransactions(generateTransactions());
    }, []);

    useEffect(() => {
        // Debounce or directly set the color from CSS variables
        const color = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
        setPrimaryColor(color);
      }, [theme, primaryColor]); // Dependency on primaryColor itself is not ideal, theme should be enough
      

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t =>
            Object.values(t).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [transactions, searchTerm]);
    
    const paginatedTransactions = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredTransactions.slice(start, start + pageSize);
    }, [filteredTransactions, currentPage]);

    const totalPages = Math.ceil(filteredTransactions.length / pageSize);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedRows(paginatedTransactions.map(t => t.id));
        } else {
            setSelectedRows([]);
        }
    };
    
    const handleSelectRow = (id: number) => {
        setSelectedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
    };

    const deleteSelected = () => {
        setTransactions(prev => prev.filter(t => !selectedRows.includes(t.id)));
        setSelectedRows([]);
    };
    
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

    const revenueChartConfig = useMemo(() => ({
        type: 'line',
        data: { labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], datasets: [{ label: 'Revenue', data: [12,14,15,13,17,18,19,21,20,22,23,24].map(v => v*1000), borderColor: primaryColor, backgroundColor: `${primaryColor}14`, fill: true, tension: 0.3 }] },
        options: { ...baseChartOptions(), plugins: { legend: { display: false } }, scales: { ...baseChartOptions().scales, x: { ...baseChartOptions().scales.x, grid: { display: false } } } }
    }), [baseChartOptions, primaryColor]);

    const salesChannelChartConfig = useMemo(() => ({
        type: 'doughnut',
        data: { labels: ['Online','Retail','Distributor'], datasets: [{ data: [55, 30, 15], backgroundColor: [primaryColor, '#06b6d4', '#f59e0b'] }] },
        options: { ...baseChartOptions(), plugins: { ...baseChartOptions().plugins, legend: { ...baseChartOptions().plugins.legend, position: 'bottom' } } }
    }), [baseChartOptions, primaryColor]);

    const exportCSV = () => {
        const headers = ['Customer','Product','Amount','Date','Status'];
        const rows = transactions.map(t => [t.customer, t.product, t.amount, t.date, t.status]);
        let csv = headers.join(',') + '\n' + rows.map(r => r.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'transactions.csv'; a.click(); URL.revokeObjectURL(url);
    };

    const exportPDF = () => {
        if (typeof jspdf === 'undefined') {
            console.error('jsPDF not loaded');
            alert('PDF export library is not available.');
            return;
        }
        const { jsPDF } = jspdf;
        const doc = new jsPDF();
        doc.text('Transactions', 14, 20);
        let y = 30;
        doc.setFontSize(10);
        transactions.slice(0, 40).forEach((t) => {
            doc.text(`${t.customer} - ${t.product} - $${t.amount} - ${t.status}`, 14, y);
            y += 6;
        });
        doc.save('transactions.pdf');
    };

    return (
        <div className="px-6 py-4 space-y-6">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard title="Total Revenue" value="$124,560" change="+6.2%" changeType="increase" description="Since last month" icon="dollar-sign" gradient="bg-gradient-to-tr from-blue-500 to-cyan-400" />
                <KpiCard title="Monthly Recurring" value="$34,200" change="+2.1%" changeType="increase" description="Grow subscription base" icon="repeat" gradient="bg-gradient-to-tr from-indigo-500 to-purple-500" />
                <KpiCard title="New Customers" value="1,254" change="+8.3%" changeType="increase" description="Last 30 days" icon="users" gradient="bg-gradient-to-tr from-emerald-500 to-green-400" />
                <KpiCard title="Conversion Rate" value="4.8%" change="-0.2%" changeType="decrease" description="Of website visits" icon="percent" gradient="bg-gradient-to-tr from-yellow-500 to-orange-400" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <ChartCard title="Revenue Trend" chartId="revenueLineChart" chartConfig={revenueChartConfig} className="lg:col-span-2" />
                <ChartCard title="Sales Channels" chartId="salesDonutChart" chartConfig={salesChannelChartConfig} />
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Recent Transactions</h3>
                    <div className="flex items-center gap-2">
                        <input id="tableSearch" type="search" placeholder="Search transactions" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-sm" />
                        <button onClick={exportCSV} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm">Export CSV</button>
                        <button onClick={exportPDF} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm">Export PDF</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto">
                        <thead>
                            <tr className="text-sm text-gray-500 dark:text-gray-300">
                                <th className="px-3 py-2"><input type="checkbox" onChange={handleSelectAll} checked={selectedRows.length === paginatedTransactions.length && paginatedTransactions.length > 0} /></th>
                                <th className="px-3 py-2">Customer</th><th className="px-3 py-2">Product</th><th className="px-3 py-2">Amount</th><th className="px-3 py-2">Date</th><th className="px-3 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {paginatedTransactions.map(tx => (
                                <tr key={tx.id} className="border-t border-gray-100 dark:border-gray-700">
                                    <td className="px-3 py-2"><input type="checkbox" checked={selectedRows.includes(tx.id)} onChange={() => handleSelectRow(tx.id)} /></td>
                                    <td className="px-3 py-2">{tx.customer}</td><td className="px-3 py-2">{tx.product}</td><td className="px-3 py-2">${tx.amount}</td><td className="px-3 py-2">{tx.date}</td><td className="px-3 py-2">{tx.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between mt-3">
                    <div>
                        <button onClick={deleteSelected} disabled={selectedRows.length === 0} className="px-3 py-2 bg-red-500 text-white rounded-md disabled:bg-red-300 dark:disabled:bg-red-800 text-sm">Delete Selected</button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="px-2 py-1 border rounded-md text-sm disabled:opacity-50">Prev</button>
                        <span className="text-sm text-gray-500 dark:text-gray-300">{currentPage} / {totalPages}</span>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className="px-2 py-1 border rounded-md text-sm disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesDashboard;