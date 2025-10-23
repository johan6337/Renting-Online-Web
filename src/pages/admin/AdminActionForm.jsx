import React, { useState } from 'react';
import { X } from 'lucide-react';

const AdminActionForm = ({ report, onClose }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [trustScoreDeduction, setTrustScoreDeduction] = useState('');
  const [restrictionDuration, setRestrictionDuration] = useState('');
  const [reasonForAction, setReasonForAction] = useState('');
  const [moderatorNotes, setModeratorNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      selectedAction,
      trustScoreDeduction,
      restrictionDuration,
      reasonForAction,
      moderatorNotes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Reported User Action</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Select Action */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Select Action
            </label>
            <div className="space-y-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="action"
                  value="warning"
                  checked={selectedAction === 'warning'}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-900">Official Warning</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="action"
                  value="restriction"
                  checked={selectedAction === 'restriction'}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-900">Account Restriction (e.g., mute, temporary ban)</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="action"
                  value="nothing"
                  checked={selectedAction === 'nothing'}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-900">Dismiss Report</span>
              </label>
            </div>
          </div>

          {/* Action Details - Only show if action is selected */}
          {selectedAction && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Action Details
              </label>
              <div className="space-y-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                {/* Trust Score Deduction - Hide if "nothing" is selected */}
                {selectedAction !== 'nothing' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Trust Score Deduction Amount (Points):
                    </label>
                    <input
                      type="number"
                      value={trustScoreDeduction}
                      onChange={(e) => setTrustScoreDeduction(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter points"
                    />
                  </div>
                )}

                {/* Restriction Duration - Only show if "restriction" is selected */}
                {selectedAction === 'restriction' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Restriction Duration (Days):
                    </label>
                    <input
                      type="number"
                      value={restrictionDuration}
                      onChange={(e) => setRestrictionDuration(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter days"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Reason for Action (User-facing):
                  </label>
                  <textarea
                    value={reasonForAction}
                    onChange={(e) => setReasonForAction(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Enter reason that will be shown to the user"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Internal Moderator Notes:
                  </label>
                  <textarea
                    value={moderatorNotes}
                    onChange={(e) => setModeratorNotes(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Enter internal notes for moderation team"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Mark as resolved
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminActionForm;