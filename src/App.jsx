import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import Footer from './components/footer/Footer'

const App = ({ sampleComments, sampleOrders, sampleProducts }) => {
  const [currentPage, setCurrentPage] = useState('orders'); // Start with orders page

  return (
    <div className="bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-gray-900">BorrowIt</h1>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentPage('home')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 'home'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => setCurrentPage('orders')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 'orders'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  My Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div>
        {currentPage === 'home' && <HomePage comments={sampleComments} products={sampleProducts} />}
        {currentPage === 'orders' && <OrdersPage orders={sampleOrders} />}
      </div>
      <Footer />
    </div>
  );
};

export default App;
