import Dates from "./SubTypes/Dates";
import Result from "./Result";

type Movies = {
  results: Result[];
  page: number;
  total_results: number;
  dates?: Dates;
  total_pages: number;
};

export default Movies;
