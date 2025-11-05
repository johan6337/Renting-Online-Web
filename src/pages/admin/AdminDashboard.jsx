import React, { useState, useEffect } from 'react';
import Sidebar_Admin from '../../components/sidebar/Sidebar_Admin';
import { Bell } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState([
    { label: 'Total Users', value: 'Loading...' },
    { label: 'Total Products', value: 'Loading...' },
    { label: 'Total Orders', value: 'Loading...' },
    { label: 'Revenue', value: 'Loading...' }
  ]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users data from API
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUsers(data.data.users);
          // Update stats with real data
          setStats([
            { label: 'Total Users', value: data.data.pagination.total },
            { label: 'Total Products', value: 'hardcore' }, 
            { label: 'Total Orders', value: 'hardcore' },  
            { label: 'Revenue', value: 'hardcore' }
          ]);
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar_Admin active="Dashboard" />
      
      <div className="flex-1">
        {/* Top Header */}
        {/* <header className="bg-white border-b border-gray-200 px-8 py-4">
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
        </header> */}

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
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Users</h2>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-gray-500">Loading users...</div>
                ) : users.length > 0 ? (
                  users.slice(0, 5).map((user) => (
                    <div key={user.user_id} className="pb-4 border-b border-gray-200 last:border-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.username}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'seller' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role}
                          </span>
                          <p className="text-xs text-gray-400 mt-1">
                            {user.status === 'active' ? 'Active' : user.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No users found</div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">User Statistics</h2>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-gray-500">Loading statistics...</div>
                ) : (
                  (() => {
                    const roleStats = users.reduce((acc, user) => {
                      acc[user.role] = (acc[user.role] || 0) + 1;
                      return acc;
                    }, {});
                    
                    const statusStats = users.reduce((acc, user) => {
                      acc[user.status] = (acc[user.status] || 0) + 1;
                      return acc;
                    }, {});

                    return (
                      <>
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 mb-2">By Role</h3>
                          {Object.entries(roleStats).map(([role, count]) => (
                            <div key={role} className="flex justify-between items-center mb-1">
                              <span className="text-gray-600 capitalize">{role}</span>
                              <span className="font-semibold text-gray-900">{count}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">By Status</h3>
                          {Object.entries(statusStats).map(([status, count]) => (
                            <div key={status} className="flex justify-between items-center mb-1">
                              <span className="text-gray-600 capitalize">{status}</span>
                              <span className={`font-semibold ${
                                status === 'active' ? 'text-green-600' :
                                status === 'banned' ? 'text-red-600' :
                                'text-gray-900'
                              }`}>
                                {count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })()
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
