import { useState } from "react";
import type { FormEvent } from "react";
import { searchMovies as apiSearchMovies } from "@/api/movieService";
import { useGlobalUI } from "@/context/GlobalUIContext";
import type { MovieSearchFormProps } from "@/types/Movie";

export default function MovieSearchForm({ onResults }: MovieSearchFormProps) {
  const { setLoading, setError } = useGlobalUI();
  const [query, setQuery] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await apiSearchMovies(query);

      if (data.Search) {
        onResults(data.Search);
      } else {
        onResults([]);
        setError(data.Error || "No results found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 mb-2"
    >
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}
