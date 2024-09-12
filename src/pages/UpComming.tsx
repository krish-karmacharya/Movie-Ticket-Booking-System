import React from "react";

interface Movie {
  title: string;
  imageUrl: string;
  releaseDate: string;
}

function UpComming() {
  const upcomingMovies: Movie[] = [
    {
      title: "Dune: Part Two",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BODI0YjNhNjUtYjM0My00MTUwLWFlYTMtMWI2NGUzYjNjNGQzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
      releaseDate: "15 Mar 2024",
    },
    {
      title: "Shazam! Fury of the Gods",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BNzJlM2NmZTItOGQyYS00MmE2LTkwZGUtNDFkNmJmZjRjZjcxXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_SX300.jpg",
      releaseDate: "17 Mar 2023",
    },
    {
      title: "Minions: The Rise of Gru",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREaMBS1xIj7bOT2ZOLQz0tmLT8xU0nCKT73g&s",
      releaseDate: "1 Jul 2022",
    },
    {
      title: "Guardians of the Galaxy Vol. 3",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
      releaseDate: "5 May 2023",
    },
    {
      title: "The Flash",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BZWE2ZWE5MDQtMTJlZi00MTVjLTkxOTgtNmNiYjg2NDIxN2NhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
      releaseDate: "16 Jun 2023",
    },
    {
      title: "Detective Conan: Black Iron Submarine",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BNzk2ZThjMzYtZjkzNC00MTlhLTgwZjctZDIzZTZmOGMxNmM5XkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_SX300.jpg",
      releaseDate: "13 Sep 2024",
    },
    {
      title: "Oppenheimer",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
      releaseDate: "21 Jul 2023",
    },
    {
      title: "Mission: Impossible - Dead Reckoning Part One",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BYzFiZjc1YzctMDY3Zi00NGE5LTlmNWEtN2Q3OWFjYjY1NGM2XkEyXkFqcGdeQXVyMTUyMTUzNjQ0._V1_SX300.jpg",
      releaseDate: "12 Jul 2023",
    },
    {
      title: "Barbie",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BOWIwZGY0OTYtZjUzYy00NzRmLTg5YzgtYWMzNWQ0MmZiY2MwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
      releaseDate: "21 Jul 2023",
    },
    {
      title: "The Marvels",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BM2U2YWU5NWMtOGI2Ni00MGMwLWFkNjItMjgyZWMxNjllNTMzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
      releaseDate: "10 Nov 2023",
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-7xl w-full px-4">
        <h2 className="text-3xl font-bold mb-4 text-black">Upcoming Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {upcomingMovies.map((movie, index) => (
            <div
              key={index}
              className="relative h-64 group overflow-hidden rounded-lg"
            >
              <div className="absolute top-0 left-0 right-0 bg-sky-500 text-white p-1 text-xs font-semibold text-center z-10">
                {movie.releaseDate}
              </div>
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full h-full object-cover shadow-md"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"></div>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Pre-book
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gray-100 bg-opacity-80 text-black p-2">
                <p className="text-sm font-semibold truncate">{movie.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UpComming;
