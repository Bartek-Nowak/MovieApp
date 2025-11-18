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
          const favs: MovieDetail[] = JSON.parse(
            localStorage.getItem('favorites') || '[]'
          );
          setIsFavorite(favs.some((m) => m.imdbID === data.imdbID));
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

  useEffect(() => {
    if (!movie) return;
    document.title = `${movie.Title} - Movie App`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc)
      metaDesc.setAttribute('content', movie.Plot || 'Movie details');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.setAttribute('content', movie.Genre || '');
  }, [movie]);

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
    <main className="max-w-4xl mx-auto px-4 py-8">
      <section
        aria-labelledby="movie-title"
        className="flex flex-col md:flex-row gap-6"
      >
        <Poster
          src={movie.Poster}
          title={movie.Title}
          className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
        />
        <div className="flex-1">
          <header className="flex items-center gap-2 mb-4">
            <h1 id="movie-title" className="text-3xl font-bold">
              {movie.Title}
            </h1>
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
          </header>

          <dl className="text-gray-700 dark:text-gray-200">
            <div className="mb-2">
              <dt className="inline font-semibold">Year / Type:</dt>{' '}
              <dd className="inline text-gray-500">
                {movie.Year} | {movie.Type}
              </dd>
            </div>
            {movie.Director && (
              <div className="mb-2">
                <dt className="inline font-semibold">Director:</dt>{' '}
                <dd className="inline">{movie.Director}</dd>
              </div>
            )}
            {movie.Actors && (
              <div className="mb-2">
                <dt className="inline font-semibold">Actors:</dt>{' '}
                <dd className="inline">{movie.Actors}</dd>
              </div>
            )}
            {movie.Genre && (
              <div className="mb-2">
                <dt className="inline font-semibold">Genre:</dt>{' '}
                <dd className="inline">{movie.Genre}</dd>
              </div>
            )}
            {movie.Runtime && (
              <div className="mb-2">
                <dt className="inline font-semibold">Runtime:</dt>{' '}
                <dd className="inline">{movie.Runtime}</dd>
              </div>
            )}
          </dl>

          {movie.Plot && <p className="mt-4">{movie.Plot}</p>}
        </div>
      </section>
    </main>
  );
}
