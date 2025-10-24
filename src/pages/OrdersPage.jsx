import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import OrderList from '../components/orders/OrderList';
import OrderDetail from '../components/orders/OrderDetail';
import OrderScheduleModal from '../components/orders/OrderScheduleModal';

const hasTimelineStepCompleted = (order, stepTitle) => {
  if (!order || !Array.isArray(order.timeline)) {
    return false;
  }
  const normalizedStep = stepTitle.trim().toLowerCase();
  return order.timeline.some(
    (event) =>
      (event?.title || '').trim().toLowerCase() === normalizedStep && event.completed
  );
};

const OrdersPage = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduleModalType, setScheduleModalType] = useState(null);
  const [scheduleOrderNumber, setScheduleOrderNumber] = useState(null);
  const [scheduleByOrder, setScheduleByOrder] = useState({});
  const [autoPrompted, setAutoPrompted] = useState({});

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
          description: "Your order has been confirmed and is being prepared."
        },
        {
          title: "Received",
          date: "Expected: September 17, 2025",
          completed: false,
          description: "Awaiting confirmation that the rental items were received."
        },
        {
          title: "Returned",
          date: "Pending",
          completed: false,
          description: "Return details will appear once the items are sent back."
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
          title: "Received",
          date: "September 10, 2025",
          completed: true,
          description: "Items confirmed as received."
        },
        {
          title: "Returned",
          date: "September 13, 2025",
          completed: true,
          description: "Item successfully returned."
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

  const isCompletedOrder = (order) => order.status?.toLowerCase() === 'completed';

  const hasStoredReview = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    try {
      return Boolean(window.localStorage.getItem('postRentalReview'));
    } catch (error) {
      console.warn('Unable to read stored review:', error);
      return false;
    }
  };

  const handleReviewNavigation = (order) => {
    const hasReview = hasStoredReview();
    const targetPath = hasReview ? '/review/completed' : '/review';
    navigate(targetPath, { state: { orderNumber: order.orderNumber } });
  };

  const handleOpenScheduleModal = (order, type) => {
    if (type === 'return' && !hasTimelineStepCompleted(order, 'received')) {
      return;
    }
    setScheduleOrderNumber(order.orderNumber);
    setScheduleModalType(type);
    setScheduleModalOpen(true);
  };

  const handleCloseScheduleModal = () => {
    setAutoPrompted((prev) => {
      if (!scheduleOrderNumber || !scheduleModalType) {
        return prev;
      }
      return {
        ...prev,
        [scheduleOrderNumber]: {
          ...(prev[scheduleOrderNumber] || {}),
          [scheduleModalType]: true,
        },
      };
    });
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

  useEffect(() => {
    if (!selectedOrder || scheduleModalOpen) {
      return;
    }

    const orderNumber = selectedOrder.orderNumber;
    const scheduleForOrder = scheduleByOrder[orderNumber] || {};
    const promptStatus = autoPrompted[orderNumber] || {};

    if (
      hasTimelineStepCompleted(selectedOrder, 'order placed') &&
      !scheduleForOrder.receive &&
      !promptStatus.receive
    ) {
      setAutoPrompted((prev) => ({
        ...prev,
        [orderNumber]: {
          ...(prev[orderNumber] || {}),
          receive: true,
        },
      }));
      setScheduleOrderNumber(orderNumber);
      setScheduleModalType('receive');
      setScheduleModalOpen(true);
      return;
    }

    if (
      hasTimelineStepCompleted(selectedOrder, 'received') &&
      !scheduleForOrder.return &&
      !promptStatus.return
    ) {
      setAutoPrompted((prev) => ({
        ...prev,
        [orderNumber]: {
          ...(prev[orderNumber] || {}),
          return: true,
        },
      }));
      setScheduleOrderNumber(orderNumber);
      setScheduleModalType('return');
      setScheduleModalOpen(true);
    }
  }, [selectedOrder, scheduleModalOpen, scheduleByOrder, autoPrompted]);

  if (selectedOrder) {
    const selectedIsCompleted = isCompletedOrder(selectedOrder);
    const selectedHasReceivedCompleted = hasTimelineStepCompleted(selectedOrder, 'received');

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
          canEditReturn={selectedHasReceivedCompleted}
        />
        {selectedIsCompleted && (
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white border border-indigo-100 rounded-2xl shadow-sm p-6 mb-10">
              <h2 className="text-xl font-semibold text-gray-800">Ready to review this order?</h2>
              <p className="text-gray-600 mt-2">
                Share your experience for order #{selectedOrder.orderNumber} to help fellow renters.
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => handleReviewNavigation(selectedOrder)}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Review Order
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
      <OrderList orders={orders} onViewDetails={handleViewDetails} />
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
