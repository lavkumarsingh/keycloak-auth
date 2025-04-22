import express from 'express';
import session from 'express-session'; // No need for connect-redis
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/authRoute.js'; // Assuming you have an auth route
dotenv.config();

// Create Express app
const app = express();

// Initialize session storage with default memory store
app.use(
    session({
      secret: 'keyboard cat', // Replace with a stronger secret
      resave: false,           // Do not save the session if it hasn't been modified
      saveUninitialized: false, // Do not store uninitialized sessions
      cookie: {
        httpOnly: true,        // Helps mitigate XSS
        secure: false,         // Set to true for HTTPS
        maxAge: 1000 * 60 * 60 * 24, // Session expires after 1 day
      },
    })
  );

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

  

// Middleware to parse JSON bodies
app.use(express.json());

// Use the authentication routes (make sure authRoute.js handles the logic)
app.use('/auth', authRoute);

// Define the port to listen on
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
