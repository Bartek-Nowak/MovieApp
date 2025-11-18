import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import type { Movie } from '@/types/Movie';

interface MovieContextType {
  results: Movie[];
  setResults: Dispatch<SetStateAction<Movie[]>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');

  return (
    <MovieContext.Provider value={{ results, setResults, query, setQuery }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  const ctx = useContext(MovieContext);
  if (!ctx) throw new Error('useMovieContext must be used inside MovieProvider');
  return ctx;
}
