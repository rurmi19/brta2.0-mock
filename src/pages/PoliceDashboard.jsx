import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Routes, Route, NavLink } from 'react-router-dom';
import {
  QrCode,
  CheckCircle,
  XCircle,
  Warning,
  Car,
  SignOut,
  Bell,
  X,
  Database,
  ClockCounterClockwise,
  List,
} from 'phosphor-react';
import StatCard from '../components/StatCard';
import { useLanguage } from '../contexts/AppContext';
import { translations } from '../utils/translations';
import ThemeLanguageToggler from '../components/ThemeLanguageToggler';
import PoliceVerification from './police/PoliceVerification';
import PoliceRecords from './police/PoliceRecords';
import PoliceRecentActivity from './police/PoliceRecentActivity';

const PoliceDashboard = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const notifications = [
    "Incident reported at checkpoint.",
    "License verification required.",
    "Patrol schedule updated."
  ];

  const menuItems = [
    { 
      id: 'verification', 
      icon: QrCode, 
      label: language === 'en' ? 'Verification' : 'যাচাইকরণ', 
      path: '/police/verification',
      description: language === 'en' ? 'QR & Plate Search' : 'QR ও প্লেট অনুসন্ধান'
    },
    { 
      id: 'records', 
      icon: Database, 
      label: language === 'en' ? 'Records' : 'রেকর্ড', 
      path: '/police/records',
      description: language === 'en' ? 'Vehicle Database' : 'যানবাহন ডাটাবেস'
    },
    { 
      id: 'activity', 
      icon: ClockCounterClockwise, 
      label: language === 'en' ? 'Recent Activity' : 'সাম্প্রতিক', 
      path: '/police/activity',
      description: language === 'en' ? 'Live Feed' : 'লাইভ ফিড'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 50, 0],
            y: [0, -100, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <List size={24} weight="bold" />
            </motion.button>
            <div className="flex items-center gap-3">
              <img src="/brta.png" alt="BRTA Logo" className="h-10 w-10" />
              <div>
                <h1 className="text-xl font-bold text-primary dark:text-green-400">BRTA 2.0 - {t.policeDashboard}</h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative p-2 rounded-full hover:bg-primary/10 transition"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <Bell size={24} className="text-primary" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">{notifications.length}</span>
            </button>
            <ThemeLanguageToggler />
          </div>
        </div>

        {/* Notifications Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute right-6 top-20 w-80 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bell size={20} className="text-primary dark:text-green-400" />
                  <span className="font-bold text-lg text-gray-800 dark:text-white">{language === 'en' ? 'Police Notifications' : 'পুলিশ বিজ্ঞপ্তি'}</span>
                </div>
                <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X size={20} />
                </button>
              </div>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <li className="italic text-gray-400 dark:text-gray-500">{language === 'en' ? 'No notifications' : 'কোনো বিজ্ঞপ্তি নেই'}</li>
                ) : (
                  notifications.map((note, idx) => (
                    <li key={idx} className="bg-primary/5 dark:bg-primary/10 rounded-lg px-3 py-2 shadow-sm border border-primary/10 dark:border-primary/20 text-gray-800 dark:text-gray-200 text-sm">
                      {note}
                    </li>
                  ))
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="flex pt-20">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed left-0 top-20 bottom-0 w-64 bg-white dark:bg-gray-900 shadow-xl p-6 overflow-y-auto z-40"
            >
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-primary text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon size={24} weight={isActive ? 'fill' : 'regular'} />
                        <span className="font-semibold">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* Logout Button */}
              <div className="absolute bottom-6 left-6 right-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-danger hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl font-semibold transition-all"
                >
                  <SignOut size={24} weight="bold" />
                  {t.logout}
                </motion.button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={`flex-1 p-8 transition-all ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-4 gap-6 mb-8"
          >
            <StatCard
              icon={<CheckCircle size={48} weight="duotone" />}
              title={language === 'en' ? 'Vehicles Checked Today' : 'আজ পরীক্ষিত যানবাহন'}
              value="247"
              color="success"
              trend={12}
            />
            <StatCard
              icon={<Warning size={48} weight="duotone" />}
              title={language === 'en' ? 'Violations Found' : 'লঙ্ঘন পাওয়া গেছে'}
              value="18"
              color="warning"
              trend={-5}
            />
            <StatCard
              icon={<XCircle size={48} weight="duotone" />}
              title={language === 'en' ? 'Expired Documents' : 'মেয়াদ শেষ নথি'}
              value="12"
              color="danger"
              trend={-8}
            />
            <StatCard
              icon={<Car size={48} weight="duotone" />}
              title={language === 'en' ? 'Active Patrols' : 'সক্রিয় টহল'}
              value="35"
              color="info"
              trend={5}
            />
          </motion.div>

          {/* Sub Routes */}
          <Routes>
            <Route path="/verification" element={<PoliceVerification />} />
            <Route path="/records" element={<PoliceRecords />} />
            <Route path="/activity" element={<PoliceRecentActivity />} />
            <Route path="/" element={<PoliceVerification />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default PoliceDashboard;
