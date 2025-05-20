import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import RegisterForm from "./RegisterForm";
import { AuthProvider, useAuth } from "./context/AuthContext";

const SuccessDialog = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 relative">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Sign In Successful!</h3>
        <p className="text-gray-600 mb-4">Welcome to the privileged circle.</p>
        <button
          className="bg-black text-white font-bold py-2 px-6 rounded-full text-lg hover:bg-gray-900 transition"
          onClick={onClose}
        >
          Continue
        </button>
      </div>
    </div>
  </div>
);

const ErrorDialog = ({ message, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 relative">
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Sign In Failed</h3>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
  </div>
);

const AppContent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user, signOut, error, loading } = useAuth();

  useEffect(() => {
    if (user) {
      setShowSuccessDialog(true);
      setShowModal(false);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setShowErrorDialog(true);
    }
  }, [error]);

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  const handleCloseErrorDialog = () => {
    setShowErrorDialog(false);
    setErrorMessage('');
  };

  const handleSignOut = () => {
    signOut();
    setShowSuccessDialog(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!user ? (
        <button
          className="bg-black text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-900 transition"
          onClick={() => setShowModal(true)}
        >
          JOIN THE PRIVILEGED CIRCLE
        </button>
      ) : (
        <div className="text-center">
          <div className="mb-4">
            <img
              src={user.picture}
              alt={user.firstName}
              className="w-20 h-20 rounded-full mx-auto mb-2"
            />
            <h2 className="text-xl font-semibold">
              Welcome, {user.firstName} {user.lastName}!
            </h2>
          </div>
          <button
            className="bg-red-600 text-white font-bold py-2 px-6 rounded-full text-lg hover:bg-red-700 transition"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative">
            <RegisterForm onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
      {showSuccessDialog && <SuccessDialog onClose={handleCloseSuccessDialog} />}
      {showErrorDialog && <ErrorDialog message={errorMessage} onClose={handleCloseErrorDialog} />}
    </div>
  );
};

const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App; 