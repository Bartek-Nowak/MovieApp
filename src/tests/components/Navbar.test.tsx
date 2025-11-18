import {render, screen} from '@testing-library/react';
import {describe, it} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import Navbar from '@/components/Navbar';

describe('Navbar', () => {
  it('renders all tabs and highlights the active one', () => {
    render(
      <MemoryRouter initialEntries={['/favorites']}>
        <Navbar />
      </MemoryRouter>
    );

    const searchLink = screen.getByText('Search');
    const favoritesLink = screen.getByText('Favorites');

    expect(searchLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();

    expect(favoritesLink).toHaveAttribute('aria-current', 'page');
    expect(searchLink).not.toHaveAttribute('aria-current');
  });
});
