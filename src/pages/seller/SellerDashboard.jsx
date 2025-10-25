import React from 'react';
import Sidebar_Seller from '../../components/sidebar/Sidebar_Seller';
import { Bell } from 'lucide-react';

const SellerDashboard = () => {
  // Sample data
  const products = Array(6).fill(null);
  const orders = [
    {
      id: "ORD-2025-0324",
      placedDate: "September 15, 2025",
      status: "Using",
      totalAmount: 467
    },
    {
      id: "ORD-2025-0298",
      placedDate: "September 8, 2025",
      status: "Completed",
      totalAmount: 145
    },
    {
      id: "ORD-2025-0267",
      placedDate: "August 28, 2025",
      status: "Completed",
      totalAmount: 120
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar_Seller active="Dashboard" />
      
      <div className="flex-1">
        {/* Top Header */}
        {/* <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex justify-end items-center">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="h-6 w-6 text-gray-600" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <span className="text-sm font-medium text-gray-700">Seller account</span>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </header> */}

        {/* Main Content */}
        <main className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Total Products</h3>
              <p className="text-3xl font-bold text-gray-900">{products.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Total Orders</h3>
              <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Active Orders</h3>
              <p className="text-3xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'Using').length}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="mb-4 pb-4 border-b border-gray-200 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.placedDate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === 'Using' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-900">${order.totalAmount}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
