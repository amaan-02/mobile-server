const express = require("express");
const connectDB = require("./config/Database"); // DB config File
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require('fs');
const path = require('path');

dotenv.config(); // called to load from .ENV file
const PORT = process.env.PORT || 5000;

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Body parser middleware for JSON
app.use(express.urlencoded({ extended: true })); // Body parser middleware for URL-encoded data
app.use(cors()); // Enable CORS for all routes

// Middleware to handle JSON parsing errors
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && 'body' in error && error.status === 400) {
    console.error('Bad JSON error:', error);
    return res.status(400).send({ error: "Invalid JSON payload format." });
  }
  next();
});

// Routes file
app.use("/api/user", require('./routes/userRoutes'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
