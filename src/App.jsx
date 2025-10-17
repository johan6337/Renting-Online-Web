import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import IntroPage from './pages/IntroPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Footer from './components/footer/Footer'

const App = ({ sampleComments, sampleOrders, sampleProducts }) => {
  // Start with intro page
  const [currentPage, setCurrentPage] = useState('intro'); 
  const introContent = {
    products: sampleProducts,
    comments: sampleComments
  }
  
  
  // Handle URL (pathname) changes
  useEffect(() => {
    const handlePathChange = () => {
      const pathname = window.location.pathname.substring(1);
      if (pathname) {
        setCurrentPage(pathname);
      } else {
        setCurrentPage('intro'); // Default to intro if no path
      }
    };

    window.addEventListener('popstate', handlePathChange);

    // Check initial path
    const initialPath = window.location.pathname.substring(1);
    if (initialPath) {
      setCurrentPage(initialPath);
    }

    return () => {
      window.removeEventListener('popstate', handlePathChange);
    };
  }, []);

  // Update URL pathname when page changes
  const changePage = (page) => {
    setCurrentPage(page);
    const newPath = `/${page}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
  };

  return (
    currentPage === "intro" ? <IntroPage content={introContent} onStart={() => changePage('home')} onLoginClick={() => changePage('login')} /> :
    currentPage === "login" ? <LoginPage onBack={() => changePage('home')} onLoginClick={() => changePage('login')} onSignUpClick={() => changePage('signup')} onForgotPasswordClick={() => changePage('forgot-password')} /> :
    currentPage === "signup" ? <SignUpPage onBack={() => changePage('home')} onLoginClick={() => changePage('login')} onSignUpClick={() => changePage('signup')} /> :
    currentPage === "forgot-password" ? <ForgotPasswordPage onBack={() => changePage('home')} onLoginClick={() => changePage('login')} /> :

    <div className="bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-gray-900 hover:cursor-pointer" onClick={() => changePage('intro')}>BorrowIt</h1>
              <div className="flex gap-1">
                <button
                  onClick={() => changePage('home')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 'home'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => changePage('orders')}
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
      <Footer onLoginClick={() => changePage('login')} />
    </div>
  );
};

export default App;
