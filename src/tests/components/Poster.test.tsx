import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import {Poster} from '@/components';

describe('Poster', () => {
  it('renders given src and alt', () => {
    render(<Poster src="poster.jpg" title="Test Movie" className="my-class" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toContain('poster.jpg');
    expect(img.alt).toBe('Test Movie poster');
    expect(img).toHaveClass('my-class');
  });

  it('renders fallback SVG when src is undefined', () => {
    render(<Poster title="Test Movie" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toContain('data:image/svg+xml');
    expect(img.alt).toBe('Test Movie poster');
  });

  it('renders fallback SVG when src is "N/A"', () => {
    render(<Poster src="N/A" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toContain('data:image/svg+xml');
    expect(img.alt).toBe('No poster available');
  });
});
