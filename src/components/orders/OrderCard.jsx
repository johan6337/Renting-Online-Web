import React from 'react';

const OrderCard = ({ order, onViewDetails, onTrackOrder, onReportUser, isSeller = false, onConfirmPayment, onConfirmReceived, onInitiateReturn, onCompleteOrder }) => {
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'ordered':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'shipping':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'using':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'return':
        return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'completed':
        return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'active':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'returned':
        return 'bg-gray-50 text-gray-600 border-gray-200';
      case 'cancelled':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const orderNumber = order.orderNumber || order.id;
  const placedDate = order.placedDate;
  const otherPartyName = isSeller ? order.buyerName : order.sellerName;
  const otherPartyLabel = isSeller ? 'Placed by' : 'From';
  const status = order.status.toLowerCase();

  const renderActionButtons = () => {
    const buttons = [];

    if (isSeller) {
      // Seller view buttons
      if (status === 'ordered') {
        buttons.push(
          <button 
            key="confirm-payment"
            onClick={() => onConfirmPayment && onConfirmPayment(order)}
            className="px-6 py-2.5 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
          >
            Confirm Payment
          </button>
        );
      }
      
      if (status === 'return') {
        buttons.push(
          <button 
            key="complete-order"
            onClick={() => onCompleteOrder && onCompleteOrder(order)}
            className="px-6 py-2.5 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600 transition-colors"
          >
            Mark as Completed
          </button>
        );
      }
    } else {
      // User/Buyer view buttons
      if (status === 'shipping' && !order.receivingInfo) {
        buttons.push(
          <button 
            key="confirm-received"
            onClick={() => onConfirmReceived && onConfirmReceived(order)}
            className="px-6 py-2.5 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
          >
            Confirm Received
          </button>
        );
      }
      
      if (status === 'using') {
        buttons.push(
          <button 
            key="initiate-return"
            onClick={() => onInitiateReturn && onInitiateReturn(order)}
            className="px-6 py-2.5 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
          >
            Initiate Return
          </button>
        );
      }
    }

    // Common buttons for both
    if (['completed', 'returned'].includes(status)) {
      buttons.push(
        <button 
          key="report"
          onClick={() => onReportUser && onReportUser(order)}
          className="px-6 py-2.5 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
        >
          Report User
        </button>
      );
    }

    // Track Order button for sellers (replaces View Details)
    if (isSeller) {
      buttons.push(
        <button 
          key="track-order"
          onClick={() => onTrackOrder && onTrackOrder(order)}
          className="px-6 py-2.5 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
        >
          Track Order
        </button>
      );
    } else {
      // View Details / Track Order button for users
      buttons.push(
        <button 
          key="view-details"
          onClick={() => onViewDetails && onViewDetails(order)}
          className="px-6 py-2.5 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
        >
          {['shipping', 'using', 'return'].includes(status) ? 'Track Order' : 'View Details'}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow mb-6">
      {/* Order Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Order #{orderNumber}</h3>
          <p className="text-sm text-gray-500">
            {otherPartyLabel} {otherPartyName} • Placed on {placedDate}
          </p>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusStyles(order.status)}`}>
          {order.status}
        </span>
      </div>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {order.items.map((item, index) => (
          <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={item.imageUrl || item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
              <p className="text-sm text-gray-500 mb-1">
                Size: {item.size} • Color: {item.color}
              </p>
              <p className="text-sm text-gray-600">Rental Period: {item.rentalPeriod}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">${item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-500 mb-1">Total Amount</p>
          <p className="text-2xl font-bold text-gray-900">${order.totalAmount}</p>
        </div>
        <div className="flex gap-3 flex-wrap justify-end">
          {renderActionButtons()}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;