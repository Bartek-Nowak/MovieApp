import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {FavoritesPage} from '@/views';
import {BrowserRouter} from 'react-router-dom';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('FavoritesPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('renders "No favorites yet" when localStorage is empty', () => {
    render(
      <BrowserRouter>
        <FavoritesPage />
      </BrowserRouter>
    );
    expect(screen.getByText('No favorites yet.')).toBeInTheDocument();
  });

  it('renders favorite movies from localStorage', () => {
    const favs = [
      {
        imdbID: 'tt1',
        Title: 'Movie 1',
        Year: '2020',
        Type: 'movie',
        Poster: '',
      },
      {
        imdbID: 'tt2',
        Title: 'Movie 2',
        Year: '2021',
        Type: 'series',
        Poster: '',
      },
    ];
    localStorage.setItem('favorites', JSON.stringify(favs));

    render(
      <BrowserRouter>
        <FavoritesPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  it('navigates to movie details on card click', () => {
    const favs = [
      {
        imdbID: 'tt1',
        Title: 'Movie 1',
        Year: '2020',
        Type: 'movie',
        Poster: '',
      },
    ];
    localStorage.setItem('favorites', JSON.stringify(favs));

    render(
      <BrowserRouter>
        <FavoritesPage />
      </BrowserRouter>
    );

    const card = screen.getByText('Movie 1');
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith('/media/tt1');
  });
});
