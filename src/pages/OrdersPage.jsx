import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import OrderList from '../components/orders/OrderList';
import ordersData from '../data/ordersData';
import { getOrders } from '../api/orders';

const resolveOrderId = (order, fallback = '') => {
  if (!order) return fallback;
  return (
    order.orderId ||
    order.orderNumber ||
    order.id ||
    fallback ||
    ''
  );
};

const normalizeOrderIdentity = (order, fallback) => {
  if (!order) return null;
  const resolvedId = resolveOrderId(order, fallback);
  const productId = order.productId ?? null;
  const unitPrice = typeof order.unitPrice === 'number' ? order.unitPrice : Number(order.subtotal ?? 0);

  return {
    ...order,
    orderId: resolvedId,
    orderNumber: order.orderNumber || resolvedId,
    productId,
    productName: order.productName ?? '',
    productImage: order.productImage ?? null,
    productSize: order.productSize ?? null,
    productColor: order.productColor ?? null,
    rentalPeriod: order.rentalPeriod ?? null,
    quantity: order.quantity ?? 1,
    unitPrice,
  };
};

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const fetched = await getOrders();
        if (!isMounted) {
          return;
        }
        const normalized = Array.isArray(fetched)
          ? fetched
              .map((order) => normalizeOrderIdentity(order))
              .filter(Boolean)
          : [];
        setOrders(normalized);
      } catch (error) {
        if (!isMounted) {
          return;
        }
        console.error('Failed to load orders:', error);
        setLoadError(error?.message || 'Unable to load your orders right now.');
        const fallback = JSON.parse(JSON.stringify(ordersData));
        const normalizedFallback = fallback
          .map((order) => normalizeOrderIdentity(order))
          .filter(Boolean);
        setOrders(normalizedFallback);
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

  const handleConfirmReceived = (order) => {
    const targetId = resolveOrderId(order);
    if (!targetId) {
      return;
    }
    setOrders(prevOrders =>
      prevOrders.map(o => {
        if (resolveOrderId(o) === targetId) {
          // Update timeline to mark "Received" and "Using" as completed
          const timeline = Array.isArray(o.timeline) ? o.timeline : [];
          const updatedTimeline = timeline.map(event => {
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
    const targetId = resolveOrderId(order);
    if (!targetId) {
      return;
    }
    setOrders(prevOrders =>
      prevOrders.map(o => {
        if (resolveOrderId(o) === targetId) {
          // Update timeline to mark "Returned" as completed
          const timeline = Array.isArray(o.timeline) ? o.timeline : [];
          const updatedTimeline = timeline.map(event => {
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
    const normalized = normalizeOrderIdentity(order);
    if (!normalized?.orderId) {
      return;
    }
    navigate(`/orders/${normalized.orderId}`, { state: { order: normalized } });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      {loadError && (
        <div className="max-w-6xl mx-auto px-4 mt-6">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700">
            {loadError}
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="max-w-6xl mx-auto px-4 mt-10">
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center text-gray-600">
            Loading your orders...
          </div>
        </div>
      ) : (
        <OrderList 
          orders={orders} 
          onViewDetails={handleViewDetails}
          onConfirmReceived={handleConfirmReceived}
          onInitiateReturn={handleInitiateReturn}
        />
      )}
      <Footer />
    </div>
  );
};

export default OrdersPage;
