# My Movie App

My Movie App is an interactive web application for movie enthusiasts. Users can browse, search, and manage a personal list of favorite movies. Built with the MERN stack, it integrates MongoDB, Express.js, React.js, and Node.js to deliver a robust full-stack experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Deployment](#deployment)

## Features

- User Registration and Authentication
- Browse a catalog of movies
- Detailed movie descriptions including genres and directors
- Add or remove movies from a personalized favorites list
- Responsive design for desktop and mobile devices

## Technologies Used

- **Frontend**: React.js, Redux for state management, Bootstrap for styling
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose for data modeling
- **Authentication**: JSON Web Tokens (JWT)
- **Testing**: Jest for backend testing (optional)
- **Deployment**: Heroku for backend, Netlify for frontend

## Getting Started

### Prerequisites

- Node.js (12.x or higher)
- npm (6.x or higher) or yarn (1.22.x or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/my-movie-app.git
   cd my-movie-app
Set up the backend:

Navigate to the backend folder, install dependencies, set up your environment variables, and start the server:

bash
Code kopieren
cd backend
npm install
cp .env.example .env
# Edit .env to include your MongoDB URI and JWT secret
npm start
Set up the frontend:

In a new terminal, navigate to the frontend directory, install dependencies, and start the React development server:

bash
cd ../frontend
npm install
npm start

The frontend should now be running on http://localhost:3000.

Usage
Once both servers are running, navigate to http://localhost:3000 in your web browser to start exploring the application. Register for a new account or login to view and manage your movie library.

API Reference
The backend API supports several endpoints under /api:

Authentication
POST /api/users/register: Register a new user
POST /api/users/login: Login an existing user
Movies
GET /api/movies: Retrieve all movies
GET /api/movies/:id: Retrieve a movie by ID
POST /api/users/:userId/movies/:movieId/favorites: Add a movie to favorites
DELETE /api/users/:userId/movies/:movieId/favorites: Remove a movie from favorites
User Profiles
GET /api/users/:userId: Get user profile
PUT /api/users/:userId: Update user profile
Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

To contribute:

Fork the project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
Distributed under the MIT License. See LICENSE file for more information.

Contact
Adrian Dever - ad.dever@yahoo.com

Project Link: https://github.com/dantris/cf-3-myflix

Deployment
Backend Deployment on Heroku
Install Heroku CLI and login:

bash
Code kopieren
heroku login
Create a new Heroku app:

bash
Code kopieren
heroku create
Set environment variables on Heroku:

bash
Code kopieren
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=your_mongo_uri
heroku config:set JWT_SECRET=your_jwt_secret
Deploy to Heroku:

bash
Code kopieren
git subtree push --prefix backend heroku main
Frontend Deployment on Netlify
Build your React app:

bash
Code kopieren
cd frontend
npm run build
Deploy the build folder using Netlify CLI or drag and drop the build folder on Netlify website.

css
Code kopieren

This README is a complete guide covering all the basics required to get your project up and running, including details for contributions and deployment. Adjust any specific details to match your project's repository URL, additional features, or environment setup.
