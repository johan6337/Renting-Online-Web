import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Sidebar_Seller from '../../components/sidebar/Sidebar_Seller';
import OrderDetail from '../../components/orders/OrderDetail';
import { getSellerOrderByNumber } from '../../api/orders';

const SellerOrderDetail = () => {
  const { orderNumber } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const initialOrder = location.state?.order || null;
  const [order, setOrder] = useState(initialOrder);
  const [isLoading, setIsLoading] = useState(!initialOrder);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!orderNumber || initialOrder) {
      return;
    }

    let isMounted = true;
    const fetchOrder = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const fetched = await getSellerOrderByNumber(orderNumber);
        if (!isMounted) {
          return;
        }
        setOrder(fetched);
      } catch (error) {
        if (!isMounted) {
          return;
        }
        console.error('Failed to load seller order detail:', error);
        setLoadError(error?.message || 'Unable to load order details right now.');
        setOrder(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchOrder();
    return () => {
      isMounted = false;
    };
  }, [orderNumber, initialOrder]);

  const handleBack = () => {
    navigate('/seller/orders');
  };

  const renderContent = () => {
    if (!orderNumber) {
      return (
        <div className="p-8">
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 px-6 py-6 text-sm text-yellow-800">
            Order number is required to load details.
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="p-8">
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center text-gray-600">
            Loading order details...
          </div>
        </div>
      );
    }

    if (!order) {
      return (
        <div className="p-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-6 text-sm text-red-700">
            {loadError || `Order #${orderNumber} could not be found.`}
          </div>
          <button
            type="button"
            onClick={handleBack}
            className="mt-4 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Back to Orders
          </button>
        </div>
      );
    }

    return (
      <div className="p-8">
        <OrderDetail
          order={order}
          onBack={handleBack}
          onOpenReceiveSchedule={() => {}}
          onOpenReturnSchedule={() => {}}
          receiveDetails={order.receivingInfo || null}
          returnDetails={order.returnInfo || null}
          canEditReturn={false}
          isSellerView={true}
        />
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar_Seller active="Orders" />
      <div className="flex-1">
        {loadError && order && (
          <div className="mx-8 mt-6">
            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 px-6 py-3 text-sm text-yellow-800">
              {loadError}
            </div>
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default SellerOrderDetail;
