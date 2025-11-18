import omdbApi from '@/api/omdbApi';
import {searchMovies, getMovieById} from '@/api/movieService';
import {vi, describe, it, expect, beforeEach} from 'vitest';
import type {Mock} from 'vitest';

vi.mock('@/api/omdbApi');

describe('movieService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('searchMovies calls omdbApi.get with correct params', async () => {
    const mockData = {
      Search: [{Title: 'Movie 1', imdbID: 'tt1'}],
      totalResults: '1',
    };
    (omdbApi.get as unknown as Mock).mockResolvedValueOnce({data: mockData});

    const result = await searchMovies('Test', {type: 'movie'}, 2);

    expect(omdbApi.get).toHaveBeenCalledWith('', {
      params: {s: 'Test', page: '2', type: 'movie'},
    });
    expect(result).toEqual(mockData);
  });

  it('getMovieById calls omdbApi.get with correct params', async () => {
    const mockData = {Title: 'Movie 1', imdbID: 'tt1', Response: 'True'};
    (omdbApi.get as unknown as Mock).mockResolvedValueOnce({data: mockData});

    const result = await getMovieById('tt1');

    expect(omdbApi.get).toHaveBeenCalledWith('', {params: {i: 'tt1'}});
    expect(result).toEqual(mockData);
  });
});
