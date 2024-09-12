import React from "react";

interface Movie {
  title: string;
  imageUrl: string;
  releaseDate: string;
}

const StreamingSection: React.FC = () => {
  const streamingMovies: Movie[] = [
    {
      title: "Inception",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      releaseDate: "Now Streaming",
    },
    {
      title: "The Shawshank Redemption",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      releaseDate: "Now Streaming",
    },
    {
      title: "Pulp Fiction",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
      releaseDate: "Now Streaming",
    },
    {
      title: "The Dark Knight",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
      releaseDate: "Now Streaming",
    },
    {
      title: "The Godfather",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
      releaseDate: "Now Streaming",
    },
    {
      title: "Forrest Gump",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      releaseDate: "Now Streaming",
    },
    {
      title: "The Matrix",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
      releaseDate: "Now Streaming",
    },
    {
      title: "Goodfellas",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
      releaseDate: "Now Streaming",
    },
    {
      title: "Schindler's List",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
      releaseDate: "Now Streaming",
    },
    {
      title: "Fight Club",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
      releaseDate: "Now Streaming",
    },
  ];

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

  const MovieGrid: React.FC<{ title: string; movies: Movie[] }> = ({
    title,
    movies,
  }) => (
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
    <div className="w-full bg-white">
      <div className="container mx-auto px-4 py-8">
        <MovieGrid title="Streaming" movies={streamingMovies} />
        <MovieGrid title="Upcoming Movies" movies={upcomingMovies} />
      </div>
    </div>
  );
};

export default StreamingSection;
