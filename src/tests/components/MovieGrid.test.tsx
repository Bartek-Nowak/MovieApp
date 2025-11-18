import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MovieGrid from '@/components/MovieGrid';
import { useMovieContext } from '@/context/MovieContext';

vi.mock('@/context/MovieContext', () => ({
  useMovieContext: vi.fn(),
}));

vi.mock('@/components/MovieCard', () => ({
  __esModule: true,
  default: ({ movie, onClick }: { movie: any; onClick: () => void }) => (
    <div data-testid="movie-card" onClick={onClick}>
      {movie.Title}
    </div>
  ),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('MovieGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders "No movies found" when there are no movies', () => {
    (useMovieContext as any).mockReturnValue({ results: [] });

    render(
      <MemoryRouter>
        <MovieGrid />
      </MemoryRouter>
    );

    expect(screen.getByText(/No movies found/i)).toBeInTheDocument();
  });

  it('renders movie cards and handles click', async () => {
    const movies = [
      { imdbID: '1', Title: 'Movie 1' },
      { imdbID: '2', Title: 'Movie 2' },
    ];

    (useMovieContext as any).mockReturnValue({ results: movies });

    render(
      <MemoryRouter>
        <MovieGrid />
      </MemoryRouter>
    );

    const cards = await waitFor(() => screen.getAllByTestId('movie-card'));

    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Movie 1');
    expect(cards[1]).toHaveTextContent('Movie 2');

    fireEvent.click(cards[0]);
  });
});
