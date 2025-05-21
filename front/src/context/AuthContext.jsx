import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing token and validate it on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify token with backend
          const response = await axios.get('http://localhost:5000/api/auth/verify', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.user) {
            setUser(response.data.user);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError(null);
      const { credential } = credentialResponse;
      
      const response = await axios.post('http://localhost:5000/api/auth/google', {
        credential
      });

      if (response.data.user && response.data.token) {
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Google login failed');
      console.error('Google login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async (response) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await axios.post('http://localhost:5000/api/auth/facebook', {
        accessToken: response.authResponse.accessToken
      });

      if (result.data.user && result.data.token) {
        setUser(result.data.user);
        localStorage.setItem('token', result.data.token);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Facebook login failed');
      console.error('Facebook login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    // Redirect to home page or first page
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      error,
      handleGoogleSuccess,
      handleFacebookLogin,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 