import { Genre } from "./Genre";
import { Keyword } from "./Keyword";

export type Movie = {
  posterpath: string;
  genres: Genre[];
  homepage: string;
  id: number;
  keywords: Keyword[];
  overview: string;
  popularity: number;
  release_date: string;
  runtime: string;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  tmdblink: string;
  swipeflag: string;
};
