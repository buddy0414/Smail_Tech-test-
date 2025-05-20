import React from "react";
import PropTypes from "prop-types";

const RegisterForm = ({ onClose }) => {
  return (
    <div
      className="relative bg-white rounded-xl shadow-lg p-8 mx-2 min-w-[320px]"
      style={{ width: '30vw' }}
    >
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        onClick={onClose}
        aria-label="Close"
        type="button"
      >
        &times;
      </button>
      <h2 className="text-3xl font-light text-center mb-2">Join the community</h2>
      <div className="flex justify-center mb-2">
        <span className="text-3xl font-bold tracking-wider">trendies</span>
      </div>
      <p className="text-center text-gray-500 mb-6 text-sm">The ultimate destination for luxury resale in Morocco</p>
      <div className="flex justify-center gap-3 mb-4">
        <button className="flex items-center gap-2 border border-gray-300 rounded px-4 py-2 text-sm font-medium hover:bg-gray-100">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Sign in
        </button>
        <button className="flex items-center gap-2 border border-gray-300 rounded px-4 py-2 text-sm font-medium hover:bg-gray-100">
          <img src="https://www.svgrepo.com/show/475700/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
          Facebook
        </button>
      </div>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="mx-2 text-xs text-gray-400">Or continue with email</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">First name <span className="text-red-500">*</span></label>
          <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter your first name" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Name <span className="text-red-500">*</span></label>
          <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter your name" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pseudo <span className="text-red-500">*</span></label>
          <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter your username" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
          <input type="email" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password <span className="text-red-500">*</span></label>
          <input type="password" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Your password" />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2 accent-black" />
            Remember me
          </label>
          <a href="#" className="text-xs text-blue-600 hover:underline">Forgot your password?</a>
        </div>
        <button type="submit" className="w-full bg-black text-white font-bold py-3 rounded-full mt-2 text-lg hover:bg-gray-900 transition">JOIN THE PRIVILEGED CIRCLE</button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-6">Already have an account? <a href="#" className="text-blue-600 hover:underline">Log in</a></p>
    </div>
  );
};

RegisterForm.propTypes = {
  onClose: PropTypes.func,
};

export default RegisterForm;
