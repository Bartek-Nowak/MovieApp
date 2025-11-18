import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {describe, it, vi, beforeEach, beforeAll} from 'vitest';
import Home from '@/views/home/Home';

declare const global: any;

beforeAll(() => {
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

vi.mock('@/context/MovieContext', () => ({
  useMovieContext: vi.fn(),
}));

vi.mock('@/context/GlobalUIContext', () => ({
  useGlobalUI: vi.fn(),
}));

vi.mock('@/components', () => ({
  MovieSearchForm: ({onResults}: {onResults: Function}) => (
    <button onClick={() => onResults('Inception', '2010', 'movie')}>
      Search
    </button>
  ),
}));

vi.mock('@/components/MovieGrid', () => ({
  default: () => <div data-testid="movie-grid">Movie Grid</div>,
}));

vi.mock('@/api/movieService', () => ({
  searchMovies: vi.fn().mockResolvedValue({
    Search: [
      {
        Title: 'Inception',
        imdbID: 'tt1375666',
        Year: '2010',
        Type: 'movie',
        Poster: 'test.jpg',
      },
    ],
    totalResults: '1',
  }),
}));

import {useMovieContext} from '@/context/MovieContext';
import {useGlobalUI} from '@/context/GlobalUIContext';

describe('Home Page', () => {
  let setResultsMock: any;
  let setQueryMock: any;
  let setLoadingMock: any;
  let setErrorMock: any;

  beforeEach(() => {
    vi.clearAllMocks();

    setResultsMock = vi.fn((arg: any) =>
      typeof arg === 'function' ? arg([]) : arg
    );
    setQueryMock = vi.fn();
    setLoadingMock = vi.fn();
    setErrorMock = vi.fn();

    (useMovieContext as any).mockReturnValue({
      results: [],
      query: '',
      setResults: setResultsMock,
      setQuery: setQueryMock,
    });

    (useGlobalUI as any).mockReturnValue({
      setLoading: setLoadingMock,
      setError: setErrorMock,
    });
  });

  it('renders heading and search form', () => {
    render(<Home />);
    expect(screen.getByText(/Movie Search/i)).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('calls handleSearch when search form button is clicked', async () => {
    render(<Home />);
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => expect(setQueryMock).toHaveBeenCalledWith('Inception'));
    expect(setResultsMock).toHaveBeenCalledWith(expect.any(Function));
    expect(setLoadingMock).toHaveBeenCalledTimes(2);
  });

  it('renders MovieGrid when there are results', () => {
    (useMovieContext as any).mockReturnValue({
      results: [
        {
          Title: 'Inception',
          imdbID: 'tt1375666',
          Year: '2010',
          Type: 'movie',
          Poster: 'test.jpg',
        },
      ],
      query: 'Inception',
      setResults: setResultsMock,
      setQuery: setQueryMock,
    });

    render(<Home />);
    expect(screen.getByTestId('movie-grid')).toBeInTheDocument();
  });
});
