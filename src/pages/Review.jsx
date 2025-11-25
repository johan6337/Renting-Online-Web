import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { createReview, getReviewByOrder, updateReview } from '../api/reviews';

const DEFAULT_EXPERIENCE_STATE = {
  fit: false,
  quality: false,
  easeOfUse: false,
  style: false,
  worthThePrice: false,
};

const SATISFACTION_OPTIONS = [
  { id: 'loved-it', emoji: '\u{1F60D}', label: 'Loved it' },
  { id: 'liked-it', emoji: '\u{1F642}', label: 'Liked it' },
  { id: 'it-was-okay', emoji: '\u{1F610}', label: 'It was okay' },
  { id: 'not-great', emoji: '\u{1F641}', label: 'Not great' },
  { id: 'terrible', emoji: '\u{1F62D}', label: 'Terrible' },
];

const EXPERIENCE_HIGHLIGHTS = [
  { id: 'fit', label: 'Fit and sizing were just right' },
  { id: 'quality', label: 'Quality matched the listing' },
  { id: 'easeOfUse', label: 'Easy to use and care for' },
  { id: 'style', label: 'Felt confident wearing/using it' },
  { id: 'worthThePrice', label: 'Worth the rental price' },
];

export default function Review() {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId: productIdFromRoute } = useParams();

  const orderId = location.state?.orderId || null;
  const orderNumber = location.state?.orderNumber || null;
  const derivedProductId =
    productIdFromRoute ||
    location.state?.productId ||
    location.state?.product?.productId ||
    location.state?.product?.product_id ||
    null;
  const derivedProductName =
    location.state?.productName ||
    location.state?.product?.name ||
    'Selected Item';

  const [reviewId, setReviewId] = useState(null);
  const [productId, setProductId] = useState(derivedProductId);
  const [productName, setProductName] = useState(derivedProductName);
  const [satisfaction, setSatisfaction] = useState('');
  const [experience, setExperience] = useState({ ...DEFAULT_EXPERIENCE_STATE });
  const [highlights, setHighlights] = useState('');
  const [improvements, setImprovements] = useState('');
  const [photos, setPhotos] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [isLoadingExisting, setIsLoadingExisting] = useState(false);
  const effectiveProductId = productIdFromRoute || productId || derivedProductId || null;

  const applyReviewToForm = useCallback(
    (data) => {
      if (!data) {
        return;
      }

      setReviewId(data.id || data.reviewId || null);
      setProductId(data.productId ?? derivedProductId ?? null);
      setProductName(data.productName ?? derivedProductName);
      setSatisfaction(data.satisfaction || '');
      setExperience({
        ...DEFAULT_EXPERIENCE_STATE,
        ...(data.experience || {}),
      });
      setHighlights(data.highlights || '');
      setImprovements(data.improvements || '');
      setPhotos(
        Array.isArray(data.photos)
          ? data.photos.map((photo) =>
              typeof photo === 'string' ? { url: photo, persisted: true } : photo
            )
          : []
      );
    },
    [derivedProductId, derivedProductName]
  );

  useEffect(() => {
    if (!orderId && !orderNumber) {
      setLoadError('Order information is required to submit a review.');
      return;
    }

    let isCancelled = false;
    const hydrateReview = async () => {
      setIsLoadingExisting(true);
      setLoadError(null);
      try {
        // Use orderId or orderNumber, whichever is available
        const lookupKey = orderId || orderNumber;
        const existing = await getReviewByOrder(lookupKey);
        if (!isCancelled) {
          applyReviewToForm(existing);
        }
      } catch (error) {
        if (isCancelled) return;
        if (error?.name === 'ApiError' && error.status === 404) {
          setReviewId(null);
          setPhotos([]);
        } else {
          setLoadError(error?.message || 'Unable to load review details.');
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingExisting(false);
        }
      }
    };

    hydrateReview();
    return () => {
      isCancelled = true;
    };
  }, [orderId, orderNumber, applyReviewToForm]);

  const triggerSuccessBanner = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleExperienceToggle = (key) => {
    setExperience((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));

    if (imageFiles.length === 0) return;

    // Show preview immediately
    const previewPhotos = imageFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      uploading: true,
    }));
    setPhotos((prev) => [...prev, ...previewPhotos]);

    // Upload to S3
    try {
      const formData = new FormData();
      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch('/api/upload/images', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload images');
      }

      const result = await response.json();
      const uploadedUrls = result.data.map((img) => img.url);

      // Replace preview photos with uploaded URLs
      setPhotos((prev) => {
        const newPhotos = prev.filter((p) => !p.uploading);
        return [...newPhotos, ...uploadedUrls.map((url) => ({ url, persisted: true }))];
      });
    } catch (error) {
      console.error('Error uploading photos:', error);
      // Remove uploading photos on error
      setPhotos((prev) => prev.filter((p) => !p.uploading));
      setSubmitError('Failed to upload images. Please try again.');
    }
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const serializePhotos = () =>
    photos
      .filter((photo) => !photo.uploading) // Exclude photos still uploading
      .map((photo) => {
        if (typeof photo === 'string') {
          return photo;
        }
        if (photo?.url) {
          return photo.url;
        }
        return null;
      })
      .filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orderId && !orderNumber) {
      setSubmitError('Missing order information. Return to your orders and try again.');
      return;
    }

    if (!productId) {
      setSubmitError('Missing product information for this order.');
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    const payload = {
      satisfaction,
      experience,
      highlights,
      improvements,
      photos: serializePhotos(),
    };

    try {
      let savedReview;
      if (reviewId) {
        savedReview = await updateReview(reviewId, payload);
      } else {
        savedReview = await createReview({
          ...payload,
          productId,
          orderId: orderId || undefined,
          orderNumber: orderNumber || undefined,
        });
      }

      applyReviewToForm(savedReview);
      triggerSuccessBanner();
    } catch (error) {
      if (error?.details?.errors?.length) {
        setSubmitError(error.details.errors.join(' '));
      } else {
        setSubmitError(error?.message || 'Unable to save your feedback right now.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const cartItemCount = 3;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header cartItemCount={cartItemCount} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white shadow-sm rounded-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                Share Your Post-Rental Experience
              </h1>
              <p className="text-gray-600">
                Tell the community how this item worked for you so future renters know what to expect.
              </p>
            </div>
          </div>
        </div>

        {loadError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {loadError}
          </div>
        )}

        {isLoadingExisting && (
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            Loading your saved feedback...
          </div>
        )}

        {!orderId && !orderNumber && (
          <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
            Open this page directly from one of your completed orders so we know which rental you are reviewing.
          </div>
        )}

        {showSuccess && (
          <div className="fixed inset-x-0 top-6 flex justify-center px-4 z-50 pointer-events-none">
            <div className="pointer-events-auto max-w-md w-full bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-xl shadow-lg">
              <strong className="block text-lg font-semibold">Thanks for the love!</strong>
              <p className="mt-1 text-sm">Your feedback has been saved successfully.</p>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if ((!orderId && !orderNumber) || !effectiveProductId) {
                      return;
                    }
                    navigate('/review/completed', { state: { orderNumber, orderId } });
                  }}
                  disabled={(!orderId && !orderNumber)}
                  className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  View My Review
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow-sm rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-5 pb-5 border-b border-gray-100 mb-5">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{productName}</h2>
              <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-3">
                Share your honest review
              </span>
              <div className="flex flex-col md:flex-row gap-2 md:gap-8">
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Order ID:</span> {orderId || 'N/A'}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Order #:</span> {orderNumber || 'Not linked'}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Product ID:</span> {productId || 'Unknown'}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Status:</span>{' '}
                  {reviewId ? 'Submitted' : 'Draft'}
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Your thoughts help other renters decide if this item is right for them.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
            Tell Us About Your Rental
          </h3>

          {submitError && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-800 mb-3">
              Overall Satisfaction <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {SATISFACTION_OPTIONS.map((option) => (
                <div key={option.id}>
                  <input
                    type="radio"
                    id={option.id}
                    name="satisfaction"
                    value={option.id}
                    checked={satisfaction === option.id}
                    onChange={(e) => setSatisfaction(e.target.value)}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor={option.id}
                    className={`block p-4 border-2 rounded-lg text-center cursor-pointer transition-all ${
                      satisfaction === option.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="block text-3xl mb-2">{option.emoji}</span>
                    <span className="block text-sm font-medium text-gray-800">{option.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-800 mb-3">
              What stood out during your rental?
            </label>
            <div className="space-y-3">
              {EXPERIENCE_HIGHLIGHTS.map((item) => (
                <div key={item.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={experience[item.id]}
                    onChange={() => handleExperienceToggle(item.id)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor={item.id} className="ml-3 text-gray-800 cursor-pointer flex-1">
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="highlights" className="block text-sm font-medium text-gray-800 mb-2">
              What did you love most?
            </label>
            <textarea
              id="highlights"
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y min-h-[100px]"
              placeholder="Share what you enjoyed most about this rental or any standout features."
            />
          </div>

          <div className="mb-8">
            <label htmlFor="improvements" className="block text-sm font-medium text-gray-800 mb-2">
              Anything we could improve?
            </label>
            <textarea
              id="improvements"
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y min-h-[100px]"
              placeholder="Let the lender know if anything could have been better or if future renters should be aware of something."
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Share Photos from Your Rental (Optional)
            </label>
            <div
              onClick={() => document.getElementById('photoInput')?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-indigo-500 hover:bg-gray-50 transition-all"
            >
              <div className="text-2xl mb-3">Camera</div>
              <div className="text-gray-600 mb-2">Click to add photos showing the item or how you used it.</div>
              <div className="text-sm text-gray-400">PNG, JPG up to 5MB each. Images will be uploaded to cloud storage.</div>
            </div>
            <input
              type="file"
              id="photoInput"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
            />

            {photos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
                {photos.map((photo, index) => (
                  <div key={`${photo.url || photo}-${index}`} className="relative w-full h-32 rounded-lg overflow-hidden bg-gray-100">
                    <img src={photo.url || photo} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    {photo.uploading && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      disabled={photo.uploading}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={(!orderId && !orderNumber) || !productId || isSubmitting}
              className="px-8 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
