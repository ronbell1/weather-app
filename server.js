const express = require("express");
const axios = require("axios");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = "f50cf407673c2b3f7b574130f2b01831";

  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  let weather;
  let error = null;

  try {
    const response = await axios.get(APIUrl);
    weather = response.data;
  } catch (err) {
    weather = null;
    error = "Error, Please try again";
  }

  res.render("index", { weather, error });
});

// Function to start the server
const startServer = (port) => {
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
};

// Start the server on multiple ports
const ports = [process.env.PORT || 5000];
ports.forEach((port) => startServer(port));
