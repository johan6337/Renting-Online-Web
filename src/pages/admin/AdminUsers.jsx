import React, { useState } from 'react';
import Sidebar_Admin from '../../components/sidebar/Sidebar_Admin';
import { Bell, Search, Plus } from 'lucide-react';

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active', joinDate: 'Jan 15, 2025' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Seller', status: 'Active', joinDate: 'Feb 20, 2025' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Customer', status: 'Inactive', joinDate: 'Mar 10, 2025' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Seller', status: 'Active', joinDate: 'Apr 5, 2025' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Customer', status: 'Active', joinDate: 'May 12, 2025' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar_Admin active="User Management" />
      
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-300 pl-12 pr-4 py-3 rounded-full text-sm placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Join Date</th>
                  {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'Active' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
                    {/* <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          Delete
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;
