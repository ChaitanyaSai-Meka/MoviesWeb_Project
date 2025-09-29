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
    // favorites stores an array of movie titles
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
                    setFavorites(userData.favorites || []); // titles
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
            setFavorites(prev => prev.includes(movie.title) ? prev : [...prev, movie.title]);
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    const removeFromFavorites = async (movieTitle) => {
        if (!user) {
            console.error('User not authenticated');
            return;
        }

        try {
            await removeFromFavoritesDB(user.uid, movieTitle);
            setFavorites(prev => prev.filter(title => title !== movieTitle));
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    const isFavoriteTitle = (movieTitle) => {
        return favorites.includes(movieTitle);
    };

    const value = {
        favorites, // array of titles
        addToFavorites,
        removeFromFavorites,
        isFavoriteTitle,
        user,
        loading
    };
    
    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};

