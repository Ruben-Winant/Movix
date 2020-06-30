import MultiSearch from "./MultiSearch";

type MultiSearchResult = {
  page: number;
  results: MultiSearch[];
  total_results: number;
  total_pages: number;
};

export default MultiSearchResult;
