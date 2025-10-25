import React, { useState } from 'react';
import Sidebar_Seller from '../../components/sidebar/Sidebar_Seller';
import { Bell } from 'lucide-react';
import OrderList from '../../components/orders/OrderList';
import OrderDetail from '../../components/orders/OrderDetail';
import ReportUserForm from '../../pages/ReportUserForm';
import MessagePopup from '../../components/common/MessagePopup';

const SellerOrders = () => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDetailOrder, setSelectedDetailOrder] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const [orders, setOrders] = useState([
    {
      id: "ORD-2025-0324",
      placedDate: "September 15, 2025",
      status: "Ordered",
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
      totalAmount: 467,
      shippingAddress: {
        name: "John Anderson",
        address: "456 Main Street",
        city: "Boston",
        state: "MA",
        zipCode: "02101",
        phone: "+1 (555) 234-5678"
      }
    },
    {
      id: "ORD-2025-0323",
      placedDate: "September 14, 2025",
      status: "Shipping",
      buyerName: "Emma Wilson",
      items: [
        {
          name: "Denim Jacket",
          size: "Small",
          color: "Blue",
          rentalPeriod: "5 days",
          price: 200,
          image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"
        }
      ],
      totalAmount: 200,
      shippingAddress: {
        name: "Emma Wilson",
        address: "789 Oak Avenue",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        phone: "+1 (555) 345-6789"
      }
    },
    {
      id: "ORD-2025-0320",
      placedDate: "September 12, 2025",
      status: "Using",
      buyerName: "David Miller",
      items: [
        {
          name: "Formal Suit",
          size: "Large",
          color: "Black",
          rentalPeriod: "3 days",
          price: 350,
          image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop"
        }
      ],
      totalAmount: 350,
      shippingAddress: {
        name: "David Miller",
        address: "321 Park Lane",
        city: "San Francisco",
        state: "CA",
        zipCode: "94102",
        phone: "+1 (555) 456-7890"
      }
    },
    {
      id: "ORD-2025-0298",
      placedDate: "September 8, 2025",
      status: "Return",
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
      totalAmount: 145,
      shippingAddress: {
        name: "Sarah Mitchell",
        address: "234 Elm Street",
        city: "Miami",
        state: "FL",
        zipCode: "33101",
        phone: "+1 (555) 567-8901"
      }
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
      totalAmount: 120,
      shippingAddress: {
        name: "Michael Chen",
        address: "567 Pine Road",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        phone: "+1 (555) 678-9012"
      }
    },
    {
      id: "ORD-2025-0266",
      placedDate: "August 27, 2025",
      status: "Completed",
      buyerName: "Lisa Brown",
      items: [
        {
          name: "Summer Dress",
          size: "Medium",
          color: "Floral",
          rentalPeriod: "7 days",
          price: 180,
          image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop"
        }
      ],
      totalAmount: 180,
      shippingAddress: {
        name: "Lisa Brown",
        address: "890 Maple Drive",
        city: "Denver",
        state: "CO",
        zipCode: "80201",
        phone: "+1 (555) 789-0123"
      }
    }
  ]);

  const handleReportUser = (order) => {
    setSelectedOrder(order);
    setShowReportForm(true);
  };

  const handleConfirmPayment = (order) => {
    setSelectedOrder(order);
    setConfirmAction('payment');
    setShowConfirmModal(true);
  };

  const handleCompleteOrder = (order) => {
    setSelectedOrder(order);
    setConfirmAction('complete');
    setShowConfirmModal(true);
  };

  const handleTrackOrder = (order) => {
    // Convert order format to match OrderDetail expectations
    const formattedOrder = {
      ...order,
      orderNumber: order.id,
      sellerName: order.buyerName, // For seller view, show buyer name
      timeline: getOrderTimeline(order.status),
      shippingAddress: order.shippingAddress || {
        name: order.buyerName,
        address: "Address not available",
        city: "N/A",
        state: "N/A",
        zipCode: "N/A",
        phone: "N/A"
      }
    };
    setSelectedDetailOrder(formattedOrder);
  };

  const handleBackToList = () => {
    setSelectedDetailOrder(null);
  };

  const getOrderTimeline = (status) => {
    const baseTimeline = [
      {
        title: "Order Placed",
        date: "Order confirmed",
        completed: true,
        description: "Order has been confirmed and payment received."
      },
      {
        title: "Shipping",
        date: status === 'Ordered' ? 'Pending' : 'In progress',
        completed: ['Shipping', 'Using', 'Return', 'Completed'].includes(status),
        description: "Items are being shipped to customer."
      },
      {
        title: "Received",
        date: ['Shipping', 'Ordered'].includes(status) ? 'Pending' : 'Confirmed',
        completed: ['Using', 'Return', 'Completed'].includes(status),
        description: "Customer confirmed receiving the items."
      },
      {
        title: "Using",
        date: ['Ordered', 'Shipping'].includes(status) ? 'Pending' : 'In use',
        completed: ['Using', 'Return', 'Completed'].includes(status),
        description: "Customer is using the rented items."
      },
      {
        title: "Returned",
        date: status === 'Completed' ? 'Completed' : (status === 'Return' ? 'In return' : 'Pending'),
        completed: ['Return', 'Completed'].includes(status),
        description: status === 'Completed' ? "Items successfully returned." : "Items will be returned to seller."
      }
    ];
    return baseTimeline;
  };

  const handleConfirm = () => {
    if (!selectedOrder) return;

    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === selectedOrder.id) {
          if (confirmAction === 'payment') {
            return { ...order, status: 'Shipping' };
          } else if (confirmAction === 'complete') {
            return { ...order, status: 'Completed' };
          }
        }
        return order;
      })
    );

    setShowConfirmModal(false);
    setSelectedOrder(null);
    setConfirmAction(null);
  };

  const getConfirmMessage = () => {
    if (confirmAction === 'payment') {
      return {
        title: 'Confirm Payment',
        message: `Are you sure you want to confirm payment for order #${selectedOrder?.id}? This will move the order to Shipping status.`
      };
    } else if (confirmAction === 'complete') {
      return {
        title: 'Complete Order',
        message: `Are you sure you want to mark order #${selectedOrder?.id} as completed? This action confirms that the items have been returned.`
      };
    }
    return { title: '', message: '' };
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar_Seller active="Orders" />
      
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
        <main>
          {selectedDetailOrder ? (
            <div className="p-8">
              <OrderDetail
                order={selectedDetailOrder}
                onBack={handleBackToList}
                onOpenReceiveSchedule={() => {}} // Disabled for seller
                onOpenReturnSchedule={() => {}} // Disabled for seller
                receiveDetails={null}
                returnDetails={null}
                canEditReturn={false} // Seller cannot edit
                isSellerView={true}
              />
            </div>
          ) : (
            <OrderList 
              orders={orders} 
              isSeller={true}
              onTrackOrder={handleTrackOrder}
              onReportUser={handleReportUser}
              onConfirmPayment={handleConfirmPayment}
              onCompleteOrder={handleCompleteOrder}
            />
          )}
        </main>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedOrder && (
        <MessagePopup
          isOpen={showConfirmModal}
          onClose={() => {
            setShowConfirmModal(false);
            setSelectedOrder(null);
            setConfirmAction(null);
          }}
          title={getConfirmMessage().title}
          message={getConfirmMessage().message}
          icon="info"
          primaryButton={{
            label: 'Confirm',
            onClick: handleConfirm
          }}
          secondaryButton={{
            label: 'Cancel',
            onClick: () => {
              setShowConfirmModal(false);
              setSelectedOrder(null);
              setConfirmAction(null);
            }
          }}
        />
      )}

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