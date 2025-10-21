import React from 'react';
import Sidebar_Seller from '../../components/sidebar/Sidebar_Seller';
import { Bell } from 'lucide-react';

const SellerOrders = () => {
  const orders = [
    {
      id: "ORD-2025-0324",
      placedDate: "September 15, 2025",
      status: "Active",
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
        <main className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>
          
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            {['All Orders', 'Active', 'Completed', 'Returned'].map((tab) => (
              <button
                key={tab}
                className={`pb-3 px-4 font-medium transition-colors ${
                  tab === 'All Orders'
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">Placed on {order.placedDate}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    order.status === 'Active'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 pb-3 border-b border-gray-100 last:border-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          Size: {item.size} | Color: {item.color}
                        </p>
                        <p className="text-sm text-gray-600">Rental Period: {item.rentalPeriod}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">Total Amount:</p>
                    <p className="text-2xl font-bold text-gray-900">${order.totalAmount}</p>
                  </div>
                  <div className="flex gap-3">
                    {order.status === 'Active' && (
                      <button className="px-6 py-2.5 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors">
                        Track Order
                      </button>
                    )}
                    {order.status === 'Completed' && (
                      <>
                        <button className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                          Rent Again
                        </button>
                        <button className="px-6 py-2.5 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors">
                          View Details
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerOrders;
