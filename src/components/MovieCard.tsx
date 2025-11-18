import Poster from './Poster';
import type {Movie} from '@/types/Movie';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export default function MovieCard({movie, onClick}: MovieCardProps) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
      aria-label={`${movie.Title} (${movie.Year})`}
    >
      <div className="aspect-2/3 w-full bg-gray-100">
        <Poster
          src={movie.Poster}
          title={movie.Title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-2 px-2">
        <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
          {movie.Title}
        </h3>
        {movie.Year && (
          <p className="text-xs text-slate-500 mt-1">{movie.Year}</p>
        )}
      </div>
    </article>
  );
}
