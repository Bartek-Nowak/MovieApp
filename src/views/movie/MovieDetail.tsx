import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getMovieById} from '@/api/movieService';
import type {MovieDetail} from '@/types/Movie';

export default function MovieDetail() {
  const {id} = useParams<{id: string}>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getMovieById(id);
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error || 'MovieDetail  not found.');
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

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!movie) return null;

  const poster =
    movie.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450"><rect width="100%" height="100%" fill="%23e2e8f0"/><text x="50%" y="50%" font-size="24" text-anchor="middle" fill="%239ca3af" font-family="Arial" dy=".3em">No poster</text></svg>';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={poster}
          alt={`${movie.Title} poster`}
          className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
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
