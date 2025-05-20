import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError(null);
      const { credential } = credentialResponse;
      
      // Send the credential to your backend
      const response = await axios.post('http://localhost:5000/api/auth/google', {
        credential
      });

      if (response.data.user) {
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Google login failed');
      console.error('Google login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async (response) => {
    try {
      setLoading(true);
      setError(null);
      
      // Send the Facebook response to your backend
      const result = await axios.post('http://localhost:5000/api/auth/facebook', {
        accessToken: response.authResponse.accessToken
      });

      if (result.data.user) {
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
  };

  return (
    <AuthContext.Provider value={{
      user,
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