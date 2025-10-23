import React, { useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import OrderList from '../components/orders/OrderList';
import OrderDetail from '../components/orders/OrderDetail';

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      orderNumber: "ORD-2025-0324",
      placedDate: "September 15, 2025",
      status: "Active",
      sellerName: "Fashion Store Co.",
      items: [
        {
          productId: "PRD-001",
          name: "Checkered Shirt",
          size: "Medium",
          color: "Red",
          rentalPeriod: "7 days",
          price: 180,
          imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop"
        },
        {
          productId: "PRD-002",
          name: "Skinny Fit Jeans",
          size: "Large",
          color: "Blue",
          rentalPeriod: "7 days",
          price: 240,
          imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop"
        }
      ],
      totalAmount: 467,
      subtotal: 420,
      tax: 47,
      shippingAddress: {
        name: "John Doe",
        address: "123 Fashion Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        phone: "+1 (555) 123-4567"
      },
      timeline: [
        {
          title: "Order Placed",
          date: "September 15, 2025 - 10:30 AM",
          completed: true,
          description: "Your order has been confirmed"
        },
        {
          title: "Processing",
          date: "September 15, 2025 - 2:45 PM",
          completed: true,
          description: "Items are being prepared for shipment"
        },
        {
          title: "Shipped",
          date: "September 16, 2025 - 9:00 AM",
          completed: true,
          description: "Package is on the way. Tracking: TRK123456789"
        },
        {
          title: "Delivered",
          date: "Expected: September 17, 2025",
          completed: false,
          description: "Estimated delivery time"
        }
      ]
    },
    {
      orderNumber: "ORD-2025-0298",
      placedDate: "September 8, 2025",
      status: "Completed",
      sellerName: "Trendy Apparel",
      items: [
        {
          productId: "PRD-003",
          name: "Gradient Graphic T-shirt",
          size: "Large",
          color: "Multi",
          rentalPeriod: "3 days",
          price: 145,
          imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
        }
      ],
      totalAmount: 145,
      subtotal: 145,
      shippingAddress: {
        name: "John Doe",
        address: "123 Fashion Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        phone: "+1 (555) 123-4567"
      },
      timeline: [
        {
          title: "Order Placed",
          date: "September 8, 2025",
          completed: true
        },
        {
          title: "Shipped",
          date: "September 9, 2025",
          completed: true
        },
        {
          title: "Delivered",
          date: "September 10, 2025",
          completed: true
        },
        {
          title: "Returned",
          date: "September 13, 2025",
          completed: true,
          description: "Item successfully returned"
        }
      ]
    }
  ];

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  if (selectedOrder) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <OrderDetail order={selectedOrder} onBack={handleBackToList} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <OrderList orders={orders} onViewDetails={handleViewDetails} />
      <Footer />
    </div>
  );
};

export default OrdersPage;