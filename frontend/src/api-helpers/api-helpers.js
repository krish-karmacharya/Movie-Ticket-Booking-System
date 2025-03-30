import axios from "axios";
export const getAllMovies = async () => {
  console.log("Fetching all movies...");
  const res = await axios.get("/movie").catch((err) => {
    console.error("Error fetching movies:", err);
    return null;
  });

  if (!res || res.status !== 200) {
    console.error("No data or invalid response:", res);
    return { movies: [] };
  }

  console.log("Movies data received:", res.data);
  return res.data;
};

export const sendUserAuthRequest = async (data, signup) => {
  try {
    const res = await axios.post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    });

    if (res.status !== 200 && res.status !== 201) {
      throw new Error(res.data.message || "Unexpected Error Occurred");
    }

    return res.data;
  } catch (err) {
    console.error("Auth request failed:", err);
    throw err;
  }
};

export const sendAdminAuthRequest = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpectyed Error");
  }

  const resData = await res.data;
  return resData;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`/movie/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const newBooking = async (data) => {
  try {
    const res = await axios.post("/booking", {
      movie: data.movie,
      seats: data.seats,
      date: data.date,
      user: localStorage.getItem("userId"),
    });

    if (res.status !== 201) {
      throw new Error(res.data.message || "Failed to create booking");
    }
    return res.data;
  } catch (err) {
    console.error("Booking error:", err);
    throw new Error(
      err.response?.data?.message ||
        "Failed to create booking. Please try again."
    );
  }
};

export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/user/bookings/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/booking/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const addMovie = async (data) => {
  try {
    const res = await axios.post(
      "/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        featured: data.featured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.status !== 201) {
      throw new Error("Failed to add movie");
    }

    return res.data;
  } catch (err) {
    console.error("Error adding movie:", err);
    throw err;
  }
};

export const getAdminById = async () => {
  try {
    const adminId = localStorage.getItem("adminId");
    const token = localStorage.getItem("token");

    if (!adminId || !token) {
      throw new Error("Admin ID or token not found");
    }

    const res = await axios.get(`/admin/${adminId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      throw new Error(res.data.message || "Failed to fetch admin data");
    }

    return res.data;
  } catch (err) {
    console.error("Error fetching admin data:", err);
    throw new Error(
      err.response?.data?.message || "Failed to fetch admin data"
    );
  }
};

export const deleteMovie = async (id) => {
  const res = await axios
    .delete(`/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getAllBookings = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Admin token not found");
    }

    const res = await axios.get("/admin/bookings/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      throw new Error(res.data.message || "Failed to fetch bookings");
    }

    return res.data;
  } catch (err) {
    console.error("Error fetching bookings:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch bookings");
  }
};
