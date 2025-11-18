import type {FormEvent} from 'react';
import {searchMovies as apiSearchMovies} from '@/api/movieService';
import {useGlobalUI} from '@/context/GlobalUIContext';
import {useMovieContext} from '@/context/MovieContext';
import type {MovieSearchFormProps} from '@/types/Movie';

export default function MovieSearchForm({onResults}: MovieSearchFormProps) {
  const {setLoading, setError} = useGlobalUI();
  const {query, setQuery, setResults} = useMovieContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setLoading(true);
    setError(null);

    try {
      const data = await apiSearchMovies(trimmedQuery);

      if (data.Search) {
        setResults(data.Search);
        onResults(data.Search, trimmedQuery);
      } else {
        setResults([]);
        onResults([], trimmedQuery);
        setError(data.Error || 'No results found.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch movies.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 mb-2"
      role="search"
      aria-label="Search movies"
    >
      <label htmlFor="movie-search" className="sr-only">
        Search movies
      </label>
      <input
        id="movie-search"
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label="Search movies"
      >
        Search
      </button>
    </form>
  );
}
