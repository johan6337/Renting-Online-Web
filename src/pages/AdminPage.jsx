import React, { useState } from 'react';
import Sidebar_Admin from '../components/sidebar/Sidebar_Admin';
import { Search, Filter, Download, MoreHorizontal, Edit, Trash, Eye, Users, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

const AdminPage = () => {
  const [activeFilter, setActiveFilter] = useState('All Users');
  const [searchTerm, setSearchTerm] = useState('');

  const adminData = {
    stats: [
      { label: 'Total Users', value: '1,234', color: 'bg-blue-500' },
      { label: 'Active Users', value: '1,189', color: 'bg-green-500' },
      { label: 'Suspended', value: '32', color: 'bg-orange-500' },
      { label: 'Pending Verification', value: '13', color: 'bg-purple-500' }
    ],
    users: [
      {
        id: '#10234',
        name: 'John Anderson',
        email: 'john.anderson@gmail.com',
        phone: '+1 234-567-8901',
        joinDate: 'Jan 15, 2025',
        rentals: 12,
        status: 'Active'
      },
      {
        id: '#10233',
        name: 'Sarah Mitchell',
        email: 'sarah.mitchell@gmail.com',
        phone: '+1 234-567-8902',
        joinDate: 'Jan 14, 2025',
        rentals: 8,
        status: 'Active'
      },
      {
        id: '#10232',
        name: 'Michael Chen',
        email: 'michael.chen@gmail.com',
        phone: '+1 234-567-8903',
        joinDate: 'Jan 13, 2025',
        rentals: 5,
        status: 'Suspended'
      },
      {
        id: '#10231',
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@gmail.com',
        phone: '+1 234-567-8904',
        joinDate: 'Jan 12, 2025',
        rentals: 15,
        status: 'Active'
      },
      {
        id: '#10230',
        name: 'David Thompson',
        email: 'david.thompson@gmail.com',
        phone: '+1 234-567-8905',
        joinDate: 'Jan 11, 2025',
        rentals: 3,
        status: 'Pending'
      },
      {
        id: '#10229',
        name: 'Lisa Parker',
        email: 'lisa.parker@gmail.com',
        phone: '+1 234-567-8906',
        joinDate: 'Jan 10, 2025',
        rentals: 20,
        status: 'Active'
      }
    ]
  };

  const statsWithIcons = adminData.stats.map((stat, index) => {
    const icons = [Users, CheckCircle, XCircle, Clock];
    return {
      ...stat,
      icon: icons[index] || Users
    };
  });

  const users = adminData.users;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    
    if (activeFilter === 'All Users') return matchesSearch;
    if (activeFilter === 'Active') return matchesSearch && user.status === 'Active';
    if (activeFilter === 'Suspended') return matchesSearch && user.status === 'Suspended';
    if (activeFilter === 'Pending') return matchesSearch && user.status === 'Pending';
    
    return matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar_Admin active="User Management" />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600">Manage all platform users</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Admin User</span>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsWithIcons.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search users by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {['All Users', 'Active', 'Suspended', 'Pending'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        activeFilter === filter
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rentals</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.phone}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.joinDate}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.rentals}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <nav className="flex items-center gap-1">
                <button className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md">
                  1
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  2
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  3
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  4
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  5
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;