import React from 'react';
import { useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

export default function PostInspectionReturn() {
  const cartItemCount = 3;
  const [satisfaction, setSatisfaction] = useState('');
  const [experience, setExperience] = useState({
    fit: false,
    quality: false,
    easeOfUse: false,
    style: false,
    worthThePrice: false
  });
  const [highlights, setHighlights] = useState('');
  const [improvements, setImprovements] = useState('');
  const [photos, setPhotos] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleExperienceToggle = (key) => {
    setExperience((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newPhotos = files
      .filter((file) => file.type.startsWith('image/'))
      .map((file) => ({
        file,
        url: URL.createObjectURL(file)
      }));

    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      satisfaction,
      experience,
      highlights,
      improvements,
      photosCount: photos.length
    };

    console.log('Post-Rental Feedback:', data);

    setShowSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setSatisfaction('');
      setExperience({
        fit: false,
        quality: false,
        easeOfUse: false,
        style: false,
        worthThePrice: false
      });
      setHighlights('');
      setImprovements('');
      setPhotos([]);

      setTimeout(() => setShowSuccess(false), 5000);
    }, 1000);
  };

  const satisfactionOptions = [
    { id: 'loved-it', emoji: '😍', label: 'Loved it' },
    { id: 'liked-it', emoji: '😊', label: 'Liked it' },
    { id: 'it-was-okay', emoji: '😐', label: 'It was okay' },
    { id: 'not-great', emoji: '😕', label: 'Not great' }
  ];

  const experienceHighlights = [
    { id: 'fit', label: 'Fit and sizing were just right' },
    { id: 'quality', label: 'Quality matched the listing' },
    { id: 'easeOfUse', label: 'Easy to use and care for' },
    { id: 'style', label: 'Felt confident wearing/using it' },
    { id: 'worthThePrice', label: 'Worth the rental price' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header cartItemCount={cartItemCount} />

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="bg-white shadow-sm rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Share Your Post-Rental Experience
          </h1>
          <p className="text-gray-600">
            Tell the community how this item worked for you so future renters know what to expect.
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-6 text-center">
            <strong>Thanks for the love!</strong> Your feedback has been saved.
          </div>
        )}

        {/* Rental Details */}
        <div className="bg-white shadow-sm rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-5 pb-5 border-b border-gray-100 mb-5">
            <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-5xl flex-shrink-0">
              👕
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Checkered Shirt</h2>
              <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-3">
                Share your honest review
              </span>
              <div className="flex flex-col md:flex-row gap-2 md:gap-8">
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Renter:</span> Sarah Johnson
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Rental Period:</span> 7 days
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Return Date:</span> Oct 1, 2025
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Your thoughts help other renters decide if this item is right for them.
          </p>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
            Tell Us About Your Rental
          </h3>

          {/* Overall Satisfaction */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-800 mb-3">
              Overall Satisfaction <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {satisfactionOptions.map((option) => (
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

          {/* Experience Highlights */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-800 mb-3">
              What stood out during your rental?
            </label>
            <div className="space-y-3">
              {experienceHighlights.map((item) => (
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

          {/* Highlights */}
          <div className="mb-8">
            <label htmlFor="highlights" className="block text-sm font-medium text-gray-800 mb-2">
              What did you love most?
            </label>
            <textarea
              id="highlights"
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y min-h-[100px]"
              placeholder="Share standout moments, compliments from friends, or anything you really enjoyed."
            />
          </div>

          {/* Improvements */}
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

          {/* Photo Upload */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Share Photos from Your Rental (Optional)
            </label>
            <div
              onClick={() => document.getElementById('photoInput')?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-indigo-500 hover:bg-gray-50 transition-all"
            >
              <div className="text-5xl mb-3">📷</div>
              <div className="text-gray-600 mb-2">Click to add photos showing how you styled or used the item.</div>
              <div className="text-sm text-gray-400">PNG, JPG up to 5MB each</div>
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
                  <div key={index} className="relative w-full h-32 rounded-lg overflow-hidden bg-gray-100">
                    <img src={photo.url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
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
              className="px-8 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}