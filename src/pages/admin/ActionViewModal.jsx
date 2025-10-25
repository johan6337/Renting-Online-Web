import React from 'react';
import { X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const ActionViewModal = ({ report, onClose }) => {
  if (!report || !report.action) return null;

  const getActionIcon = () => {
    switch (report.status) {
      case 'Resolved':
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case 'Dismissed':
        return <XCircle className="h-12 w-12 text-gray-500" />;
      default:
        return <AlertCircle className="h-12 w-12 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (report.status) {
      case 'Resolved':
        return 'text-green-600';
      case 'Dismissed':
        return 'text-gray-600';
      default:
        return 'text-yellow-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Action Details</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Status Header */}
          <div className="flex flex-col items-center mb-8 pb-6 border-b border-gray-200">
            {getActionIcon()}
            <h3 className={`text-2xl font-bold mt-4 ${getStatusColor()}`}>
              {report.status}
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Resolved on {report.action.resolvedDate} by {report.action.resolvedBy}
            </p>
          </div>

          {/* Report Information */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Report Information</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Reported User</p>
                  <p className="text-sm text-gray-900 font-semibold">{report.reportedUser}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Reporting User</p>
                  <p className="text-sm text-gray-900 font-semibold">{report.reportingUser}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Reason</p>
                <p className="text-sm text-gray-900">{report.reason}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date Filed</p>
                <p className="text-sm text-gray-900">{report.dateFiled}</p>
              </div>
            </div>
          </div>

          {/* Action Taken */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Action Taken</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Action Type</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  report.status === 'Resolved' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {report.action.type}
                </span>
              </div>

              {report.action.trustScoreDeduction && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Trust Score Deduction</p>
                  <p className="text-lg font-bold text-red-600">-{report.action.trustScoreDeduction} points</p>
                </div>
              )}

              {report.action.restrictionDuration && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Restriction Duration</p>
                  <p className="text-lg font-bold text-orange-600">{report.action.restrictionDuration} days</p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Reason for Action (User-facing)</p>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-900">{report.action.reasonForAction}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Internal Moderator Notes</p>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-600 italic">{report.action.moderatorNotes}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionViewModal;