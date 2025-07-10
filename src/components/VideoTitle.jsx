import React from "react";

export const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-120  px-15 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="py-6 text-xl w-1/4">{overview}</p>

      <div>
        <button className="bg-gray-200 text-black py-2 px-12 font-bold text-xl rounded-xs hover:opacity-75">
          {/* //we have used image here from fontawesome// */}
          <i className="fa-solid fa-play"></i> Play
        </button>
        <button className="mx-2.5 bg-gray-500 text-white py-2 px-8 font-bold text-xl rounded-xs hover:opacity-75">
          <i className="fa-solid fa-circle-info"></i> More Info
        </button>
      </div>
    </div>
  );
};
