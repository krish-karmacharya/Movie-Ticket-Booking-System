import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Seats from "../components/Seats";

const NowShowingBooking = () => {
  const [selectedStep, setSelectedStep] = useState(null);
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.movie) {
      setMovie(location.state.movie);
    } else {
      // Redirect to the home page or show an error message if no movie data is available
      navigate('/');
    }
  }, [location, navigate]);

  const toggleStep = (step) => {
    setSelectedStep(selectedStep === step ? null : step);
  };

  const handleWatchClick = () => {
    if (movie) {
      navigate('/OnclickUpcomming', { state: { movie } });
    } else {
      console.error("No movie data available");
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Nav />
      <div className="container mx-auto px-3 py-8 mt-16">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src={movie.imageUrl}
              alt={`${movie.title} Poster`}
              className="rounded-lg shadow-lg mx-auto md:mx-0"
            />
            <h3 className="text-3xl font-bold mb-4 text-gray-800">{movie.title}</h3>
            <p className="text-gray-600 mb-4 text-lg">Release Date: {movie.releaseDate}</p>
            <p className="text-gray-600 mb-4 text-lg">Rating: {movie.rating}</p>
            <p className="text-gray-600 mb-6 text-lg">{movie.description}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleWatchClick}
            >
              Watch Now
            </button>
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <div className="border-b border-gray-200 mb-4">
              <ul className="flex">
                <li className="mr-5">
                  <button
                    className="text-blue-500 border-b-2 border-blue-500 pb-2"
                  >
                    NOW SHOWING
                  </button>
                </li>
                <li>
                  <button className="text-gray-500 pb-2">
                    CHECKOUT
                  </button>
                </li>
              </ul>
            </div>
            <div className="mb-3">
              <button
                onClick={() => toggleStep(2)}
                className="w-full text-left bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <span>2. Select Date, Language & Time</span>
                <span>{selectedStep === 2 ? "-" : "+"}</span>
              </button>
              {selectedStep === 2 && (
                <div className="p-3 bg-white shadow-md rounded-lg mt-2">
                  {/* Date, Language, and Time selection content */}
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => toggleStep(3)}
                className="w-full text-left bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <span>3. Pick Seats </span>
                <span>{selectedStep === 3 ? "-" : "+"}</span>
              </button>
              {selectedStep === 3 && (
                <div className="p-3 bg-white shadow-md rounded-lg mt-2">
                  <Seats />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NowShowingBooking;