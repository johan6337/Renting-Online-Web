import React, { useState } from 'react';
import { X } from 'lucide-react';

const ReportUserForm = ({ userName, onClose }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [details, setDetails] = useState('');
  const [attachments, setAttachments] = useState(null);

  const reasons = [
    'Harassment or Hate Speech',
    'Spam or Misleading Content',
    'Impersonation or Fake Account',
    'Intellectual Property Infringement',
    'Self-harm or Graphic Content',
    'Other'
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachments(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      userName,
      selectedReason,
      details,
      attachments
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Report User</h2>
            <p className="text-sm text-gray-600 mt-1">
              You are reporting <span className="font-semibold">{userName}</span> for violating our website's rule(s).
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Reason Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              What is the main reason for this report?
            </label>
            <div className="space-y-2">
              {reasons.map((reason) => (
                <label key={reason} className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-900">{reason}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Please provide more details
            </label>
            <p className="text-xs text-gray-600 mb-3">
              Specific examples or links to the content in question are very helpful for our review team.
            </p>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
              placeholder="Help us understand what's happening..."
            />
          </div>

          {/* Attachments */}
          {/* <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Add attachments (optional)
            </label>
            <p className="text-xs text-gray-600 mb-3">
              You can upload screenshots as evidence (max 5MB).
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
            />
            {attachments && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {attachments.name}
              </p>
            )}
          </div> */}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedReason}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportUserForm;