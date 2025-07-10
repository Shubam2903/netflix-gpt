import React from "react";
import GptMoviesSuggestion from "./GptMoviesSuggestion";
import GptSearchBar from "./GptSearchBar";
import { BG_IMAGE } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <img
          className="w-full h-full object-cover"
          src={BG_IMAGE}
          alt="BGLOGO"
        />
      </div>
      <GptSearchBar />
      <GptMoviesSuggestion />
    </div>
  );
};

export default GptSearch;
