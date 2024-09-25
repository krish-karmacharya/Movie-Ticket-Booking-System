import React, { useState, useEffect } from "react";
import streamingMovies from "../DataFiles/Streaming.json";
import Nav from "../components/Nav";
import { useNavigate } from 'react-router-dom';

const Trending = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Sort movies by rating in descending order
        const sortedMovies = [...streamingMovies].sort((a, b) => b.rating - a.rating);
        // Take the top 10 movies or all if less than 10
        setTrendingMovies(sortedMovies.slice(0, 10));
    }, []);

    const handleWatchNow = (movie) => {
        navigate('/NowShowingBooking', { state: { movie } });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Nav />
            <div className="pt-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-black">Trending Movies</h2>
                    {trendingMovies.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {trendingMovies.map((movie, index) => (
                                <div
                                    key={index}
                                    className="relative h-64 group overflow-hidden rounded-lg shadow-md"
                                >
                                    <img
                                        src={movie.imageUrl}
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"></div>
                                        <button
                                            className="bg-red-600 text-white py-2 px-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-red-700 transition-colors duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                            onClick={() => handleWatchNow(movie)}
                                        >
                                            Watch Now
                                        </button>
                                    </div>
                                    <div className="absolute top-0 right-0 bg-yellow-500 text-white p-1 text-xs font-semibold">
                                        Rating: {movie.rating}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gray-100 bg-opacity-80 text-black p-2">
                                        <p className="text-xs sm:text-sm font-semibold truncate">{movie.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">No trending movies available at the moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Trending;
