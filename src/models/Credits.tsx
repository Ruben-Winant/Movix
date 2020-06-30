import Cast from "./SubTypes/Cast";
import Crew from "./SubTypes/Crew";

type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export default Credits;
