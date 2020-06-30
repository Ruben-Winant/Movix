import created_by from "./SubTypes/created_by";
import LastEpisodeToAir from "./SubTypes/LastEpisodeToAir";
import Network from "./SubTypes/Network";
import ProductionCompanies from "./SubTypes/ProductionCompanies";
import Season from "./SubTypes/Season";

type SerieDetails = {
  backdrop_path?: string;
  created_by?: created_by[];
  episode_run_time?: number[];
  first_air_date?: string;
  genres?: number[];
  homepage?: string;
  id?: number;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: LastEpisodeToAir;
  name?: string;
  next_episode_to_air?: null;
  networks?: Network[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: ProductionCompanies[];
  seasons?: Season[];
  status?: string;
  type?: string;
  vote_average?: number;
  vote_count?: number;
};

export default SerieDetails;
