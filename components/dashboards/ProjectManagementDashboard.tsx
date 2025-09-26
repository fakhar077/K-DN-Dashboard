import React, { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import KpiCard from "../ui/KpiCard";
import ChartCard from "../ui/ChartCard";
import Icon from "../ui/Icon";

interface ProjectManagementDashboardProps {
  theme: "light" | "dark";
}

const ProjectManagementDashboard: React.FC<ProjectManagementDashboardProps> = ({ theme }) => {
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

  // ---------- Sample Data ----------
  const tasks = [
    { id: 1, name: "Design homepage mockup", project: "Website Redesign", status: "In Progress", assignee: "Alice", dueDate: "2024-08-15" },
    { id: 2, name: "Develop API for user auth", project: "Mobile App", status: "Completed", assignee: "Bob", dueDate: "2024-08-10" },
    { id: 3, name: "Write documentation for API", project: "Mobile App", status: "Todo", assignee: "Charlie", dueDate: "2024-08-20" },
    { id: 4, name: "Test payment gateway", project: "E-commerce Platform", status: "In Progress", assignee: "David", dueDate: "2024-08-18" },
    { id: 5, name: "Deploy to staging server", project: "Website Redesign", status: "Completed", assignee: "Eve", dueDate: "2024-08-01" },
    { id: 6, name: "Fix login page bug", project: "Mobile App", status: "In Progress", assignee: "Frank", dueDate: "2024-08-12" },
  ];

  const projectHealth = [
    { status: "On Track", count: 8, color: "bg-green-500" },
    { status: "At Risk", count: 3, color: "bg-yellow-500" },
    { status: "Critical", count: 1, color: "bg-red-500" },
  ];

  const upcomingDeadlines = [
    { task: "Fix login page bug", dueDate: "2024-08-12", daysLeft: 2 },
    { task: "Design homepage mockup", dueDate: "2024-08-15", daysLeft: 5 },
    { task: "Test payment gateway", dueDate: "2024-08-18", daysLeft: 8 },
    { task: "Write documentation for API", dueDate: "2024-08-20", daysLeft: 10 },
    { task: "Implement user notifications", dueDate: "2024-08-22", daysLeft: 12 },
  ];

  const workloadDistribution = [
    { member: "Alice", tasks: 5 },
    { member: "Bob", tasks: 4 },
    { member: "Charlie", tasks: 3 },
    { member: "David", tasks: 6 },
    { member: "Eve", tasks: 2 },
  ];

  const projectMilestones = [
    { name: "Planning", completion: 100 },
    { name: "Design", completion: 75 },
    { name: "Development", completion: 50 },
    { name: "Testing", completion: 25 },
    { name: "Deployment", completion: 0 },
  ];

  const taskCompletionTrends = [
    { week: "W1", completed: 20, overdue: 2 },
    { week: "W2", completed: 25, overdue: 1 },
    { week: "W3", completed: 30, overdue: 3 },
    { week: "W4", completed: 35, overdue: 2 },
  ];

  const resourceUtilization = { logged: 120, planned: 160 };
  const openIssues = [
    { issue: "Server downtime", priority: "High" },
    { issue: "UI inconsistencies", priority: "Medium" },
    { issue: "Minor bug fixes", priority: "Low" },
  ];
  const activityFeed = [
    { action: "Task completed: Develop API", time: "2h" },
    { action: "Comment added to Design homepage", time: "4h" },
    { action: "New task assigned: Test payment", time: "6h" },
    { action: "Milestone reached: Planning", time: "1d" },
  ];
  const budgetTracking = { planned: 50000, actual: 42000 };
  const forecast = { estimatedCompletion: "2024-12-15" };

  // ---------- Helpers ----------
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Todo":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "Overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const safePercent = (n: number, d: number) => (d <= 0 ? 0 : Math.round((n / d) * 100));

  // ---------- Chart configs (ChartCard expects a chartConfig prop like before) ----------
  const baseChartOptions = useCallback(() => {
    const isDark = theme === "dark";
    const gridColor = isDark ? "#374151" : "#e5e7eb";
    const tickColor = isDark ? "#e5e7eb" : "#374151";
    return {
      responsive: true,
      plugins: { legend: { labels: { color: tickColor } }, tooltip: { backgroundColor: isDark ? "#111827" : "#fff", titleColor: tickColor, bodyColor: tickColor } },
      scales: { x: { ticks: { color: tickColor }, grid: { color: gridColor } }, y: { ticks: { color: tickColor }, grid: { color: gridColor } } },
    };
  }, [theme]);

  const taskStatusChartConfig = useMemo(() => {
    const counts = tasks.reduce((acc: Record<string, number>, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {});
    return {
      type: "doughnut",
      data: { labels: Object.keys(counts), datasets: [{ data: Object.values(counts), backgroundColor: ["#22c55e", "#3b82f6", "#6b7280", "#ef4444"] }] },
      options: { ...baseChartOptions(), plugins: { ...baseChartOptions().plugins, legend: { ...baseChartOptions().plugins.legend, position: "bottom" } } },
    };
  }, [baseChartOptions, tasks]);

  const workloadChartConfig = useMemo(() => {
    return {
      type: "bar",
      data: { labels: workloadDistribution.map((w) => w.member), datasets: [{ label: "Tasks", data: workloadDistribution.map((w) => w.tasks), backgroundColor: "#3b82f6" }] },
      options: baseChartOptions(),
    };
  }, [baseChartOptions, workloadDistribution]);

  const trendsChartConfig = useMemo(() => {
    return {
      type: "line",
      data: {
        labels: taskCompletionTrends.map((t) => t.week),
        datasets: [
          { label: "Completed", data: taskCompletionTrends.map((t) => t.completed), borderColor: "#22c55e", backgroundColor: "rgba(34,197,94,0.12)", fill: true },
          { label: "Overdue", data: taskCompletionTrends.map((t) => t.overdue), borderColor: "#ef4444", backgroundColor: "rgba(239,68,68,0.08)", fill: true },
        ],
      },
      options: baseChartOptions(),
    };
  }, [baseChartOptions, taskCompletionTrends]);

  // ---------- Derived ----------
  const utilizationPercent = safePercent(resourceUtilization.logged, resourceUtilization.planned);
  const budgetPercent = safePercent(budgetTracking.actual, budgetTracking.planned);

  // ---------- Render ----------
  return (
    <motion.div
      className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >

      {/* KPI row */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <KpiCard title="Active Projects" value="12" change="+2" changeType="increase" description="This month" icon="briefcase" gradient="bg-gradient-to-tr from-blue-500 to-cyan-400" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KpiCard title="Tasks Completed" value="245" change="+30" changeType="increase" description="This week" icon="check-circle" gradient="bg-gradient-to-tr from-emerald-500 to-green-400" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KpiCard title="Tasks Overdue" value="8" change="+3" changeType="decrease" description="Needs attention" icon="alert-circle" gradient="bg-gradient-to-tr from-red-500 to-orange-400" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KpiCard title="Team Members" value="24" change="+1" changeType="increase" description="Active members" icon="users" gradient="bg-gradient-to-tr from-indigo-500 to-purple-500" />
        </motion.div>
      </motion.div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* LEFT: Primary content (8/12) */}
        <div className="xl:col-span-8 space-y-6">
          {/* Project Health Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Project Health Overview</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">Summary of active projects</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {projectHealth.map((h) => (
                <div key={h.status} className="flex-1 bg-gray-50 dark:bg-gray-700/40 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${h.color}`} />
                    <div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{h.status}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Projects</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{h.count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Tasks Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 dark:text-gray-100">Recent Tasks</h3>
              <div className="text-xs text-gray-500 dark:text-gray-400">Showing latest 6</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-300 border-b">
                    <th className="py-2 px-3">Task Name</th>
                    <th className="py-2 px-3">Project</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.slice(0, 6).map((t) => (
                    <tr key={t.id} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
                      <td className="py-3 px-3 font-medium text-gray-800 dark:text-gray-100">{t.name}</td>
                      <td className="py-3 px-3 text-gray-600 dark:text-gray-300">{t.project}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(t.status)}`}>{t.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT: Sidebar (4/12) */}
        <aside className="xl:col-span-4 space-y-6">
          {/* Upcoming Deadlines */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-800 dark:text-gray-100">Upcoming Deadlines</h4>
              <div className="text-xs text-gray-500 dark:text-gray-400">{upcomingDeadlines.length} items</div>
            </div>
            <ul className="space-y-2">
              {upcomingDeadlines.slice(0, 5).map((d, i) => (
                <li key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-100">{d.task}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{d.dueDate}</div>
                  </div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full ${d.daysLeft <= 3 ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : d.daysLeft <= 7 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"}`}>
                    {d.daysLeft}d
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Task Status Distribution */}
          <ChartCard title="Task Status Distribution" chartId="taskStatusChart" chartConfig={taskStatusChartConfig} />
        </aside>
      </div>

      {/* Activity Feed */}
      <div className="mt-[-303px] bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-700 w-2/3">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Activity Feed</h2>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Icon name="check-circle" className="text-green-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-bold">Ahmed</span> completed task “Deploy to staging”
            </p>
          </li>
          <li className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Icon name="play-circle" className="text-blue-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-bold">Sara</span> started “UI Testing”
            </p>
          </li>
          <li className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Icon name="alert-circle" className="text-yellow-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-bold">Ali</span> opened issue “Payment Bug”
            </p>
          </li>
          <li className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Icon name="x-circle" className="text-red-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-bold">Fatima</span> closed issue “API Docs Outdated”
            </p>
          </li>
          <li className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Icon name="user-plus" className="text-indigo-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-bold">Bilal</span> joined project “Website Redesign”
            </p>
          </li>
          <li className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Icon name="award" className="text-purple-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-bold">Team</span> marked “E-commerce MVP” milestone as completed
            </p>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default ProjectManagementDashboard;
