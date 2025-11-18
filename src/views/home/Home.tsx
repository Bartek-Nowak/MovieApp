import { useState } from "react";
import { MovieSearchForm } from "@/components";
import type { Movie } from "@/types/Movie";
import { MovieCard } from "@/components";

export default function Home() {
  const [results, setResults] = useState<Movie[]>([]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-slate-900 dark:text-slate-100">
        Movie Search
      </h1>

      <MovieSearchForm onResults={setResults} />

      {results.length === 0 ? (
        <p className="text-center text-slate-500 mt-8">No movies found.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
