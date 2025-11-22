import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar_Seller from '../../components/sidebar/Sidebar_Seller';
import { Bell } from 'lucide-react';
import OrderList from '../../components/orders/OrderList';
import ReportUserForm from '../../pages/ReportUserForm';
import MessagePopup from '../../components/common/MessagePopup';
import { getSellerOrders, updateSellerOrderStatus } from '../../api/orders';

const FALLBACK_SELLER_ORDERS = [
  {
    id: "ORD-2025-0324",
    placedDate: "September 15, 2025",
    status: "Ordered",
    buyerName: "John Anderson",
    sellerName: "Luxe Rentals Co.",
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
    sellerName: "Luxe Rentals Co.",
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
    sellerName: "Luxe Rentals Co.",
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
    sellerName: "Luxe Rentals Co.",
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
    status: "Checking",
    buyerName: "Michael Chen",
    sellerName: "Luxe Rentals Co.",
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
    sellerName: "Luxe Rentals Co.",
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
];

const SellerOrders = () => {
  const navigate = useNavigate();
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusUpdateError, setStatusUpdateError] = useState(null);
  const [statusUpdatingOrder, setStatusUpdatingOrder] = useState(null);

  const resolveOrderKey = (order) =>
    order?.orderNumber || order?.orderId || order?.id || null;

  const applyOrderUpdate = (updatedOrder) => {
    if (!updatedOrder) {
      return;
    }
    const targetKey = resolveOrderKey(updatedOrder);
    setOrders((prev) =>
      prev.map((order) =>
        resolveOrderKey(order) === targetKey ? updatedOrder : order
      )
    );
  };

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const fetched = await getSellerOrders();
        if (!isMounted) {
          return;
        }
        if (Array.isArray(fetched)) {
          setOrders(fetched); // Set orders even if empty array
        } else {
          setOrders([]); // Don't show dummy data
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }
        console.error('Failed to load seller orders:', error);
        setLoadError(error?.message || 'Unable to load seller orders right now.');
        setOrders([]); // Don't show dummy data on error
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleReportUser = (order) => {
    setSelectedOrder(order);
    setShowReportForm(true);
  };

  const handleConfirmPayment = (order) => {
    setSelectedOrder(order);
    setConfirmAction('payment');
    setShowConfirmModal(true);
  };

  const handleConfirmShipping = (order) => {
    setSelectedOrder(order);
    setConfirmAction('shipping');
    setShowConfirmModal(true);
  };

  const handleConfirmReturn = (order) => {
    setSelectedOrder(order);
    setConfirmAction('return');
    setShowConfirmModal(true);
  };

  const handleCompleteOrder = (order) => {
    setSelectedOrder(order);
    setConfirmAction('complete');
    setShowConfirmModal(true);
  };

  const handleTrackOrder = (order) => {
    const targetKey = resolveOrderKey(order);
    if (!targetKey) {
      return;
    }
    navigate(`/seller/orders/${encodeURIComponent(targetKey)}`, {
      state: { order },
    });
  };

  const handleConfirm = async () => {
    if (!selectedOrder || !confirmAction || isUpdatingStatus) {
      return;
    }

    const targetNumber =
      selectedOrder.orderNumber || selectedOrder.orderId || selectedOrder.id;

    if (!targetNumber) {
      return;
    }

    const currentStatus = (selectedOrder.status || '').toLowerCase();
    let nextStatus = null;

    switch (confirmAction) {
      case 'payment':
        nextStatus = 'shipping';
        break;
      case 'shipping':
        nextStatus = 'using';
        break;
      case 'return':
        nextStatus = 'return';
        break;
      case 'complete':
        nextStatus = currentStatus === 'checking' ? 'completed' : 'checking';
        break;
      default:
        nextStatus = null;
    }

    if (!nextStatus) {
      return;
    }

    try {
      setStatusUpdateError(null);
      setIsUpdatingStatus(true);
      setStatusUpdatingOrder(resolveOrderKey(selectedOrder));
      const updatedOrder = await updateSellerOrderStatus(targetNumber, {
        status: nextStatus,
      });
      applyOrderUpdate(updatedOrder);
      setShowConfirmModal(false);
      setSelectedOrder(null);
      setConfirmAction(null);
    } catch (error) {
      console.error('Unable to update order status:', error);
      setStatusUpdateError(error?.message || 'Unable to update order status.');
    } finally {
      setIsUpdatingStatus(false);
      setStatusUpdatingOrder(null);
    }
  };

  const getConfirmMessage = () => {
    const reference = selectedOrder?.orderNumber || selectedOrder?.id || 'order';
    if (confirmAction === 'payment') {
      return {
        title: 'Confirm Payment',
        message: `Are you sure you want to confirm payment for order #${reference}? This will move the order to Shipping status.`
      };
    } else if (confirmAction === 'shipping') {
      return {
        title: 'Confirm Shipping',
        message: `Have you shipped order #${reference}? Confirming will move the order to Using status.`
      };
    } else if (confirmAction === 'return') {
      return {
        title: 'Confirm Return',
        message: `Has the customer returned order #${reference}? Confirming updates the order to Return status.`
      };
    } else if (confirmAction === 'complete') {
      const currentStatus = (selectedOrder?.status || '').toLowerCase();
      if (currentStatus === 'checking') {
        return {
          title: 'Complete Order',
          message: `Finalize order #${reference}? This will mark the inspection as finished and close the order.`
        };
      }
      return {
        title: 'Start Checking',
        message: `Begin the inspection process for order #${reference}? This will move the order into Checking status.`
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
          {loadError && (
            <div className="mx-8 mt-6">
              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 px-6 py-3 text-sm text-yellow-800">
                {loadError}
              </div>
            </div>
          )}
          {statusUpdateError && (
            <div className="mx-8 mt-4">
              <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-3 text-sm text-red-700">
                {statusUpdateError}
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="p-8">
              <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center text-gray-600">
                Loading seller orders...
              </div>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-8">
              <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">No orders yet</h3>
                <p className="mt-1 text-sm text-gray-500">Orders from customers will appear here.</p>
              </div>
            </div>
          ) : (
            <OrderList 
              orders={orders} 
              isSeller={true}
              onTrackOrder={handleTrackOrder}
              onReportUser={handleReportUser}
              onConfirmPayment={handleConfirmPayment}
              onConfirmShipping={handleConfirmShipping}
              onConfirmReturn={handleConfirmReturn}
              onCompleteOrder={handleCompleteOrder}
              statusUpdateOrderKey={statusUpdatingOrder}
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
            label: isUpdatingStatus ? 'Updating...' : 'Confirm',
            onClick: isUpdatingStatus ? undefined : handleConfirm
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
