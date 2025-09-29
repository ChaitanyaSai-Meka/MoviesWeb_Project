import React, { useState, useEffect } from 'react';
import '../css/Favorites.css';
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from '../components/moviecard';


function Favorites() {
    const { user, loading, favorites } = useMovieContext(); 
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            if (user) {
                try {
                    if (favorites.length > 0) {
                        const moviePromises = favorites.map(async (movieName) => {
                            try {
                                const response = await fetch(
                                    `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(movieName)}`
                                );
                                const data = await response.json();
                                return data.results?.[0] || null;
                            } catch (error) {
                                console.error(`Error fetching movie: ${movieName}`, error);
                                return null;
                            }
                        });
                        const movies = await Promise.all(moviePromises);
                        setFavoriteMovies(movies.filter(Boolean));
                    } else {
                        setFavoriteMovies([]);
                    }
                } catch (error) {
                    console.error('Error fetching favorite movies:', error);
                    setFavoriteMovies([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setFavoriteMovies([]);
                setIsLoading(false);
            }
        };

        setIsLoading(true);
        fetchFavoriteMovies();
    }, [user, favorites]);

    if (loading || isLoading) {
        return (
            <div className="favorites">
                <h2>Your Favorites</h2>
                <div className="favorites-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading your favorite movies...</p>
                </div>
            </div>
        );
    }

    if (favoriteMovies.length > 0) {
        return (
            <div className="favorites">
                <h2>Your Favorites</h2>
                <div className="movies-grid">
                    {favoriteMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-empty">
            <h2>No Favorite Movies Yet</h2>
            <p>Start adding movies to your favorites and they will appear here!</p>
        </div>
    );
}

export default Favorites;