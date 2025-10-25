import React, { useState } from 'react';
import Sidebar_Admin from '../../components/sidebar/Sidebar_Admin';
import { Bell, Search, Filter } from 'lucide-react';
import AdminActionForm from './AdminActionForm';
import ReportDetailModal from './ReportDetailModal';
import ActionViewModal from './ActionViewModal';

const AdminReportedUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showActionForm, setShowActionForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showActionView, setShowActionView] = useState(false);

  const reportedUsers = [
    { 
      id: 1, 
      reportedUser: 'John Anderson', 
      reportingUser: 'Hugh Janus', 
      reason: 'Harassment or Hate Speech',
      dateFiled: 'Jan 15, 2025',
      status: 'Pending'
    },
    { 
      id: 2, 
      reportedUser: 'Soren Mitchell', 
      reportingUser: 'Sum Ting Wong', 
      reason: 'Spam or Misleading Content',
      dateFiled: 'Jan 14, 2025',
      status: 'Pending'
    },
    { 
      id: 3, 
      reportedUser: 'Michael Chen', 
      reportingUser: 'Nick Gurr', 
      reason: 'Impersonation or Fake Account',
      dateFiled: 'Jan 13, 2025',
      status: 'Resolved',
      action: {
        type: 'Account Restriction',
        trustScoreDeduction: 50,
        restrictionDuration: 7,
        reasonForAction: 'User was found to be impersonating another person, violating our community guidelines.',
        moderatorNotes: 'Verified with multiple reports. User account temporarily restricted.',
        resolvedDate: 'Jan 14, 2025',
        resolvedBy: 'Admin John'
      }
    },
    { 
      id: 4, 
      reportedUser: 'Emily Rodriguez', 
      reportingUser: 'Mike Hawk', 
      reason: 'Intellectual Property Infringement',
      dateFiled: 'Jan 12, 2025',
      status: 'Dismissed',
      action: {
        type: 'Dismiss Report',
        reasonForAction: 'After investigation, no evidence of intellectual property infringement was found.',
        moderatorNotes: 'Report appears to be unfounded. No action taken.',
        resolvedDate: 'Jan 13, 2025',
        resolvedBy: 'Admin Sarah'
      }
    },
    { 
      id: 5, 
      reportedUser: 'David Thompson', 
      reportingUser: 'Batu Khan', 
      reason: 'Self-harm or Graphic Content',
      dateFiled: 'Jan 11, 2025',
      status: 'Pending'
    },
    { 
      id: 6, 
      reportedUser: 'Lisa Parker', 
      reportingUser: 'Vin Diesel', 
      reason: 'Harassment or Hate Speech',
      dateFiled: 'Jan 10, 2025',
      status: 'Resolved',
      action: {
        type: 'Official Warning',
        trustScoreDeduction: 25,
        reasonForAction: 'User violated community standards by posting hateful content.',
        moderatorNotes: 'First offense. Official warning issued.',
        resolvedDate: 'Jan 11, 2025',
        resolvedBy: 'Admin Mike'
      }
    },
    { 
      id: 7, 
      reportedUser: 'Alex Johnson', 
      reportingUser: 'Ben Dover', 
      reason: 'Spam or Misleading Content',
      dateFiled: 'Jan 9, 2025',
      status: 'Dismissed',
      action: {
        type: 'Dismiss Report',
        reasonForAction: 'Content was verified to be legitimate and not spam.',
        moderatorNotes: 'False report. No violation found.',
        resolvedDate: 'Jan 10, 2025',
        resolvedBy: 'Admin Lisa'
      }
    },
  ];

  const filteredReports = reportedUsers.filter(report => {
    const matchesSearch = report.reportedUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.reportingUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleResolveClick = (report) => {
    setSelectedReport(report);
    setShowActionForm(true);
  };

  const handleViewActionClick = (report) => {
    setSelectedReport(report);
    setShowActionView(true);
  };

  const handleViewDetailClick = (report) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };

  const handleCloseForm = () => {
    setShowActionForm(false);
    setSelectedReport(null);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedReport(null);
  };

  const handleCloseActionView = () => {
    setShowActionView(false);
    setSelectedReport(null);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Resolved':
        return 'bg-green-100 text-green-700';
      case 'Dismissed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar_Admin active="Resolve Violations" />
      
      <div className="flex-1">
        {/* Main Content */}
        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Resolve Violations</h1>
          </div>

          <div className="mb-6 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-300 pl-12 pr-4 py-3 rounded-full text-sm placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-gray-300 pl-12 pr-8 py-3 rounded-full text-sm outline-none focus:ring-2 focus:ring-black/10 appearance-none cursor-pointer"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Resolved</option>
                <option>Dismissed</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Reported User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Reporting User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date Filed
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {report.reportedUser}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {report.reportingUser}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button 
                        onClick={() => handleViewDetailClick(report)}
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                      >
                        View details
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {report.dateFiled}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {report.status === 'Pending' ? (
                        <button 
                          onClick={() => handleResolveClick(report)}
                          className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition-colors"
                        >
                          Resolve
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleViewActionClick(report)}
                          className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition-colors"
                        >
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {showActionForm && (
        <AdminActionForm 
          report={selectedReport}
          onClose={handleCloseForm}
        />
      )}

      {showDetailModal && (
        <ReportDetailModal
          report={selectedReport}
          onClose={handleCloseDetailModal}
        />
      )}

      {showActionView && (
        <ActionViewModal
          report={selectedReport}
          onClose={handleCloseActionView}
        />
      )}
    </div>
  );
};

export default AdminReportedUsers;