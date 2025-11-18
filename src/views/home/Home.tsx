import {useMovieContext} from '@/context/MovieContext';
import {MovieSearchForm} from '@/components';
import MovieGrid from '@/components/MovieGrid';

export default function Home() {
  const {results, setResults, query, setQuery} = useMovieContext();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-slate-900 dark:text-slate-100">
        Search
      </h1>

      <section aria-labelledby="movie-search-form">
        <MovieSearchForm
          onResults={(movies) => {
            setResults(movies);
            setQuery(movies.length > 0 ? movies[0].Title ?? '' : '');
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
