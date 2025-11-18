import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {MovieCard} from '@/components';
import type {Movie} from '@/types/Movie';

describe('MovieCard', () => {
  const movie: Movie = {
    imdbID: 'tt1234567',
    Title: 'Test Movie',
    Year: '2025',
    Type: 'movie',
    Poster: 'https://via.placeholder.com/150',
  };

  const mockOnClick = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    mockOnClick.mockClear();
  });

  it('renders movie title and year', () => {
    render(<MovieCard movie={movie} />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
  });

  it('shows star as favorite if movie is in localStorage', () => {
    localStorage.setItem('favorites', JSON.stringify([movie]));
    render(<MovieCard movie={movie} />);
    const star = screen.getByRole('img', {hidden: true});
    expect(star).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<MovieCard movie={movie} onClick={mockOnClick} />);
    const card = screen.getByRole('button');
    fireEvent.click(card);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when pressing Enter key', () => {
    render(<MovieCard movie={movie} onClick={mockOnClick} />);
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, {key: 'Enter', code: 'Enter'});
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when pressing Space key', () => {
    render(<MovieCard movie={movie} onClick={mockOnClick} />);
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, {key: ' ', code: 'Space'});
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
