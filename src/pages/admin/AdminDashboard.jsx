import React from 'react';
import Sidebar_Admin from '../../components/sidebar/Sidebar_Admin';
import { Bell } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: 1234 },
    { label: 'Total Products', value: 567 },
    { label: 'Total Orders', value: 890 },
    { label: 'Revenue', value: '$45,678' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar_Admin active="Dashboard" />
      
      <div className="flex-1">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex justify-end items-center">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="h-6 w-6 text-gray-600" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <span className="text-sm font-medium text-gray-700">Admin account</span>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-gray-500 text-sm font-medium mb-2">{stat.label}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="pb-4 border-b border-gray-200 last:border-0">
                    <p className="text-sm text-gray-600">User activity #{item}</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">System Status</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Server Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                    Online
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Database</span>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                    Connected
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">API Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
