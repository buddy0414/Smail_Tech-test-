import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const signInWithGoogle = async (token) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('http://localhost:5000/api/auth/google', { token });
      setUser(response.data);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Google sign in error:', error);
      setError(error.response?.data?.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const signInWithFacebook = async (token) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('http://localhost:5000/api/auth/facebook', { token });
      setUser(response.data);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Facebook sign in error:', error);
      setError(error.response?.data?.message || 'Failed to sign in with Facebook');
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setShowSuccessDialog(false);
  };

  const value = {
    user,
    loading,
    error,
    showSuccessDialog,
    setShowSuccessDialog,
    signInWithGoogle,
    signInWithFacebook,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 