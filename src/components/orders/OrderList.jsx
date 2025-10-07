import React, { useState } from 'react';
import OrderCard from './OrderCard';

const OrderList = ({ orders = [], onViewDetails }) => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'returned', label: 'Returned' },
  ];

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status.toLowerCase() === activeTab;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your rental orders</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-semibold text-base transition-all relative ${
              activeTab === tab.id
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
            )}
          </button>
        ))}
      </div>

      {/* Orders */}
      {filteredOrders.length > 0 ? (
        <div>
          {filteredOrders.map(order => (
            <OrderCard 
              key={order.orderNumber} 
              order={order}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-6">
            {activeTab === 'all' 
              ? "You haven't placed any orders yet" 
              : `You don't have any ${activeTab} orders`}
          </p>
          <button className="px-8 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderList;
