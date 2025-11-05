import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import ProductDetails from './pages/ProductDetails';
import ReviewPage from './pages/Review';
import ReviewSummary from './pages/ReviewSummary';
import PaymentPage from './pages/PaymentPage';
import NotFoundPage from './pages/NotFoundPage';

// Seller Pages
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerProducts from './pages/seller/SellerProducts';
import SellerOrders from './pages/seller/SellerOrders';
import AddProductPage from './pages/seller/AddProductPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReports from './pages/admin/AdminReports';
import AdminViolations from './pages/admin/AdminViolations';

const App = () => {
  return (
    <Routes>
      {/* Home Page - Has its own Header and Footer */}
      <Route path="/" element={<HomePage />} />
      
      {/* Auth Pages - No Header/Footer */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      {/* Profile - Has its own layout */}
      <Route path="/profile" element={<ProfilePage />} />
      
      {/* Seller Dashboard Routes */}
      <Route path="/seller/dashboard" element={<SellerDashboard />} />
      <Route path="/seller/products" element={<SellerProducts />} />
      <Route path="/seller/orders" element={<SellerOrders />} />
      <Route path="/seller/add-product" element={<AddProductPage />} />
      <Route path="/seller/edit-product" element={<AddProductPage />} />
      
      {/* Admin Dashboard Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/reports" element={<AdminReports />} />
      <Route path="/admin/resolve-violations" element={<AdminViolations />} />

      {/* Legacy admin route - redirect to new dashboard */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/seller-dashboard" element={<SellerDashboard />} />
      
      {/* Cart - Has Header and Footer */}
      <Route path="/cart" element={<CartPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      
      {/* Product & Orders Pages - Has Header and Footer */}
      <Route path="/product" element={<ProductPage />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/review/completed" element={<ReviewSummary />} />
      
      {/* 404 Page - Catch all unmatched routes */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
