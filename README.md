# Full Stack Movie Application

This is a full-stack web application for managing and browsing movies. The project is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and follows modern web development practices.

## Project Structure

```
├── frontend/          # React frontend application
├── backend/          # Node.js/Express backend server
└── README.md         # This file
```

## Features

- User Authentication (Login/Register)
- Movie Management
- Responsive UI with Material-UI
- State Management with Redux Toolkit
- RESTful API Architecture
- Secure Password Handling
- JWT-based Authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Getting Started

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Technology Stack

### Frontend

- React.js
- Material-UI (MUI)
- Redux Toolkit for state management
- React Router for navigation
- Axios for API calls

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## API Endpoints

The backend provides the following API endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/movies` - Get all movies
- `POST /api/movies` - Create a new movie
- `GET /api/movies/:id` - Get a specific movie
- `PUT /api/movies/:id` - Update a movie
- `DELETE /api/movies/:id` - Delete a movie

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
