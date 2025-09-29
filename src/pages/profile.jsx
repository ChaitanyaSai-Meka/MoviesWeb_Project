import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { getUserData } from '../services/userService';
import '../css/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const data = await getUserData(user.uid);
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserData({ watchlist: [], favorites: [] });
        } finally {
          setIsLoading(false);
        }
      } else {
        setUserData({ watchlist: [], favorites: [] });
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="profile-container">
        <div className="profile-loading">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }


  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <h2>No user found</h2>
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
          <h1 className="profile-title">Profile</h1>
        </div>

        <div className="profile-content">
          <div className="profile-info">
            <div className="info-item">
              <label className="info-label">Display Name</label>
              <div className="info-value">{user.displayName || 'Not provided'}</div>
            </div>

            <div className="info-item">
              <label className="info-label">Email</label>
              <div className="info-value">{user.email}</div>
            </div>

            <div className="info-item">
              <label className="info-label">Watchlist Movies</label>
              <div className="info-value">{userData?.watchlist?.length || 0} movies</div>
            </div>

            <div className="info-item">
              <label className="info-label">Favorite Movies</label>
              <div className="info-value">{userData?.favorites?.length || 0} movies</div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="logout-btn" onClick={handleLogout}>
              <span className="logout-icon">🚪</span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;