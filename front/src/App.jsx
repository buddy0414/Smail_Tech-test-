import React, { useState } from "react";
import RegisterForm from "./RegisterForm";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
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
  );
};

export default App; 