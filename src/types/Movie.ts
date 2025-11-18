export interface Movie {
  Title?: string;
  Poster?: string;
  Year?: string | number;
  imdbID: string;
  Type: string;
}

export interface MovieDetail extends Movie {
  Director?: string;
  Actors?: string;
  Genre?: string;
  Runtime?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Ratings?: {Source: string; Value: string}[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
}

export interface MovieSearchFormProps {
  onResults: (results: Movie[]) => void;
}
