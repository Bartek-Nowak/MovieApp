import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getMovieById} from '@/api/movieService';
import {Poster} from '@/components';
import type {MovieDetail} from '@/types/Movie';
import {StarIcon as StarSolid} from '@heroicons/react/24/solid';
import {StarIcon as StarOutline} from '@heroicons/react/24/outline';

export default function MovieDetail() {
  const {id} = useParams<{id: string}>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getMovieById(id);
        if (data.Response === 'True') {
          setMovie(data);

          const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
          setIsFavorite(
            favs.some((m: MovieDetail) => m.imdbID === data.imdbID)
          );
        } else {
          setError(data.Error || 'MovieDetail not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const toggleFavorite = () => {
    if (!movie) return;

    const favs: MovieDetail[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );

    if (isFavorite) {
      const updated = favs.filter((m) => m.imdbID !== movie.imdbID);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favs.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favs));
      setIsFavorite(true);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!movie) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <Poster
          src={movie.Poster}
          title={movie.Title}
          className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-3xl font-bold">{movie.Title}</h1>
            <button
              onClick={toggleFavorite}
              className="p-1 rounded-full hover:opacity-80"
              aria-label={
                isFavorite ? 'Remove from Favorites' : 'Add to Favorites'
              }
            >
              {isFavorite ? (
                <StarSolid className="w-6 h-6 text-yellow-400" />
              ) : (
                <StarOutline className="w-6 h-6 text-gray-400 dark:text-gray-200" />
              )}
            </button>
          </div>
          <p className="text-gray-500 mb-2">
            {movie.Year} | {movie.Type}
          </p>
          <p className="mb-2">Director: {movie.Director || 'N/A'}</p>
          <p className="mb-2">Actors: {movie.Actors || 'N/A'}</p>
          <p className="mb-2">Genre: {movie.Genre || 'N/A'}</p>
          <p className="mb-2">Runtime: {movie.Runtime || 'N/A'}</p>
          <p className="mt-4">{movie.Plot || 'No plot available.'}</p>
        </div>
      </div>
    </div>
  );
}
