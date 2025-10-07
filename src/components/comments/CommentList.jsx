import React, { useState } from 'react';
import CommentCard from './CommentCard';

const CommentList = ({ comments = [], totalReviews = 0 }) => {
  const [sortBy, setSortBy] = useState('latest');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-900">All Reviews</h2>
          <span className="text-gray-500">({totalReviews})</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Write a Review Button */}
          <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium">
            Write a Review
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {comments.map((comment, index) => (
          <CommentCard
            key={index}
            rating={comment.rating}
            name={comment.name}
            verified={comment.verified}
            comment={comment.comment}
            date={comment.date}
          />
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center">
        <button className="px-12 py-3 border-2 border-gray-200 rounded-full hover:bg-gray-50 transition-colors font-medium">
          Load More Reviews
        </button>
      </div>
    </div>
  );
};

export default CommentList;
