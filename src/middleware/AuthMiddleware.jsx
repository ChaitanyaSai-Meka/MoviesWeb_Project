import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaase/firebase';
import { initializeUserData } from '../services/userService';

const AuthMiddleware = ({ children, requireAuth = true }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Initialize user data in Firestore when user signs in
        try {
          await initializeUserData(currentUser);
        } catch (error) {
          console.error('Error initializing user data:', error);
        }
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px' 
      }}>
        Loading...
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/login_signup" replace />;
  }

  if (!requireAuth && user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthMiddleware;
