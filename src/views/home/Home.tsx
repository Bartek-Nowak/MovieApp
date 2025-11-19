import {useState, useEffect, useRef, useCallback} from 'react';
import {useMovieContext} from '@/context/MovieContext';
import {MovieSearchForm} from '@/components';
import MovieGrid from '@/components/MovieGrid';
import {searchMovies as apiSearchMovies} from '@/api/movieService';
import {useGlobalUI} from '@/context/GlobalUIContext';

export default function Home() {
  const {results, setResults, query, setQuery} = useMovieContext();
  const {setLoading, setError} = useGlobalUI();

  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  const fetchMovies = useCallback(
    async (q: string, y?: string, t?: string, reset = false) => {
      if (!q || isFetchingRef.current) return;
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const nextPage = reset ? 1 : page;
        const params: Record<string, string> = {};
        if (y) params.y = y;
        if (t) params.type = t;

        const data = await apiSearchMovies(q, params, nextPage);

        if (data.Search?.length) {
          setResults((prev) =>
            reset ? data.Search : [...prev, ...data.Search]
          );
          setPage(nextPage + 1);

          const totalPages = Math.ceil(Number(data.totalResults) / 10);
          setHasMore(nextPage < totalPages);
        } else {
          if (reset) setResults([]);
          setHasMore(false);
          if (data.Error) setError(data.Error);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load movies.');
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    },
    [page, setResults, setLoading, setError]
  );

  const handleSearch = (searchQuery: string, y?: string, t?: string) => {
    setQuery(searchQuery);
    setYear(y || '');
    setType(t || '');
    setPage(1);
    setHasMore(true);
    fetchMovies(searchQuery, y, t, true);
  };

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingRef.current) {
          fetchMovies(query, year, type);
        }
      },
      {rootMargin: '200px'}
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [query, year, type, hasMore, fetchMovies]);

  return (
    <>
      <head>
        <title>{query ? `MovieApp - ${query}` : 'MovieApp'}</title>
      </head>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-slate-900 dark:text-slate-100">
          Movie Search
        </h1>

        <section aria-labelledby="movie-search-form" className="mb-4">
          <h2 id="movie-search-form" className="sr-only">
            Search Movies
          </h2>
          <MovieSearchForm onResults={handleSearch} />
        </section>

        {results.length > 0 && (
          <section
            aria-live="polite"
            aria-label="Search results"
            className="mt-6"
          >
            <MovieGrid />
            <div ref={observerRef} />
          </section>
        )}
      </main>
    </>
  );
}
