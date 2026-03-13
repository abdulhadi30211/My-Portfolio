import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FiGrid, FiPlusCircle, FiEdit, FiLogOut, FiUser } from 'react-icons/fi';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { useRouter } from 'next/router';

interface AdminLayoutProps {
  children: ReactNode;
  activeTab?: 'dashboard' | 'projects' | 'create' | 'edit';
}

export default function AdminLayout({ children, activeTab = 'dashboard' }: AdminLayoutProps) {
  const { logout, isAdmin, isLoading } = useAdminAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    router.push('/admin/login');
    return null;
  }

  const navItems = [
    { name: 'Dashboard', icon: FiGrid, value: 'dashboard' },
    { name: 'All Projects', icon: FiGrid, value: 'projects' },
    { name: 'Add Project', icon: FiPlusCircle, value: 'create' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                Portfolio Admin
              </h1>
              
              {/* Navigation Links */}
              <div className="hidden md:flex space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => router.push(`/admin/${item.value === 'dashboard' ? 'dashboard' : item.value === 'projects' ? 'dashboard' : 'project-' + item.value}`)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      activeTab === item.value
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <item.icon className="mr-2" />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <FiUser />
                <span className="hidden sm:inline">Admin</span>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              >
                <FiLogOut className="mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Portfolio Admin Panel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
