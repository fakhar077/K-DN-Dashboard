import React from "react";
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  KeyIcon,
  ClockIcon,
  PencilSquareIcon,
  PhoneIcon,
  GlobeAltIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

const UserProfile: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const user = {
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    bio: "Tech enthusiast and team leader with a passion for building scalable enterprise solutions. Experienced in cloud systems, AI, and full-stack development.",
    phone: "+1 234 567 890",
    location: "New York, USA",
    website: "www.johndoe.dev",
    stats: {
      projects: 12,
      teams: 4,
      logins: 320,
    },
  };

  const activity = [
    { action: "Updated account settings", time: "2 hrs ago" },
    { action: "Created project 'AI Dashboard'", time: "6 hrs ago" },
    { action: "Joined Finance Team", time: "1 day ago" },
    { action: "Enabled Two-Factor Authentication", time: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 flex flex-col lg:flex-row items-center justify-between shadow-lg"
      >
        <div className="flex items-center gap-6">
          <UserCircleIcon className="w-24 h-24 text-white" />
          <div>
            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
            <p className="mt-1 px-3 py-1 text-sm bg-white/20 text-white rounded-full inline-block">
              {user.role}
            </p>
            <p className="text-sm text-blue-100 mt-2 flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" /> {user.location}
            </p>
          </div>
        </div>
        <div className="flex gap-3 mt-6 lg:mt-0">
          <button className="px-5 py-2 bg-white text-blue-700 rounded-lg shadow hover:bg-gray-100 flex items-center gap-2">
            <PencilSquareIcon className="w-5 h-5" /> Edit Profile
          </button>
          <button className="px-5 py-2 bg-blue-800 text-white rounded-lg shadow hover:bg-blue-900">
            Settings
          </button>
        </div>
      </motion.div>

      {/* Info & Stats */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* About */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-3"
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            About
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {user.bio}
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-3"
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Contact Info
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
            <p className="flex items-center gap-2">
              <EnvelopeIcon className="w-5 h-5 text-blue-500" /> {user.email}
            </p>
            <p className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5 text-green-500" /> {user.phone}
            </p>
            <p className="flex items-center gap-2">
              <GlobeAltIcon className="w-5 h-5 text-purple-500" />
              <a
                href={`https://${user.website}`}
                className="hover:underline text-blue-600 dark:text-blue-400"
              >
                {user.website}
              </a>
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center"
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Account Stats
          </h2>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-2xl font-bold text-blue-600">{user.stats.projects}</p>
              <p className="text-sm text-gray-500">Projects</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{user.stats.teams}</p>
              <p className="text-sm text-gray-500">Teams</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">{user.stats.logins}</p>
              <p className="text-sm text-gray-500">Logins</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg divide-y divide-gray-200 dark:divide-gray-700">
          {activity.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 flex justify-between items-center"
            >
              <span className="text-gray-700 dark:text-gray-300">{log.action}</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                <ClockIcon className="w-4 h-4" /> {log.time}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Security Settings
        </h2>
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <p className="flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-green-500" /> Two-Factor
            Authentication: <span className="font-medium">Enabled</span>
          </p>
          <p className="flex items-center gap-2">
            <KeyIcon className="w-5 h-5 text-yellow-500" /> Last Password Change:{" "}
            <span className="font-medium">15 days ago</span>
          </p>
          <p className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-red-500" /> Last Login:{" "}
            <span className="font-medium">Yesterday, 9:45 PM</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;
