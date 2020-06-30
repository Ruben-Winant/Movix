import SerieResult from "./SerieResult";

type Series = {
  results?: SerieResult[];
  page?: number;
  total_results?: number;
  total_pages?: number;
};

export default Series;
