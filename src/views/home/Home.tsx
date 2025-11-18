import { useState } from "react";
import { MovieSearchForm, MovieGrid } from "@/components";
import type { Movie } from "@/types/Movie";

export default function Home() {
  const [results, setResults] = useState<Movie[]>([]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-slate-900 dark:text-slate-100">
        Movie Search
      </h1>

      <MovieSearchForm onResults={setResults} />

      <MovieGrid movies={results} />
    </div>
  );
}
