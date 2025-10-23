import React, { useState } from 'react';
import Sidebar_Seller from '../../components/sidebar/Sidebar_Seller';
import { Bell } from 'lucide-react';
import OrderList from '../../components/orders/OrderList';
import ReportUserForm from '../../pages/ReportUserForm';

const SellerOrders = () => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: "ORD-2025-0324",
      placedDate: "September 15, 2025",
      status: "Active",
      buyerName: "John Anderson",
      items: [
        {
          name: "Checkered Shirt",
          size: "Medium",
          color: "Red",
          rentalPeriod: "7 days",
          price: 180,
          image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop"
        },
        {
          name: "Skinny Fit Jeans",
          size: "Large",
          color: "Blue",
          rentalPeriod: "7 days",
          price: 240,
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop"
        }
      ],
      totalAmount: 467
    },
    {
      id: "ORD-2025-0298",
      placedDate: "September 8, 2025",
      status: "Completed",
      buyerName: "Sarah Mitchell",
      items: [
        {
          name: "Gradient Graphic T-shirt",
          size: "Large",
          color: "Multi",
          rentalPeriod: "3 days",
          price: 145,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
        }
      ],
      totalAmount: 145
    },
    {
      id: "ORD-2025-0267",
      placedDate: "August 28, 2025",
      status: "Completed",
      buyerName: "Michael Chen",
      items: [
        {
          name: "Black Striped T-shirt",
          size: "Medium",
          color: "Black",
          rentalPeriod: "5 days",
          price: 120,
          image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop"
        }
      ],
      totalAmount: 120
    }
  ];

  const handleReportUser = (order) => {
    setSelectedOrder(order);
    setShowReportForm(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar_Seller active="Orders" />
      
      <div className="flex-1">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
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
        </header>

        {/* Main Content */}
        <main>
          <OrderList 
            orders={orders} 
            isSeller={true}
            onReportUser={handleReportUser}
          />
        </main>
      </div>

      {/* Report User Form */}
      {showReportForm && selectedOrder && (
        <ReportUserForm 
          userName={selectedOrder.buyerName}
          onClose={() => {
            setShowReportForm(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default SellerOrders;