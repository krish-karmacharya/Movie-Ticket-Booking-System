import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import upcomming from '../DataFiles/Upcomming.json';

const GiftAShow = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    setShows(upcomming);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Gift a Show</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shows.map((show) => (
            <div key={show.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="w-full h-48 sm:h-56 bg-gray-200 flex items-center justify-center">
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'path/to/placeholder-image.jpg';
                  }}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 truncate">{show.title}</h2>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{show.description}</p>
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Gift This Show
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default GiftAShow;
