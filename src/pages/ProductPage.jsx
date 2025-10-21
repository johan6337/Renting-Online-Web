import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import CommentList from '../components/comments/CommentList';
import Filter from '../components/products/Filter';
import ProductList from '../components/product_list/ProductList';

const ProductPage = () => {
  const comments = [
    {
      rating: 4.5,
      name: "Samantha D.",
      verified: true,
      comment: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
      date: "August 14, 2023"
    },
    {
      rating: 4,
      name: "Alex M.",
      verified: true,
      comment: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
      date: "August 15, 2023"
    },
    {
      rating: 3.5,
      name: "Ethan R.",
      verified: true,
      comment: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
      date: "August 16, 2023"
    },
    {
      rating: 4,
      name: "Olivia P.",
      verified: true,
      comment: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
      date: "August 17, 2023"
    },
    {
      rating: 4,
      name: "Liam K.",
      verified: true,
      comment: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
      date: "August 18, 2023"
    },
    {
      rating: 4.5,
      name: "Ava H.",
      verified: true,
      comment: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
      date: "August 19, 2023"
    }
  ];

  const products = [
    {
      name: "Checkered Shirt",
      price: "$100",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
      sale: 20,
    },
    {
      name: "Denim Jacket",
      price: "$80",
      image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Wireless Headphones",
      price: "$120",
      image: "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Running Shoes",
      price: "$95",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Leather Wallet",
      price: "$40",
      image: "https://images.unsplash.com/photo-1657603644005-67891fcc1577?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
    },
    {
      name: "Smart Watch",
      price: "$199",
      image: "https://images.unsplash.com/photo-1664730021931-9abb25cb0852?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
    },
    {
      name: "Backpack",
      price: "$60",
      image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhY2twYWNrfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=700"
    },
    {
      name: "Sunglasses",
      price: "$75",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=700"
    },
    {
      name: "Gaming Mouse",
      price: "$49",
      image: "https://images.unsplash.com/photo-1628832306751-ec751454119c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1545"
    },
    {
      name: "Bluetooth Speaker",
      price: "$89",
      image: "https://images.unsplash.com/photo-1754142927775-8f1e97ebd030?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1374"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
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
      <Footer />
    </div>
  );
};

export default ProductPage;
