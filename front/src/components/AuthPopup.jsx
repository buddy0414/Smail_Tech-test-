import React from 'react';
import PropTypes from 'prop-types';

const AuthPopup = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className={`relative ${bgColor} border ${borderColor} rounded-lg p-6 max-w-sm mx-4 z-10`}>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="text-center">
          <h3 className={`text-lg font-medium ${textColor} mb-2`}>
            {type === 'success' ? 'Success!' : 'Error'}
          </h3>
          <p className={textColor}>{message}</p>
        </div>
      </div>
    </div>
  );
};

AuthPopup.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AuthPopup; 