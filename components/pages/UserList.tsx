import React, { useState } from "react";
import { motion } from "framer-motion";

const UserList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

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

  // Mock user data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastLogin: "2025-09-24" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive", lastLogin: "2025-09-23" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Moderator", status: "Active", lastLogin: "2025-09-22" },
    { id: 4, name: "Alice Patel", email: "alice@example.com", role: "Admin", status: "Active", lastLogin: "2025-09-20" },
    { id: 5, name: "David Chen", email: "david@example.com", role: "User", status: "Active", lastLogin: "2025-09-21" },
    { id: 6, name: "Sophia Lee", email: "sophia@example.com", role: "Moderator", status: "Inactive", lastLogin: "2025-09-19" },
    { id: 7, name: "Michael Brown", email: "michael@example.com", role: "User", status: "Active", lastLogin: "2025-09-18" },
  ];

  // Role colors
  const roleColors: { [key: string]: string } = {
    Admin: "bg-blue-100 text-blue-700",
    User: "bg-green-100 text-green-700",
    Moderator: "bg-yellow-100 text-yellow-700",
  };

  const statusColors: { [key: string]: string } = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-red-100 text-red-700",
  };

  // Filtered users
  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter === "All" || user.role === roleFilter)
  );

  // Stats
  const totalUsers = users.length;
  const totalAdmins = users.filter(u => u.role === "Admin").length;
  const totalModerators = users.filter(u => u.role === "Moderator").length;
  const totalActive = users.filter(u => u.status === "Active").length;

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Full overview of all users, their roles, status, and activity.
          </p>
        </div>
        <div className="flex gap-3 mt-2 lg:mt-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-medium">
            Add User
          </button>
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 font-medium">
            Export
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col items-center">
          <h3 className="text-gray-700 dark:text-gray-300 font-semibold">Total Users</h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">{totalUsers}</p>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col items-center">
          <h3 className="text-gray-700 dark:text-gray-300 font-semibold">Admins</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">{totalAdmins}</p>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col items-center">
          <h3 className="text-gray-700 dark:text-gray-300 font-semibold">Moderators</h3>
          <p className="text-2xl font-bold text-yellow-600 mt-2">{totalModerators}</p>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col items-center">
          <h3 className="text-gray-700 dark:text-gray-300 font-semibold">Active Users</h3>
          <p className="text-2xl font-bold text-purple-600 mt-2">{totalActive}</p>
        </motion.div>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
      >
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>All</option>
          <option>Admin</option>
          <option>User</option>
          <option>Moderator</option>
        </select>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Showing <span className="font-medium">{filteredUsers.length}</span> users
        </p>
      </motion.div>

      {/* Users Table */}
      <motion.div
        whileHover={{ scale: 1 }}
        className="overflow-x-auto rounded-xl shadow-lg bg-white dark:bg-gray-800"
      >
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">ID</th>
              <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Name</th>
              <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Email</th>
              <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Role</th>
              <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Status</th>
              <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Last Login</th>
              <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">{user.id}</td>
                <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">{user.name}</td>
                <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">{user.email}</td>
                <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleColors[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">{user.lastLogin}</td>
                <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 text-gray-600 dark:text-gray-400 text-sm">
        Page 1 of 1
      </div>
    </div>
  );
};

export default UserList;
