import React from 'react';
import { X } from 'lucide-react';

const ReportDetailModal = ({ report, onClose }) => {
  if (!report) return null;

  const reportDetails = {
    'Harassment or Hate Speech': 'This report involves content or behavior that contains harassment, hate speech, threats, or discriminatory language targeting individuals or groups.',
    'Spam or Misleading Content': 'This report concerns unsolicited or repetitive content, fake information, scams, or misleading product descriptions designed to deceive users.',
    'Impersonation or Fake Account': 'This report involves an account pretending to be someone else, using stolen identity, or creating fake profiles to mislead other users.',
    'Intellectual Property Infringement': 'This report concerns unauthorized use of copyrighted content, trademarks, or other intellectual property without proper permission or licensing.',
    'Self-harm or Graphic Content': 'This report involves content that promotes self-harm, contains graphic violence, or displays disturbing imagery that violates community standards.',
    'Other': 'This report involves a violation that doesn\'t fit into the standard categories but still breaches community guidelines or terms of service.'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Report Details</h2>
            <p className="text-sm text-gray-600 mt-1">
              Report ID: #{report.id}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Report Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Reported User
              </label>
              <p className="text-gray-900 font-medium">{report.reportedUser}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Reporting User
              </label>
              <p className="text-gray-900 font-medium">{report.reportingUser}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Date Filed
              </label>
              <p className="text-gray-900 font-medium">{report.dateFiled}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Status
              </label>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                report.status === 'Pending' 
                  ? 'bg-yellow-100 text-yellow-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {report.status}
              </span>
            </div>
          </div>

          {/* Violation Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Violation Type
            </label>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-900 font-medium mb-2">{report.reason}</p>
              <p className="text-sm text-red-700">
                {reportDetails[report.reason] || 'No additional details available.'}
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Report Description
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                The reporting user has flagged this account for violating community guidelines. 
                Please review the violation type above and take appropriate action based on the 
                severity and context of the reported behavior.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
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

export default ReportDetailModal;
