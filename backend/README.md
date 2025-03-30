# Backend - Movie Application

This is the backend server for the movie application, built with Node.js, Express.js, and MongoDB. It provides a RESTful API for managing movies and user authentication.

## Features

- **Authentication System**

  - User registration and login
  - JWT-based authentication
  - Password hashing with bcrypt
  - Protected routes middleware

- **Movie Management**

  - CRUD operations for movies
  - Data validation
  - Error handling
  - Search and filtering capabilities

- **API Architecture**
  - RESTful endpoints
  - Proper HTTP status codes
  - Request validation
  - Error responses
  - CORS support

## Project Structure

```
backend/
├── controllers/    # Route controllers
├── models/        # MongoDB models
├── routes/        # API routes
├── middleware/    # Custom middleware
├── config/        # Configuration files
├── utils/         # Utility functions
├── app.js         # Main application file
└── package.json   # Project dependencies
```

## Dependencies

- `express`: ^4.18.3
- `mongoose`: ^8.2.1
- `bcryptjs`: ^2.4.3
- `jsonwebtoken`: ^9.0.2
- `cors`: ^2.8.5
- `dotenv`: ^16.4.5

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Movies

- `GET /api/movies` - Get all movies
- `POST /api/movies` - Create a new movie (protected)
- `GET /api/movies/:id` - Get a specific movie
- `PUT /api/movies/:id` - Update a movie (protected)
- `DELETE /api/movies/:id` - Delete a movie (protected)

## Database Schema

### User Model

```javascript
{
  username: String,
  email: String,
  password: String,
  createdAt: Date
}
```

### Movie Model

```javascript
{
  title: String,
  description: String,
  releaseYear: Number,
  genre: String,
  rating: Number,
  director: String,
  cast: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API uses a centralized error handling system that:

- Validates request data
- Handles database errors
- Manages authentication errors
- Returns appropriate HTTP status codes
- Provides meaningful error messages

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes middleware
- CORS configuration
- Input validation
- Rate limiting (optional)

## Development Guidelines

### Code Style

- Follow ESLint rules
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and small

### Error Handling

- Use try-catch blocks
- Implement proper error logging
- Return appropriate status codes
- Provide meaningful error messages

### Database Operations

- Use Mongoose models
- Implement proper validation
- Handle database errors
- Use transactions when necessary

## Testing

Run tests with:

```bash
npm test
```

## Deployment

1. Set up environment variables
2. Configure MongoDB connection
3. Set up proper security measures
4. Deploy to your hosting platform

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests
4. Submit a pull request

## License

This project is licensed under the ISC License.
