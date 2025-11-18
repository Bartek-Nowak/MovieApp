import type { Movie } from "@/types/Movie";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const poster = movie.Poster && movie.Poster !== "N/A"
    ? movie.Poster
    : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='900'><rect width='100%' height='100%' fill='%23e2e8f0'/><text x='50%' y='50%' font-size='24' text-anchor='middle' fill='%239ca3af' font-family='Arial' dy='.3em'>No poster</text></svg>";

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
      aria-label={`${movie.Title} (${movie.Year})`}
    >
      <div className="aspect-2/3 w-full bg-gray-100">
        <img
          src={poster}
          alt={`${movie.Title} poster`}
          className="w-full h-full object-cover"
          loading="lazy"
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
