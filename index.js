const express = require("express");
const mongoose = require("mongoose");
const mongoURI = require("./config/keys").mongoURI;
const logger = require("morgan");
const bodyParser = require("body-parser");

// Connect to database
mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to database..."))
  .catch(err => console.log(err));

// Define app
const app = express();

// Routes
const users = require("./routes/users");
const places = require("./routes/places");
const visitations = require("./routes/visitations");

// Middleware
app.use(logger("dev"));
app.use(bodyParser.json());

// Use routes
app.use("/users", users);
app.use("/places", places);
app.use("/visitations", visitations);

// Error catcher
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Handle errors
app.use((err, req, res, next) => {
  const error = app.get("end") === "development" ? err : {};
  const status = err.status || 500;

  // After that respond to client
  res.status(status).json({
    error: {
      message: error.message
    }
  });

  // Push to the terminal
  console.error(err);
});

// Start the server
const port = app.get("port") || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
