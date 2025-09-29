import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContext'

function MovieCard({movie}) {
    const {isFavoriteTitle, addToFavorites, removeFromFavorites, user} = useMovieContext()
    const favorite = isFavoriteTitle(movie.title)

    async function onFavoriteClick(e) {
        e.preventDefault()
        if (!user) {
            console.error('User not authenticated');
            return;
        }
        
        if (favorite) {
            await removeFromFavorites(movie.title)
        } else {
            await addToFavorites(movie)
        }
    }

    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick} aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}>
                    <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path 
                            d="M12.001 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.59 4.81 14.26 4 16 4 18.5 4 20.5 6 20.5 8.5c0 3.78-3.4 6.86-8.05 11.54l-1.449 1.31z"
                            stroke="#ffffff"
                            stroke-width="1.5"
                            fill={favorite ? '#ffffff' : '#000000'}
                        />
                    </svg>
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
}

export default MovieCard