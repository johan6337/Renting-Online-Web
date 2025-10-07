import React, { useState } from 'react';
import OrderList from '../components/orders/OrderList';
import OrderDetail from '../components/orders/OrderDetail';

const OrdersPage = ({ orders = [] }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  if (selectedOrder) {
    return <OrderDetail order={selectedOrder} onBack={handleBackToList} />;
  }

  return <OrderList orders={orders} onViewDetails={handleViewDetails} />;
};

export default OrdersPage;
