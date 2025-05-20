import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
});

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);

  // Check for existing token and verify it on mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Add token to axios headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Verify token with backend
          const response = await api.get('/api/auth/verify');
          if (response.data.user) {
            setUser(response.data.user);
          } else {
            // If verification fails, clear token
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
          }
        } catch (error) {
          console.error('Token verification error:', error);
          // If verification fails, clear token
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError(null);
      const { credential } = credentialResponse;
      
      // Send the credential to your backend
      const response = await api.post('/api/auth/google', { credential });

      if (response.data.user) {
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        // Add token to axios headers
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
    } catch (error) {
      console.error('Google login error:', error);
      if (error.code === 'ERR_NETWORK') {
        setError('Unable to connect to the server. Please make sure the backend is running.');
      } else {
        setError(error.response?.data?.message || 'Google login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async (response) => {
    try {
      setLoading(true);
      setError(null);
      
      // Send the Facebook response to your backend
      const result = await api.post('/api/auth/facebook', {
        accessToken: response.authResponse.accessToken
      });

      if (result.data.user) {
        setUser(result.data.user);
        localStorage.setItem('token', result.data.token);
        // Add token to axios headers
        api.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
      }
    } catch (error) {
      console.error('Facebook login error:', error);
      if (error.code === 'ERR_NETWORK') {
        setError('Unable to connect to the server. Please make sure the backend is running.');
      } else {
        setError(error.response?.data?.message || 'Facebook login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('token');
    // Remove token from axios headers
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      handleGoogleSuccess,
      handleFacebookLogin,
      signOut
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