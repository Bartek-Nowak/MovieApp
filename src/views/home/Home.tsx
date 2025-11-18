import { useEffect } from 'react';
import { useMovieContext } from '@/context/MovieContext';
import { MovieSearchForm } from '@/components';
import MovieGrid from '@/components/MovieGrid';

export default function Home() {
  const { results, setResults, query, setQuery } = useMovieContext();

  useEffect(() => {
    document.title = query ? `${query} - Movie Search` : 'Movie Search';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        query
          ? `Search results for "${query}" in Movie App`
          : 'Search for movies in Movie App'
      );
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', query || 'movies, film, search');
    }
  }, [query]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-slate-900 dark:text-slate-100">
        Movie Search
      </h1>

      <section aria-labelledby="movie-search-form" className="mb-4">
        <h2 id="movie-search-form" className="sr-only">
          Search Movies
        </h2>
        <MovieSearchForm
          onResults={(movies: any[], searchQuery: string) => {
            setResults(movies);
            setQuery(searchQuery);
          }}
        />
      </section>

      {results.length > 0 && (
        <section
          aria-live="polite"
          aria-label="Search results"
          className="mt-6"
        >
          <MovieGrid initialMovies={results} query={query} />
        </section>
      )}
    </main>
  );
}
