import React from 'react';
import CommentList from '../components/comments/CommentList';
import Filter from '../components/products/Filter';
import ProductList from '../components/product_list/ProductList';

const HomePage = ({ comments = [], products = [] }) => {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">BorrowIt Demo</h1>
        
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

              <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
              <CommentList comments={comments} totalReviews={comments.length} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
