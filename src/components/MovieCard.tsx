import Poster from './Poster';
import type { Movie } from '@/types/Movie';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs: Movie[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favs.some((m) => m.imdbID === movie.imdbID));
  }, [movie.imdbID]);

  return (
    <article
      onClick={onClick}
      className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
      aria-label={`${movie.Title} (${movie.Year})`}
    >
      <div className="aspect-2/3 w-full bg-gray-100 relative">
        <Poster
          src={movie.Poster}
          title={movie.Title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white">
          {isFavorite ? (
            <StarSolid className="w-6 h-6 text-yellow-400" />
          ) : (
            <StarOutline className="w-6 h-6 text-gray-300" />
          )}
        </div>
      </div>
      <div className="mt-2 px-2 flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
          {movie.Title}
        </h3>
      </div>
      {movie.Year && (
        <p className="text-xs text-center text-slate-500 mt-1">{movie.Year}</p>
      )}
    </article>
  );
}
