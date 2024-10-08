import React from "react";
import upcomingMovies from "../DataFiles/Upcomming.json";
import Nav from "../components/Nav";
import { useNavigate } from 'react-router-dom';
import OnclickUpcoming from "../components/OnclickUpcomming";

function UpComming() {
  const navigate = useNavigate();

  const handlePreOrder = (movie) => {
    navigate('/OnclickUpcomming', { state: { movie } });
  };

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-black">Upcoming Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {upcomingMovies.map((movie, index) => (
              <div
                key={index}
                className="relative h-48 sm:h-64 group overflow-hidden rounded-lg shadow-md"
              >
                <div className="absolute top-0 left-0 right-0 bg-sky-500 text-white p-1 text-xs font-semibold text-center z-10">
                  {movie.releaseDate}
                </div>
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"></div>
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition-colors duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => navigate('/OnclickUpcomming', { state: { movie } })}
                  >
                    Pre-book
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gray-100 bg-opacity-80 text-black p-2">
                  <p className="text-xs sm:text-sm font-semibold truncate">{movie.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UpComming;
