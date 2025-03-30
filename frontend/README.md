# Frontend - Movie Application

This is the frontend part of the movie application, built with React.js and Material-UI. It provides a modern, responsive user interface for managing and browsing movies.

## Features

- **User Interface**

  - Clean and modern Material-UI design
  - Responsive layout that works on all devices
  - Intuitive navigation with React Router
  - Loading states and error handling

- **State Management**

  - Centralized state management using Redux Toolkit
  - Efficient data caching and updates
  - Optimized performance with selective re-rendering

- **Authentication**

  - Secure login and registration forms
  - Protected routes for authenticated users
  - JWT token management
  - Persistent authentication state

- **Movie Management**
  - List view of all movies
  - Detailed movie view
  - Create, update, and delete movie functionality
  - Search and filter capabilities

## Project Structure

```
frontend/
├── public/           # Static files
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page components
│   ├── features/     # Redux slices and features
│   ├── services/     # API services
│   ├── utils/        # Utility functions
│   ├── hooks/        # Custom React hooks
│   └── App.js        # Main application component
└── package.json      # Project dependencies
```

## Dependencies

- `react`: ^18.2.0
- `@mui/material`: ^5.10.8
- `@mui/icons-material`: ^5.10.6
- `@reduxjs/toolkit`: ^1.8.6
- `react-redux`: ^8.0.4
- `react-router-dom`: ^6.4.2
- `axios`: ^1.1.2

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Development Guidelines

### Component Structure

- Use functional components with hooks
- Implement proper prop types
- Follow the container/presenter pattern
- Keep components focused and single-responsibility

### State Management

- Use Redux for global state
- Use local state for component-specific data
- Implement proper loading and error states
- Cache API responses when appropriate

### Styling

- Use Material-UI components when possible
- Follow the project's theme configuration
- Implement responsive design
- Use styled-components for custom styling

### Code Quality

- Follow ESLint rules
- Write meaningful component and function names
- Add comments for complex logic
- Keep files focused and maintainable

## Testing

Run tests with:

```bash
npm test
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Build and Deployment

The application can be built for production using:

```bash
npm run build
```

This creates an optimized production build in the `build` directory.
