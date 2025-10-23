import React, { useState } from 'react';
import OrderCard from './OrderCard';
import ReportUserForm from '../../pages/ReportUserForm';

const OrderList = ({ orders = [], onViewDetails, isSeller = false }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const handleReportUser = (order) => {
    setSelectedOrder(order);
    setShowReportForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your rental orders</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 px-4 font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-black'
                : 'text-gray-500 hover:text-gray-900'
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
        filteredOrders.map((order) => (
          <OrderCard 
            key={order.orderNumber || order.id} 
            order={order} 
            onViewDetails={onViewDetails}
            onReportUser={handleReportUser}
            isSeller={isSeller}
          />
        ))
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      )}

      {/* Report User Form */}
      {showReportForm && selectedOrder && (
        <ReportUserForm 
          userName={isSeller ? selectedOrder.buyerName : selectedOrder.sellerName}
          onClose={() => {
            setShowReportForm(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default OrderList;