import React from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const RolesPermissions: React.FC = () => {
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

  const roles = [
    {
      name: "Admin",
      permissions: ["Create", "Read", "Update", "Delete"],
      description: "Full system access with ability to manage users, data, and settings.",
    },
    {
      name: "Moderator",
      permissions: ["Read", "Update"],
      description: "Responsible for reviewing and updating content, but with limited access.",
    },
    {
      name: "User",
      permissions: ["Read"],
      description: "Basic access to read and use application features without modification rights.",
    },
    {
      name: "HR Manager",
      permissions: ["Read", "Update"],
      description: "Manage employee records, payroll, and organizational structure.",
    },
    {
      name: "Finance Officer",
      permissions: ["Read", "Update"],
      description: "Oversees transactions, reports, and budgets but cannot delete records.",
    },
    {
      name: "Developer",
      permissions: ["Create", "Read", "Update"],
      description: "Builds and maintains system modules with extended privileges.",
    },
    {
      name: "Guest",
      permissions: ["Read"],
      description: "Limited temporary access, restricted to viewing public content only.",
    },
  ];

  const allPermissions = ["Create", "Read", "Update", "Delete"];

  const users = [
    { name: "Alice Johnson", role: "Admin", email: "alice@company.com" },
    { name: "Mark Lee", role: "Moderator", email: "mark@company.com" },
    { name: "Sophia Patel", role: "User", email: "sophia@company.com" },
    { name: "David Chen", role: "HR Manager", email: "david@company.com" },
    { name: "Maria Gonzalez", role: "Finance Officer", email: "maria@company.com" },
    { name: "James Brown", role: "Developer", email: "james@company.com" },
    { name: "Visitor Guest", role: "Guest", email: "guest@company.com" },
  ];

  const auditLogs = [
    { action: "Created new role 'Finance Officer'", user: "Admin", time: "2 hrs ago" },
    { action: "Updated permissions for 'Developer'", user: "Admin", time: "5 hrs ago" },
    { action: "Assigned 'Moderator' to Mark Lee", user: "HR Manager", time: "1 day ago" },
    { action: "Removed 'Delete' permission from Guest", user: "Admin", time: "3 days ago" },
  ];

  return (
    <div className="p-8 space-y-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Roles & Permissions Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl text-lg">
            Define and manage access levels across your organization. Assign roles
            to users and control which actions they can perform within the system.
          </p>
        </div>
        <div className="space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            + Create Role
          </button>
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
            Export Report
          </button>
        </div>
      </motion.div>

      {/* Overview Stats */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          { title: "Total Roles", value: roles.length, color: "text-blue-600" },
          { title: "Permission Types", value: allPermissions.length, color: "text-green-600" },
          { title: "Active Users", value: users.length, color: "text-purple-600" },
          { title: "Pending Requests", value: "12", color: "text-orange-600" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center"
          >
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.title}
            </h4>
            <p className={`text-3xl font-bold mt-2 ${stat.color}`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Roles Overview */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Roles Overview
          </h2>
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {roles.map((role, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {role.name}
                  </h3>
                  <button className="px-3 py-1 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                    Manage
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {role.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((perm, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Permissions Matrix + Users */}
        <div className="lg:col-span-2 space-y-10">
          {/* Permissions Matrix */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Permissions Matrix
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    <th className="px-4 py-3 text-left border">Role</th>
                    {allPermissions.map((perm, i) => (
                      <th key={i} className="px-4 py-3 text-center border">
                        {perm}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                    >
                      <td className="px-4 py-3 border font-semibold">
                        {role.name}
                      </td>
                      {allPermissions.map((perm, j) => (
                        <td key={j} className="px-4 py-3 text-center border">
                          {role.permissions.includes(perm) ? (
                            <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              ✅ Green = Has permission | ❌ Red = No permission
            </p>
          </div>

          {/* Users Table */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
              User Assignments
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    <th className="px-4 py-3 text-left border">Name</th>
                    <th className="px-4 py-3 text-left border">Role</th>
                    <th className="px-4 py-3 text-left border">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                    >
                      <td className="px-4 py-3 border font-medium">
                        {user.name}
                      </td>
                      <td className="px-4 py-3 border">{user.role}</td>
                      <td className="px-4 py-3 border">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Audit Logs */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Recent Activity
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow divide-y divide-gray-200 dark:divide-gray-700">
              {auditLogs.map((log, i) => (
                <div key={i} className="p-4 flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{log.action}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {log.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesPermissions;
