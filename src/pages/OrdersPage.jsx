import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import OrderList from '../components/orders/OrderList';
import OrderDetail from '../components/orders/OrderDetail';
import OrderScheduleModal from '../components/orders/OrderScheduleModal';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduleModalType, setScheduleModalType] = useState(null);
  const [scheduleOrderNumber, setScheduleOrderNumber] = useState(null);
  const [scheduleByOrder, setScheduleByOrder] = useState({});

  const [orders, setOrders] = useState([
    {
      orderNumber: "ORD-2025-0325",
      placedDate: "September 16, 2025",
      status: "Ordered",
      sellerName: "Premium Fashion",
      items: [
        {
          productId: "PRD-005",
          name: "Designer Coat",
          size: "Large",
          color: "Grey",
          rentalPeriod: "5 days",
          price: 300,
          imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop"
        }
      ],
      totalAmount: 300,
      subtotal: 300,
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
          date: "September 16, 2025 - 11:00 AM",
          completed: true,
          description: "Your order has been confirmed and payment received."
        },
        {
          title: "Shipping",
          date: "Pending",
          completed: false,
          description: "Waiting for seller to confirm and ship."
        },
        {
          title: "Received",
          date: "Pending",
          completed: false,
          description: "Awaiting confirmation that you received the items."
        },
        {
          title: "Using",
          date: "Pending",
          completed: false,
          description: "You will be using the rented items."
        },
        {
          title: "Returned",
          date: "Pending",
          completed: false,
          description: "Items will be returned to the seller."
        }
      ]
    },
    {
      orderNumber: "ORD-2025-0324",
      placedDate: "September 15, 2025",
      status: "Shipping",
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
          description: "Your order has been confirmed and payment received."
        },
        {
          title: "Shipping",
          date: "September 15, 2025 - 2:00 PM",
          completed: true,
          description: "Items are being shipped to your location."
        },
        {
          title: "Received",
          date: "Expected: September 17, 2025",
          completed: false,
          description: "Awaiting confirmation that you received the items."
        },
        {
          title: "Using",
          date: "Pending",
          completed: false,
          description: "You are using the rented items."
        },
        {
          title: "Returned",
          date: "Pending",
          completed: false,
          description: "Items will be returned to the seller."
        }
      ]
    },
    {
      orderNumber: "ORD-2025-0299",
      placedDate: "September 10, 2025",
      status: "Using",
      sellerName: "Style Hub",
      items: [
        {
          productId: "PRD-004",
          name: "Leather Jacket",
          size: "Large",
          color: "Black",
          rentalPeriod: "5 days",
          price: 250,
          imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"
        }
      ],
      totalAmount: 250,
      subtotal: 250,
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
          date: "September 10, 2025 - 9:00 AM",
          completed: true,
          description: "Your order has been confirmed and payment received."
        },
        {
          title: "Shipping",
          date: "September 10, 2025 - 11:00 AM",
          completed: true,
          description: "Items shipped successfully."
        },
        {
          title: "Received",
          date: "September 12, 2025 - 3:00 PM",
          completed: true,
          description: "You confirmed receiving the items."
        },
        {
          title: "Using",
          date: "September 12, 2025 - 3:00 PM",
          completed: true,
          description: "Currently using the rented items."
        },
        {
          title: "Returned",
          date: "Expected: September 17, 2025",
          completed: false,
          description: "Return the items when rental period ends."
        }
      ]
    },
    {
      orderNumber: "ORD-2025-0300",
      placedDate: "September 9, 2025",
      status: "Return",
      sellerName: "Urban Wear",
      items: [
        {
          productId: "PRD-006",
          name: "Casual Hoodie",
          size: "Medium",
          color: "Navy",
          rentalPeriod: "4 days",
          price: 95,
          imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop"
        }
      ],
      totalAmount: 95,
      subtotal: 95,
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
          date: "September 9, 2025 - 1:00 PM",
          completed: true,
          description: "Your order has been confirmed and payment received."
        },
        {
          title: "Shipping",
          date: "September 9, 2025 - 4:00 PM",
          completed: true,
          description: "Items shipped successfully."
        },
        {
          title: "Received",
          date: "September 11, 2025 - 10:00 AM",
          completed: true,
          description: "You confirmed receiving the items."
        },
        {
          title: "Using",
          date: "September 11, 2025 - 10:00 AM",
          completed: true,
          description: "Used the rented items."
        },
        {
          title: "Returned",
          date: "September 15, 2025 - 2:00 PM",
          completed: true,
          description: "Return initiated. Waiting for seller confirmation."
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
          date: "September 8, 2025 - 10:00 AM",
          completed: true,
          description: "Your order has been confirmed and payment received."
        },
        {
          title: "Shipping",
          date: "September 8, 2025 - 2:00 PM",
          completed: true,
          description: "Items shipped successfully."
        },
        {
          title: "Received",
          date: "September 10, 2025 - 11:00 AM",
          completed: true,
          description: "You confirmed receiving the items."
        },
        {
          title: "Using",
          date: "September 10, 2025 - 11:00 AM",
          completed: true,
          description: "Used the rented items."
        },
        {
          title: "Returned",
          date: "September 13, 2025 - 4:00 PM",
          completed: true,
          description: "Items successfully returned and order completed."
        }
      ]
    },
    {
      orderNumber: "ORD-2025-0297",
      placedDate: "September 7, 2025",
      status: "Completed",
      sellerName: "Chic Boutique",
      items: [
        {
          productId: "PRD-007",
          name: "Evening Dress",
          size: "Small",
          color: "Red",
          rentalPeriod: "2 days",
          price: 220,
          imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=400&fit=crop"
        }
      ],
      totalAmount: 220,
      subtotal: 220,
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
          date: "September 7, 2025 - 8:00 AM",
          completed: true,
          description: "Your order has been confirmed and payment received."
        },
        {
          title: "Shipping",
          date: "September 7, 2025 - 12:00 PM",
          completed: true,
          description: "Items shipped successfully."
        },
        {
          title: "Received",
          date: "September 9, 2025 - 9:00 AM",
          completed: true,
          description: "You confirmed receiving the items."
        },
        {
          title: "Using",
          date: "September 9, 2025 - 9:00 AM",
          completed: true,
          description: "Used the rented items."
        },
        {
          title: "Returned",
          date: "September 11, 2025 - 5:00 PM",
          completed: true,
          description: "Items successfully returned and order completed."
        }
      ]
    }
  ]);

  const handleConfirmReceived = (order) => {
    setOrders(prevOrders =>
      prevOrders.map(o => {
        if (o.orderNumber === order.orderNumber) {
          // Update timeline to mark "Received" and "Using" as completed
          const updatedTimeline = o.timeline.map(event => {
            if (event.title.toLowerCase() === 'received' || event.title.toLowerCase() === 'using') {
              return {
                ...event,
                completed: true,
                date: event.title.toLowerCase() === 'received' 
                  ? new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) + ' - ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                  : event.date
              };
            }
            return event;
          });
          return { ...o, status: 'Using', timeline: updatedTimeline };
        }
        return o;
      })
    );
  };

  const handleInitiateReturn = (order) => {
    setOrders(prevOrders =>
      prevOrders.map(o => {
        if (o.orderNumber === order.orderNumber) {
          // Update timeline to mark "Returned" as completed
          const updatedTimeline = o.timeline.map(event => {
            if (event.title.toLowerCase() === 'returned') {
              return {
                ...event,
                completed: true,
                date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) + ' - ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
                description: 'Return initiated by customer.'
              };
            }
            return event;
          });
          return { ...o, status: 'Return', timeline: updatedTimeline };
        }
        return o;
      })
    );
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  const isCompletedOrder = (order) => order.status?.toLowerCase() === 'completed';

  const hasStoredReview = (orderNumber) => {
    if (typeof window === 'undefined') {
      return false;
    }
    try {
      const stored = window.localStorage.getItem('postRentalReview');
      if (!stored) return false;
      const parsed = JSON.parse(stored);
      if (!parsed) return false;
      if (!orderNumber) return true;
      return parsed.orderNumber === orderNumber;
    } catch (error) {
      console.warn('Unable to read stored review:', error);
      return false;
    }
  };

  const handleReviewNavigation = (order) => {
    if (!order) return;
    const hasReview = hasStoredReview(order.orderNumber);
    const targetPath = hasReview ? '/review/completed' : '/review';
    const primaryItem = order.items?.[0] || null;
    const navigationState = {
      orderNumber: order.orderNumber,
    };
    if (primaryItem) {
      navigationState.productId = primaryItem.productId || primaryItem.id || null;
      navigationState.productName = primaryItem.name || null;
      navigationState.product = primaryItem;
    }
    navigate(targetPath, { state: navigationState });
  };

  const handleOpenScheduleModal = (order, type) => {
    setScheduleOrderNumber(order.orderNumber);
    setScheduleModalType(type);
    setScheduleModalOpen(true);
  };

  const handleCloseScheduleModal = () => {
    setScheduleModalOpen(false);
    setScheduleOrderNumber(null);
    setScheduleModalType(null);
  };

  const handleSaveSchedule = (scheduleData) => {
    if (!scheduleOrderNumber || !scheduleModalType) {
      return;
    }
    setScheduleByOrder((prev) => ({
      ...prev,
      [scheduleOrderNumber]: {
        ...(prev[scheduleOrderNumber] || {}),
        [scheduleModalType]: scheduleData,
      },
    }));
    setScheduleModalOpen(false);
    setScheduleOrderNumber(null);
    setScheduleModalType(null);
  };

  const selectedOrderSchedule = selectedOrder ? scheduleByOrder[selectedOrder.orderNumber] || {} : {};
  const selectedReceiveSchedule = selectedOrderSchedule.receive;
  const selectedReturnSchedule = selectedOrderSchedule.return;
  const modalInitialSchedule =
    scheduleOrderNumber && scheduleModalType
      ? scheduleByOrder[scheduleOrderNumber]?.[scheduleModalType]
      : null;

  if (selectedOrder) {
    const selectedIsCompleted = isCompletedOrder(selectedOrder);

    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <OrderDetail
          order={selectedOrder}
          onBack={handleBackToList}
          onOpenReceiveSchedule={() => handleOpenScheduleModal(selectedOrder, 'receive')}
          onOpenReturnSchedule={() => handleOpenScheduleModal(selectedOrder, 'return')}
          receiveDetails={selectedReceiveSchedule}
          returnDetails={selectedReturnSchedule}
          canEditReturn={true}
        />
        {selectedIsCompleted && (
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white border border-indigo-100 rounded-2xl shadow-sm p-6 mb-10">
              <h2 className="text-xl font-semibold text-gray-800">
                {hasStoredReview(selectedOrder.orderNumber) ? 'Your Review' : 'Share Your Review'}
              </h2>
              <p className="text-gray-600 mt-2">
                {hasStoredReview(selectedOrder.orderNumber)
                  ? `You already shared feedback for order #${selectedOrder.orderNumber}. View or update it anytime.`
                  : `Share your experience for order #${selectedOrder.orderNumber} to help fellow renters.`}
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => handleReviewNavigation(selectedOrder)}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                >
                  {hasStoredReview(selectedOrder.orderNumber) ? 'View Review' : 'Write Review'}
                </button>
              </div>
            </div>
          </div>
        )}
        <OrderScheduleModal
          open={scheduleModalOpen}
          onClose={handleCloseScheduleModal}
          onSave={handleSaveSchedule}
          initialSchedule={modalInitialSchedule}
          type={scheduleModalType}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <OrderList 
        orders={orders} 
        onViewDetails={handleViewDetails}
        onConfirmReceived={handleConfirmReceived}
        onInitiateReturn={handleInitiateReturn}
      />
      <OrderScheduleModal
        open={scheduleModalOpen}
        onClose={handleCloseScheduleModal}
        onSave={handleSaveSchedule}
        initialSchedule={modalInitialSchedule}
        type={scheduleModalType}
      />
      <Footer />
    </div>
  );
};

export default OrdersPage;
