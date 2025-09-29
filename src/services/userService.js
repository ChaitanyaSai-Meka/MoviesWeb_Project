import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const initializeUserData = async (user) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        watchlist: [],
        favorites: []
      };
      
      await setDoc(userRef, userData);
      console.log('User data initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing user data:', error);
    throw error;
  }
};

export const getUserData = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

export const addToWatchlist = async (uid, movieName) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      
      if (!userData.watchlist.includes(movieName)) {
        await updateDoc(userRef, {
          watchlist: arrayUnion(movieName)
        });
        console.log('Movie added to watchlist');
      } else {
        console.log('Movie already in watchlist');
      }
    }
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    throw error;
  }
};

export const removeFromWatchlist = async (uid, movieName) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      watchlist: arrayRemove(movieName)
    });
    console.log('Movie removed from watchlist');
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    throw error;
  }
};

export const addToFavorites = async (uid, movieName) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      
      if (!userData.favorites.includes(movieName)) {
        await updateDoc(userRef, {
          favorites: arrayUnion(movieName)
        });
        console.log('Movie added to favorites');
      } else {
        console.log('Movie already in favorites');
      }
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

export const removeFromFavorites = async (uid, movieName) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      favorites: arrayRemove(movieName)
    });
    console.log('Movie removed from favorites');
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

export const isInWatchlist = async (uid, movieName) => {
  try {
    const userData = await getUserData(uid);
    return userData.watchlist.includes(movieName);
  } catch (error) {
    console.error('Error checking watchlist:', error);
    return false;
  }
};

export const isInFavorites = async (uid, movieName) => {
  try {
    const userData = await getUserData(uid);
    return userData.favorites.includes(movieName);
  } catch (error) {
    console.error('Error checking favorites:', error);
    return false;
  }
};
