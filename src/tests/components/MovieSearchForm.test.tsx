import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, vi, beforeEach} from 'vitest';
import {MovieSearchForm} from '@/components';

vi.mock('@/context/MovieContext', () => ({
  useMovieContext: vi.fn(),
}));

import {useMovieContext} from '@/context/MovieContext';

describe('MovieSearchForm', () => {
  const setQueryMock = vi.fn();
  const onResultsMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useMovieContext as any).mockReturnValue({
      query: '',
      setQuery: setQueryMock,
    });
  });

  it('renders correctly', () => {
    render(<MovieSearchForm onResults={onResultsMock} />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Year')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /search/i})).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('calls onResults with correct values on submit', () => {
    (useMovieContext as any).mockReturnValue({
      query: 'Inception',
      setQuery: setQueryMock,
    });

    render(<MovieSearchForm onResults={onResultsMock} />);

    fireEvent.change(screen.getByPlaceholderText('Year'), {
      target: {value: '2010'},
    });
    fireEvent.change(screen.getByRole('combobox'), {target: {value: 'movie'}});

    fireEvent.click(screen.getByRole('button', {name: /search/i}));

    expect(onResultsMock).toHaveBeenCalledWith('Inception', '2010', 'movie');
  });

  it('does not call onResults if search query is empty', () => {
    render(<MovieSearchForm onResults={onResultsMock} />);
    fireEvent.click(screen.getByRole('button', {name: /search/i}));
    expect(onResultsMock).not.toHaveBeenCalled();
  });

  it('updates query when typing', () => {
    render(<MovieSearchForm onResults={onResultsMock} />);
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, {target: {value: 'Matrix'}});
    expect(setQueryMock).toHaveBeenCalledWith('Matrix');
  });
});
