import omdbApi from './omdbApi';

export const searchMovies = async (
  query: string,
  params: Record<string, string> = {},
  page = 1
) => {
  const response = await omdbApi.get('', {
    params: {
      s: query,
      page: page.toString(),
      ...params,
    },
  });
  return response.data;
};

export const getMovieById = async (id: string) => {
  const response = await omdbApi.get('', {params: {i: id}});
  return response.data;
};
