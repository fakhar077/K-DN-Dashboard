import React, { useMemo, useCallback } from 'react';
import KpiCard from '../ui/KpiCard';
import ChartCard from '../ui/ChartCard';
import Icon from '../ui/Icon';

interface ProjectManagementDashboardProps {
    theme: 'light' | 'dark';
}

const ProjectManagementDashboard: React.FC<ProjectManagementDashboardProps> = ({ theme }) => {

    const tasks = [
        { id: 1, name: "Design homepage mockup", project: "Website Redesign", status: "In Progress", assignee: "Alice", dueDate: "2024-08-15" },
        { id: 2, name: "Develop API for user auth", project: "Mobile App", status: "Completed", assignee: "Bob", dueDate: "2024-08-10" },
        { id: 3, name: "Write documentation for API", project: "Mobile App", status: "Todo", assignee: "Charlie", dueDate: "2024-08-20" },
        { id: 4, name: "Test payment gateway", project: "E-commerce Platform", status: "In Progress", assignee: "David", dueDate: "2024-08-18" },
        { id: 5, name: "Deploy to staging server", project: "Website Redesign", status: "Completed", assignee: "Eve", dueDate: "2024-08-01" },
        { id: 6, name: "Fix login page bug", project: "Mobile App", status: "In Progress", assignee: "Frank", dueDate: "2024-08-12" },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'Todo': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            case 'Overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800';
        }
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

    const taskStatusChartConfig = useMemo(() => {
        const statusCounts = tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return {
            type: 'doughnut',
            data: { 
                labels: Object.keys(statusCounts), 
                datasets: [{ 
                    data: Object.values(statusCounts), 
                    backgroundColor: ['#22c55e', '#3b82f6', '#6b7280', '#ef4444' ] 
                }] 
            },
            options: { ...baseChartOptions(), plugins: { ...baseChartOptions().plugins, legend: { ...baseChartOptions().plugins.legend, position: 'bottom' } } }
        }
    }, [baseChartOptions, tasks]);


    return (
        <div className="px-6 py-4 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard title="Active Projects" value="12" change="+2" changeType="increase" description="This month" icon="briefcase" gradient="bg-gradient-to-tr from-blue-500 to-cyan-400" />
                <KpiCard title="Tasks Completed" value="245" change="+30" changeType="increase" description="This week" icon="check-circle" gradient="bg-gradient-to-tr from-emerald-500 to-green-400" />
                <KpiCard title="Tasks Overdue" value="8" change="+3" changeType="decrease" description="Needs attention" icon="alert-circle" gradient="bg-gradient-to-tr from-red-500 to-orange-400" />
                <KpiCard title="Team Members" value="24" change="+1" changeType="increase" description="Active members" icon="users" gradient="bg-gradient-to-tr from-indigo-500 to-purple-500" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                    <h3 className="font-semibold mb-3">Recent Tasks</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left table-auto">
                            <thead>
                                <tr className="text-sm text-gray-500 dark:text-gray-300">
                                    <th className="px-3 py-2">Task Name</th>
                                    <th className="px-3 py-2">Project</th>
                                    <th className="px-3 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {tasks.slice(0, 5).map(task => (
                                    <tr key={task.id} className="border-t border-gray-100 dark:border-gray-700">
                                        <td className="px-3 py-2 font-medium">{task.name}</td>
                                        <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{task.project}</td>
                                        <td className="px-3 py-2">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                                                {task.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="lg:col-span-2">
                     <ChartCard title="Task Status Distribution" chartId="taskStatusChart" chartConfig={taskStatusChartConfig} />
                </div>
            </div>
        </div>
    );
};

export default ProjectManagementDashboard;