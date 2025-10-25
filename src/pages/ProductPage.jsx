import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import CommentList from '../components/comments/CommentList';
import Filter from '../components/products/Filter';
import ProductList from '../components/product_list/ProductList';

const ProductPage = () => {
  const products = [
        {
            id: 1,
            name: "Checkered Shirt",
            price: 100,
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
            sale: 20,
        },
        {
            id: 2,
            name: "Denim Jacket",
            price: 80,
            image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=400&q=80",
        },
        {
            id: 3,
            name: "Wireless Headphones",
            price: 120,
            image: "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=400&q=80",
        },
        {
            id: 4,
            name: "Running Shoes",
            price: 95,
            image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80",
        },
        {
            id: 5,
            name: "Leather Wallet",
            price: 40,
            image: "https://images.unsplash.com/photo-1657603644005-67891fcc1577?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
        },
        {
            id: 6,
            name: "Smart Watch",
            price: 199,
            image: "https://images.unsplash.com/photo-1664730021931-9abb25cb0852?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
        },
        {
            id: 7,
            name: "Backpack",
            price: 60,
            image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhY2twYWNrfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=700"
        },
        {
            id: 8,
            name: "Sunglasses",
            price: 75,
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=700"
        },
        {
            id: 9,
            name: "Gaming Mouse",
            price: 49,
            image: "https://images.unsplash.com/photo-1628832306751-ec751454119c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1545"
        },
        {
            id: 10,
            name: "Bluetooth Speaker",
            price: 89,
            image: "https://images.unsplash.com/photo-1754142927775-8f1e97ebd030?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1374"
        },
        {
            id: 11,
            name: "Checkered Shirt",
            price: 100,
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
            sale: 20,
        },
        {
            id: 12,
            name: "Denim Jacket",
            price: 80,
            image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=400&q=80",
        },
        {
            id: 13,
            name: "Wireless Headphones",
            price: 120,
            image: "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=400&q=80",
        },
        {
            id: 14,
            name: "Running Shoes",
            price: 95,
            image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80",
        },
        {
            id: 15,
            name: "Leather Wallet",
            price: 40,
            image: "https://images.unsplash.com/photo-1657603644005-67891fcc1577?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
        },
        {
            id: 16,
            name: "Smart Watch",
            price: 199,
            image: "https://images.unsplash.com/photo-1664730021931-9abb25cb0852?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
        },
        {
            id: 17,
            name: "Backpack",
            price: 60,
            image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhY2twYWNrfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=700"
        },
        {
            id: 18,
            name: "Sunglasses",
            price: 75,
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=700"
        },
        {
            id: 19,
            name: "Gaming Mouse",
            price: 49,
            image: "https://images.unsplash.com/photo-1628832306751-ec751454119c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1545"
        },
        {
            id: 20,
            name: "Bluetooth Speaker",
            price: 89,
            image: "https://images.unsplash.com/photo-1754142927775-8f1e97ebd030?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1374"
        }
    ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* <h1 className="text-3xl font-bold text-gray-900 mb-8">BorrowIt Demo</h1> */}
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <Filter 
                onFilterChange={(filters) => {
                  console.log('Filters changed:', filters);
                }}
              />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-6">Products</h2>
                <ProductList View="vertical" Products={products} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
