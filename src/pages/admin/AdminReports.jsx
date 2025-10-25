import React from 'react';
import Sidebar_Admin from '../../components/sidebar/Sidebar_Admin';
import { Bell, Download, TrendingUp, TrendingDown } from 'lucide-react';

const AdminReports = () => {
  const reports = [
    { title: 'Sales Report', period: 'Monthly', value: '$12,345', change: '+12%', trend: 'up' },
    { title: 'User Growth', period: 'Weekly', value: '234', change: '+8%', trend: 'up' },
    { title: 'Orders', period: 'Daily', value: '89', change: '-3%', trend: 'down' },
    { title: 'Revenue', period: 'Yearly', value: '$145,678', change: '+25%', trend: 'up' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar_Admin active="Reports" />
      
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
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <button className="bg-black text-white px-6 py-2.5 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export Reports
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {reports.map((report, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium mb-1">{report.title}</h3>
                    <p className="text-xs text-gray-400">{report.period}</p>
                  </div>
                  {report.trend === 'up' ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{report.value}</p>
                <p className={`text-sm font-semibold ${
                  report.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {report.change} from last period
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex justify-between items-center pb-4 border-b border-gray-200 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Transaction #{1000 + item}</p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                    <span className="text-lg font-bold text-gray-900">${(Math.random() * 500 + 50).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Top Products</h2>
              <div className="space-y-4">
                {['T-shirt', 'Jeans', 'Shoes', 'Jacket', 'Bag'].map((product, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-4 border-b border-gray-200 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                      <span className="text-sm font-medium text-gray-900">{product}</span>
                    </div>
                    <span className="text-sm text-gray-600">{Math.floor(Math.random() * 200 + 50)} sales</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminReports;
