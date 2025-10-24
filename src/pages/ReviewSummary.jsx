import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const SAMPLE_REVIEW_SUMMARY = Object.freeze({
  orderNumber: 'ORD-2025-0298',
  satisfaction: 'loved-it',
  experience: {
    fit: true,
    quality: true,
    easeOfUse: false,
    style: true,
    worthThePrice: true
  },
  highlights: 'The rental arrived on time, felt premium, and turned heads at the event.',
  improvements: 'Add a quick care guide inside the box so first-time renters know the basics.',
  photosCount: 2
});

const satisfactionDetails = {
  'loved-it': { label: 'Loved it', emoji: '😍' },
  'liked-it': { label: 'Liked it', emoji: '😊' },
  'it-was-okay': { label: 'It was okay', emoji: '🙂' },
  'not-great': { label: 'Not great', emoji: '😕' }
};

const experienceHighlightLabels = {
  fit: 'Fit and sizing were just right',
  quality: 'Quality matched the listing',
  easeOfUse: 'Easy to use and care for',
  style: 'Felt confident wearing/using it',
  worthThePrice: 'Worth the rental price'
};

const defaultExperienceState = {
  fit: false,
  quality: false,
  easeOfUse: false,
  style: false,
  worthThePrice: false
};

const ReviewSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [review, setReview] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const raw = localStorage.getItem('postRentalReview');
      if (raw) {
        const parsed = JSON.parse(raw);
        setReview({
          ...parsed,
          orderNumber: parsed.orderNumber || location.state?.orderNumber || null,
          experience: {
            ...defaultExperienceState,
            ...(parsed.experience || {})
          }
        });
      } else {
        setReview(null);
      }
    } catch (error) {
      console.warn('Failed to load stored review:', error);
      setReview(null);
    }
  }, [location]);

  const orderNumber = location.state?.orderNumber || review?.orderNumber || null;

  const handleEditReview = () =>
    navigate('/review', { state: { allowEdit: true, orderNumber } });
  const handleWriteReview = () => navigate('/review', { state: { orderNumber } });
  const handleLoadSampleReview = () => {
    const sampleTimestamp = new Date().toISOString();
    const sampleOrderNumber = orderNumber || SAMPLE_REVIEW_SUMMARY.orderNumber || null;
    const sample = {
      ...SAMPLE_REVIEW_SUMMARY,
      experience: {
        ...defaultExperienceState,
        ...SAMPLE_REVIEW_SUMMARY.experience
      },
      orderNumber: sampleOrderNumber,
      submittedAt: sampleTimestamp
    };

    try {
      localStorage.setItem('postRentalReview', JSON.stringify(sample));
    } catch (error) {
      console.warn('Failed to persist sample review:', error);
    }

    setReview(sample);
  };

  const satisfactionDetail = review ? satisfactionDetails[review.satisfaction] : null;
  const selectedHighlights = review
    ? Object.entries(review.experience || {})
        .filter(([, isSelected]) => isSelected)
        .map(([key]) => experienceHighlightLabels[key])
        .filter(Boolean)
    : [];

  const submittedDate = review?.submittedAt
    ? new Date(review.submittedAt).toLocaleString()
    : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            &larr; Back
          </button>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">My Review</h1>
          <p className="text-gray-600">
            Review your recent feedback. You can jump back into edit mode at any time.
          </p>
        </div>

        {review ? (
          <div className="space-y-6">
            <section className="bg-white shadow-sm rounded-lg p-8">
              <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Post-Rental Feedback Summary
                  </h2>
                  <div className="text-sm text-gray-500 mt-1 space-y-1">
                    {orderNumber && <p>Order #{orderNumber}</p>}
                    {submittedDate && <p>Submitted on {submittedDate}</p>}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleEditReview}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Edit Review
                </button>
              </div>

              <div className="grid gap-6">
                <div className="border border-gray-100 rounded-lg p-6">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                    Overall Satisfaction
                  </h3>
                  {satisfactionDetail ? (
                    <div className="flex items-center gap-3">
                      <span className="text-3xl leading-none" role="img" aria-label={satisfactionDetail.label}>
                        {satisfactionDetail.emoji}
                      </span>
                      <span className="text-lg text-gray-900">{satisfactionDetail.label}</span>
                    </div>
                  ) : (
                    <p className="text-lg text-gray-900">No rating selected</p>
                  )}
                </div>

                <div className="border border-gray-100 rounded-lg p-6">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                    Highlights
                  </h3>
                  {selectedHighlights.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-800 space-y-1">
                      {selectedHighlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No specific highlights were selected.
                    </p>
                  )}
                </div>

                <div className="border border-gray-100 rounded-lg p-6">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                    What You Loved
                  </h3>
                  <p className="text-gray-800 whitespace-pre-line">
                    {review.highlights || 'No highlights shared.'}
                  </p>
                </div>

                <div className="border border-gray-100 rounded-lg p-6">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                    Improvements Suggested
                  </h3>
                  <p className="text-gray-800 whitespace-pre-line">
                    {review.improvements || 'No improvements suggested.'}
                  </p>
                </div>

                <div className="border border-gray-100 rounded-lg p-6">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                    Photos Shared
                  </h3>
                  <p className="text-gray-800">
                    {review.photosCount > 0
                      ? `You uploaded ${review.photosCount} photo${review.photosCount > 1 ? 's' : ''}.`
                      : 'No photos were uploaded with this review.'}
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white shadow-sm rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                What's Next?
              </h3>
              <p className="text-gray-600 mb-6">
                Keep exploring items to rent or revisit your orders. You can edit this review at any point.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/orders')}
                  className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  View My Orders
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/product')}
                  className="px-5 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
                >
                  Browse Products
                </button>
              </div>
            </section>
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-lg p-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              No review found yet{orderNumber ? ` for Order #${orderNumber}` : ''}
            </h2>
            <p className="text-gray-600 mb-6">
              Once you submit feedback{orderNumber ? ` for this order` : ''}, we'll save it here so you can review or update it later.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={handleWriteReview}
                className="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors"
              >
                Write a Review
              </button>
              <button
                type="button"
                onClick={handleLoadSampleReview}
                className="px-6 py-2 border border-indigo-200 text-indigo-600 rounded-full font-medium hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
              >
                Load Sample Review
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ReviewSummary;
