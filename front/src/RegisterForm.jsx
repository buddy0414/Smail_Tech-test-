import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from './context/AuthContext';
import AuthPopup from './components/AuthPopup';
import LoggedInView from './components/LoggedInView';

const RegisterForm = ({ onClose }) => {
  const { user, handleGoogleSuccess, handleFacebookLogin, loading, error, logout } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('success');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    // Load Facebook SDK
    const loadFacebookSDK = () => {
      window.fbAsyncInit = function() {
        FB.init({
          appId: process.env.REACT_APP_FACEBOOK_APP_ID,
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    };

    loadFacebookSDK();
  }, []);

  const handleFacebookClick = () => {
    FB.login((response) => {
      if (response.authResponse) {
        handleFacebookLogin(response);
      }
    }, { scope: 'email,public_profile' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
  };

  useEffect(() => {
    if (user) {
      setPopupMessage('Successfully logged in!');
      setPopupType('success');
      setShowPopup(true);
    }
  }, [user]);

  const handleGoogleSuccessWrapper = async (credentialResponse) => {
    try {
      await handleGoogleSuccess(credentialResponse);
    } catch (error) {
      setPopupMessage(error.message || 'Failed to login with Google');
      setPopupType('error');
      setShowPopup(true);
    }
  };

  if (user) {
    return <LoggedInView user={user} onSignOut={logout} />;
  }

  return (
    <>
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
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-center gap-3 mb-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccessWrapper}
            onError={() => {
              setPopupMessage('Google Login Failed');
              setPopupType('error');
              setShowPopup(true);
            }}
            useOneTap
            theme="outline"
            shape="rectangular"
            text="signin_with"
            size="large"
          />
          <button 
            onClick={handleFacebookClick}
            className="flex items-center gap-2 border border-gray-300 rounded px-4 py-2 text-sm font-medium hover:bg-gray-100"
            disabled={loading}
          >
            <img src="https://www.svgrepo.com/show/10580/facebook.svg" alt="Facebook" className="w-5 h-5" />
            Facebook
          </button>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-2 text-xs text-gray-400">Or continue with email</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">First name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" 
              placeholder="Enter your first name" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" 
              placeholder="Enter your last name" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Username <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" 
              placeholder="Enter your username" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" 
              placeholder="you@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password <span className="text-red-500">*</span></label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" 
              placeholder="Your password" 
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2 accent-black" />
              Remember me
            </label>
            <a href="#" className="text-xs text-blue-600 hover:underline">Forgot your password?</a>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white font-bold py-3 rounded-full mt-2 text-lg hover:bg-gray-900 transition disabled:bg-gray-400"
          >
            {loading ? 'Loading...' : 'JOIN THE PRIVILEGED CIRCLE'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <a href="#" className="text-blue-600 hover:underline">Log in</a>
        </p>
      </div>

      {showPopup && (
        <AuthPopup
          message={popupMessage}
          type={popupType}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

RegisterForm.propTypes = {
  onClose: PropTypes.func,
};

export default RegisterForm;
