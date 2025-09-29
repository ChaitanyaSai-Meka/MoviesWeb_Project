import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { 
    addToFavorites as addToFavoritesDB, 
    removeFromFavorites as removeFromFavoritesDB,
    isInFavorites as isInFavoritesDB,
    getUserData 
} from "../services/userService";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (user) {
                try {
                    const userData = await getUserData(user.uid);
                    setFavorites(userData.favorites || []);
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                    setFavorites([]);
                }
            } else {
                setFavorites([]);
            }
        };

        fetchFavorites();
    }, [user]);

    const addToFavorites = async (movie) => {
        if (!user) {
            console.error('User not authenticated');
            return;
        }

        try {
            await addToFavoritesDB(user.uid, movie.title);
            setFavorites(prev => [...prev, movie]);
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    const removeFromFavorites = async (movieId) => {
        if (!user) {
            console.error('User not authenticated');
            return;
        }

        try {
            const movie = favorites.find(m => m.id === movieId);
            if (movie) {
                await removeFromFavoritesDB(user.uid, movie.title);
                setFavorites(prev => prev.filter(m => m.id !== movieId));
            }
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        user,
        loading
    };
    
    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};

