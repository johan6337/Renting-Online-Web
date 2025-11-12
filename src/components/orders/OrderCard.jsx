import React from 'react';

const STATUS_STYLES = {
  ordered: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  shipping: 'bg-blue-50 text-blue-600 border-blue-200',
  using: 'bg-green-50 text-green-600 border-green-200',
  return: 'bg-orange-50 text-orange-600 border-orange-200',
  completed: 'bg-purple-50 text-purple-600 border-purple-200',
  returned: 'bg-gray-50 text-gray-600 border-gray-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
};

const OrderCard = ({
  order,
  onViewDetails,
  onTrackOrder,
  onReportUser,
  isSeller = false,
  onConfirmPayment,
  onConfirmReceived,
  onInitiateReturn,
  onCompleteOrder,
}) => {
  const orderId = order.orderId || order.id;
  const orderNumber = order.orderNumber || orderId;
  const statusKey = (order.status || 'ordered').toLowerCase();
  const statusClass = STATUS_STYLES[statusKey] || STATUS_STYLES.ordered;
  const placedDate = order.placedDate
    ? new Date(order.placedDate).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Pending';
  const buyerName = order.buyerName || 'You';
  const primaryItem = {
    productId: order.productId,
    name: order.productName,
    size: order.productSize,
    color: order.productColor,
    rentalPeriod: order.rentalPeriod,
    quantity: order.quantity,
    price: order.unitPrice,
    imageUrl: order.productImage,
  };
  const shippingAddress = order.shippingAddress;

  const shippingStep = order.timeline?.find(
    (step) => step.title?.toLowerCase() === 'shipping'
  );
  const shippingStatus = (() => {
    if (!shippingStep) return 'Awaiting shipment';
    if (shippingStep.completed) return 'Shipped';
    if (shippingStep.date && shippingStep.date !== 'Pending') {
      return `Ships on ${shippingStep.date}`;
    }
    return 'Preparing shipment';
  })();

  const renderActionButtons = () => {
    const buttons = [];

    if (isSeller) {
      if (statusKey === 'ordered') {
        buttons.push(
          <button
            key="confirm-payment"
            onClick={() => onConfirmPayment?.(order)}
            className="px-5 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
          >
            Confirm Payment
          </button>
        );
      }
      if (statusKey === 'return') {
        buttons.push(
          <button
            key="complete-order"
            onClick={() => onCompleteOrder?.(order)}
            className="px-5 py-2 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600 transition-colors"
          >
            Mark as Completed
          </button>
        );
      }
      buttons.push(
        <button
          key="track-order"
          onClick={() => onTrackOrder?.(order)}
          className="px-5 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
        >
          Track Order
        </button>
      );
    } else {
      if (statusKey === 'shipping' && !order.receivingInfo) {
        buttons.push(
          <button
            key="confirm-received"
            onClick={() => onConfirmReceived?.(order)}
            className="px-5 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
          >
            Confirm Received
          </button>
        );
      }
      if (statusKey === 'using') {
        buttons.push(
          <button
            key="initiate-return"
            onClick={() => onInitiateReturn?.(order)}
            className="px-5 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
          >
            Initiate Return
          </button>
        );
      }
      buttons.push(
        <button
          key="view-details"
          onClick={() => onViewDetails?.(order)}
          className="px-5 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
        >
          {['shipping', 'using', 'return'].includes(statusKey) ? 'Track Order' : 'View Details'}
        </button>
      );
    }

    if (['completed', 'returned'].includes(statusKey)) {
      buttons.push(
        <button
          key="report"
          onClick={() => onReportUser?.(order)}
          className="px-5 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
        >
          Report User
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow mb-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Order</p>
          <h3 className="text-2xl font-bold text-gray-900">#{orderNumber}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Placed on <span className="font-medium text-gray-800">{placedDate}</span>
          </p>
        </div>
        <div className="text-right">
          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${statusClass}`}>
            {order.status}
          </span>
          <p className="text-sm text-gray-500 mt-1">Total</p>
          <p className="text-xl font-bold text-gray-900">${order.totalAmount}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex gap-4">
          <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={primaryItem.imageUrl || primaryItem.image || '/placeholder.png'}
              alt={primaryItem.name || 'Product'}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Product</p>
            <h4 className="text-lg font-semibold text-gray-900">{primaryItem.name || 'Selected product'}</h4>
            <p className="text-sm text-gray-600 mt-1">
              Rental period:{' '}
              <span className="font-medium">{primaryItem.rentalPeriod || 'Not set'}</span>
            </p>
            <p className="text-sm text-gray-600">
              Quantity: <span className="font-medium">{primaryItem.quantity || 1}</span>
            </p>
            {(primaryItem.size || primaryItem.color) && (
              <p className="text-sm text-gray-500">
                {primaryItem.size && (
                  <>
                    Size: <span className="font-medium">{primaryItem.size}</span>
                  </>
                )}
                {primaryItem.size && primaryItem.color && ' · '}
                {primaryItem.color && (
                  <>
                    Color: <span className="font-medium">{primaryItem.color}</span>
                  </>
                )}
              </p>
            )}
          </div>
        </div>

        <div className="md:w-60 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Shipping</p>
          <p className="text-sm font-medium text-gray-800">{shippingStatus}</p>
          {shippingAddress ? (
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              {shippingAddress.name}
              <br />
              {shippingAddress.address}
              <br />
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-2">Shipping details not set</p>
          )}
          {order.receivingInfo && (
            <p className="text-xs text-gray-500 mt-2">
              Receiving on <span className="font-medium">{order.receivingInfo.date}</span>
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 flex-wrap gap-3">
        <p className="text-xs text-gray-500">Contact: {buyerName}</p>
        <div className="flex gap-3 flex-wrap justify-end">
          {renderActionButtons()}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
