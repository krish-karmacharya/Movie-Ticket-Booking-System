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
        <h1 className="text-3xl font-bold mb-6">Gift a Show</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shows.map((show) => (
            <div key={show.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={show.image} alt={show.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{show.title}</h2>
                <p className="text-gray-600 mb-4">{show.description}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
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

