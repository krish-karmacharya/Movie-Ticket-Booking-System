import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OnclickUpcoming = () => {
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.movie) {
            setMovie(location.state.movie);
        } else {
            // If no movie data is passed, redirect to the UpComming page
            navigate('/UpComming');
        }
    }, [location, navigate]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    const watchTrailer = () => {
        if (movie.trailerUrl) {
            window.open(movie.trailerUrl, '_blank');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 pt-20">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img src={movie.imageUrl} alt={movie.title} className="h-96 w-full md:w-96 object-cover object-center" />
                    </div>
                    <div className="p-8">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">{movie.title}</h2>
                        <p className="text-gray-600 mb-4 text-lg">Release Date: {movie.releaseDate}</p>
                        <p className="text-gray-600 mb-6 text-lg">Genre: {movie.genre}</p>
                        <div className="flex space-x-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => navigate('/')}
                            >
                                Back to Upcoming Movies
                            </button>
                            {movie.trailerUrl && (
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                                    onClick={watchTrailer}
                                >
                                    Watch Trailer
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnclickUpcoming;
