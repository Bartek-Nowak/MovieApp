import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {describe, it, vi, beforeEach, beforeAll} from 'vitest';
import {MovieDetail} from '@/views';
import {useParams} from 'react-router-dom';
import {getMovieById} from '@/api/movieService';
import {useGlobalUI} from '@/context/GlobalUIContext';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

vi.mock('@/api/movieService', () => ({
  getMovieById: vi.fn(),
}));

vi.mock('@/context/GlobalUIContext', () => ({
  useGlobalUI: vi.fn(),
}));

vi.mock('@/components', () => ({
  Poster: ({src, title}: any) => <img src={src} alt={title} />,
}));

describe('MovieDetail', () => {
  const setLoadingMock = vi.fn();
  const setErrorMock = vi.fn();
  const movieData = {
    Title: 'Inception',
    Year: '2010',
    imdbID: 'tt1375666',
    Type: 'movie',
    Poster: 'test.jpg',
    Director: 'Christopher Nolan',
    Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
    Genre: 'Action, Sci-Fi',
    Runtime: '148 min',
    Plot: 'A thief who steals corporate secrets...',
    Response: 'True',
  };

  beforeAll(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => '[]'),
      setItem: vi.fn(),
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
    (useParams as any).mockReturnValue({id: 'tt1375666'});
    (useGlobalUI as any).mockReturnValue({
      setLoading: setLoadingMock,
      setError: setErrorMock,
    });
  });

  it('fetches and displays movie details', async () => {
    (getMovieById as any).mockResolvedValue(movieData);

    render(<MovieDetail />);

    await waitFor(() => expect(setLoadingMock).toHaveBeenCalledWith(true));
    await waitFor(() =>
      expect(screen.getByText(movieData.Title)).toBeInTheDocument()
    );
    expect(screen.getByText(/Christopher Nolan/)).toBeInTheDocument();
    expect(screen.getByText(/Leonardo DiCaprio/)).toBeInTheDocument();
    expect(screen.getByText(/Action, Sci-Fi/)).toBeInTheDocument();
    expect(screen.getByText(/148 min/)).toBeInTheDocument();
    expect(
      screen.getByText(/A thief who steals corporate secrets/)
    ).toBeInTheDocument();
  });

  it('toggles favorite status', async () => {
    (getMovieById as any).mockResolvedValue(movieData);
    const {setItem} = localStorage as any;

    render(<MovieDetail />);
    const favButton = await screen.findByRole('button', {
      name: /Add to Favorites/i,
    });

    fireEvent.click(favButton);

    expect(setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([movieData])
    );
    expect(favButton).toHaveAttribute('aria-label', 'Remove from Favorites');

    fireEvent.click(favButton);

    expect(setItem).toHaveBeenCalledWith('favorites', JSON.stringify([]));
    expect(favButton).toHaveAttribute('aria-label', 'Add to Favorites');
  });

  it('sets document title and meta tags', async () => {
    (getMovieById as any).mockResolvedValue(movieData);

    const metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);

    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    document.head.appendChild(metaKeywords);

    render(<MovieDetail />);

    await waitFor(() =>
      expect(document.title).toBe(`${movieData.Title} - Movie App`)
    );

    await waitFor(() => {
      expect(metaDesc.getAttribute('content')).toBe(movieData.Plot);
      expect(metaKeywords.getAttribute('content')).toBe(movieData.Genre);
    });
  });
});
