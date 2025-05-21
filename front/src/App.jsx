import React, { useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import RegisterForm from "./RegisterForm";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <button
            className="bg-black text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-900 transition"
            onClick={() => setShowModal(true)}
          >
            JOIN THE PRIVILEGED CIRCLE
          </button>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="relative">
                <RegisterForm onClose={() => setShowModal(false)} />
              </div>
            </div>
          )}
        </div>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App; 