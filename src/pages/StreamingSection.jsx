import React from "react";
import streamingMovies from "../DataFiles/Streaming.json";
import upcomingMovies from "../DataFiles/Upcomming.json";
import Header from "../components/Header";

const StreamingSection = () => {
  const MovieGrid = ({ title, movies }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-black">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="relative h-64 group overflow-hidden rounded-lg"
          >
            {title === "Upcoming Movies" && (
              <div className="absolute top-0 left-0 right-0 bg-sky-500 text-white p-1 text-xs font-semibold text-center z-10">
                {movie.releaseDate}
              </div>
            )}
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover shadow-md"
            />
            {title === "Streaming" && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"></div>
                <button className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                  Watch Now
                </button>
              </div>
            )}
            {title === "Upcoming Movies" && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"></div>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Pre-book
                </button>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-100 bg-opacity-80 text-black p-2">
              <p className="text-sm font-semibold truncate">{movie.title}</p>
              {title === "Streaming" && (
                <p className="text-xs">{movie.releaseDate}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="w-full bg-white">
        <div className="container mx-auto px-4 py-8">
          <MovieGrid title="Streaming" movies={streamingMovies} />
          <MovieGrid title="Upcoming Movies" movies={upcomingMovies} />
        </div>
      </div>
    </>
  );
};

export default StreamingSection;
