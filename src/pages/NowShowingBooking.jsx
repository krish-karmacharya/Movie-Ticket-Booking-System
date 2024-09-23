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

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Nav />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <img
              src={movie.imageUrl || "https://via.placeholder.com/150x300?text=Movie+Poster"}
              alt={`${movie.title} Poster`}
              className="rounded-lg shadow-lg mx-auto md:mx-0"
            />
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{movie.title}</h2>
            <p className="text-gray-600 mb-4 text-lg">Release Date: {movie.releaseDate}</p>
            <p className="text-gray-600 mb-4 text-lg">Genre: {movie.genre}</p>
            <p className="text-gray-600 mb-6 text-lg">{movie.description}</p>
            <button className="text-blue-500 hover:text-blue-700 font-bold text-lg">
              View More Details
            </button>
          </div>
          <div className="w-full md:w-3/4 md:pl-8">
            <div className="border-b border-gray-300 mb-4">
              <ul className="flex">
                <li className="mr-6">
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
            <div className="mb-4">
              <button
                onClick={() => toggleStep(1)}
                className="w-full text-left bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <span>1. Select Date, Language & Time</span>
                <span>{selectedStep === 1 ? "-" : "+"}</span>
              </button>
              {selectedStep === 1 && (
                <div className="p-4 bg-white shadow-md rounded-lg mt-2">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Select Date</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {['Today', 'Tomorrow', 'Day After'].map((day, index) => (
                          <button key={index} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">
                            {day}
                            <br />
                            {new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' })}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Select Language</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {['English', 'Hindi', 'Nepali'].map((lang) => (
                          <button key={lang} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Select Time</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                        {['10:00', '13:00', '16:00', '19:00', '22:00'].map((time) => (
                          <button key={time} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-4" role="alert">
                      <p className="font-bold">Please Note</p>
                      <p>Tickets will be required for all admissions. Infants will not be admitted.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => toggleStep(2)}
                className="w-full text-left bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <span>2. Pick Seats </span>
                <span>{selectedStep === 2 ? "-" : "+"}</span>
              </button>
              {selectedStep === 2 && (
                <div className="p-4 bg-white shadow-md rounded-lg mt-2">
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
