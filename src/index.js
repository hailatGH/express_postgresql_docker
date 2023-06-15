// Main imports
const express = require('express')
const cors = require("cors");

// Custom file imports
const db = require("./models");
const initRoutes = require("./routes");

// Initialize express app
const app = express()

// Database Connection Check
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// IIFE to sync db tables
(async () => await db.sequelize.sync())();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: ["Content-Type"],
  })
);

// Routes
initRoutes(app);

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})