import { useState, useMemo } from "react";
import type { Movie } from "@/types/Movie";
import { MovieCard } from "@/components";
import { MOVIE_TYPES } from "@/constants/movie";

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  const [yearFilter, setYearFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchYear = yearFilter ? movie.Year === yearFilter : true;
      const matchType = typeFilter ? movie.Type === typeFilter : true;
      return matchYear && matchType;
    });
  }, [movies, yearFilter, typeFilter]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Filter by year"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="w-32 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-32 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All types</option>
          {MOVIE_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {filteredMovies.length === 0 ? (
        <p className="text-center text-slate-500 mt-8">No movies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
