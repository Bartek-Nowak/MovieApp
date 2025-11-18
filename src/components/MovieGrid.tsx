import {useState, useEffect, useRef, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import type {Movie} from '@/types/Movie';
import {MovieCard} from '@/components';
import {MOVIE_TYPES} from '@/constants/movie';
import {searchMovies as apiSearchMovies} from '@/api/movieService';

interface MovieGridProps {
  initialMovies: Movie[];
  query: string;
}

export default function MovieGrid({initialMovies, query}: MovieGridProps) {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [yearFilter, setYearFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false); // blokada podwójnych fetchy

  // Reset danych przy nowym query
  useEffect(() => {
    setMovies(initialMovies);
    setPage(1);
    setHasMore(true);
    isFetchingRef.current = false; // reset flagi
  }, [initialMovies, query]);

  const filteredMovies = movies.filter((movie) => {
    const matchYear = yearFilter ? movie.Year === yearFilter : true;
    const matchType = typeFilter ? movie.Type === typeFilter : true;
    return matchYear && matchType;
  });

  const loadMore = useCallback(async () => {
    if (!hasMore || loading || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const nextPage = page + 1;
      const data = await apiSearchMovies(query, {}, nextPage);

      if (data.Search?.length) {
        setMovies((prev) => [...prev, ...data.Search]);
        setPage(nextPage);
        const totalPages = Math.ceil(Number(data.totalResults) / 10);
        if (nextPage >= totalPages) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load more movies.');
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [hasMore, loading, page, query]);

  // IntersectionObserver do infinite scroll
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {rootMargin: '200px'}
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loadMore]);

  const handleCardClick = (id: string) => {
    navigate(`/media/${id}`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <label htmlFor="filter-year" className="sr-only">
          Filter by year
        </label>
        <input
          id="filter-year"
          type="text"
          placeholder="Filter by year"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="flex-1 sm:w-32 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
        />

        <label htmlFor="filter-type" className="sr-only">
          Filter by type
        </label>
        <select
          id="filter-type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="flex-1 sm:w-32 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
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
        <p
          className="text-center text-slate-500 mt-8"
          role="status"
          aria-live="polite"
        >
          No movies found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={() => handleCardClick(movie.imdbID)}
            />
          ))}
        </div>
      )}

      <div ref={observerRef} />

      {loading && (
        <p
          className="text-center text-slate-500 mt-4"
          role="status"
          aria-live="polite"
        >
          Loading more movies...
        </p>
      )}
      {error && (
        <p className="text-red-500 mt-2 text-center" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
