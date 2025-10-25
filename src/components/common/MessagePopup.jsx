import React from 'react';

const MessagePopup = ({ 
    isOpen, 
    onClose, 
    title, 
    message, 
    primaryButton, 
    secondaryButton,
    icon = 'success' // 'success', 'error', 'warning', 'info'
}) => {
    if (!isOpen) return null;

    const iconComponents = {
        success: (
            <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        error: (
            <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        warning: (
            <svg className="w-16 h-16 text-yellow-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        info: (
            <svg className="w-16 h-16 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 transform transition-all">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Icon */}
                <div className="mb-4">
                    {iconComponents[icon]}
                </div>

                {/* Title */}
                {title && (
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
                        {title}
                    </h3>
                )}

                {/* Message */}
                {message && (
                    <p className="text-gray-600 text-center mb-6">
                        {message}
                    </p>
                )}

                {/* Buttons */}
                <div className="flex gap-3">
                    {secondaryButton && (
                        <button
                            onClick={secondaryButton.onClick}
                            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                        >
                            {secondaryButton.label}
                        </button>
                    )}
                    {primaryButton && (
                        <button
                            onClick={primaryButton.onClick}
                            className="flex-1 px-4 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors"
                        >
                            {primaryButton.label}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagePopup;
