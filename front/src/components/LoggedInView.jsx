import React from 'react';
import PropTypes from 'prop-types';

const LoggedInView = ({ user, onSignOut }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="relative bg-white rounded-xl shadow-lg p-8 max-w-md mx-4 z-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
          <div className="mb-6">
            <img
              src={user.picture || 'https://via.placeholder.com/100'}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <p>Congratulations! You've successfully logged in.</p>
          </div>
          <button
            onClick={onSignOut}
            className="w-full bg-red-600 text-white font-bold py-3 rounded-full hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

LoggedInView.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
  onSignOut: PropTypes.func.isRequired,
};

export default LoggedInView; 