import {lazy, Suspense} from 'react';
import {useNavigate} from 'react-router-dom';
import {useMovieContext} from '@/context/MovieContext';
import type {Movie} from '@/types/Movie';

const MovieCard = lazy(() => import('@/components/MovieCard'));

export default function MovieGrid() {
  const navigate = useNavigate();
  const {results: movies} = useMovieContext();

  if (!movies || movies.length === 0) {
    return <p className="text-center text-slate-500 mt-8">No movies found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Suspense fallback={<div>Loading movies...</div>}>
        {movies.map((movie: Movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => navigate(`/media/${movie.imdbID}`)}
          />
        ))}
      </Suspense>
    </div>
  );
}
