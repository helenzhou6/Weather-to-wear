const express = require("express");
const request = require("request");
const env = require("env2")("../.env");
const path = require("path");

const app = express();

app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/api/darksky/:latitude/:longitude", (req, res) => {
  const { latitude, longitude } = req.params;
  request(`https://api.darksky.net/forecast/${process.env.API_KEY}/${latitude},${longitude}`, (err, response, body) => {
    if (err) {
      console.log(`Error with the API request to dark sky ${err}`);
      res.json({
        error: "Oops, an error on our end, try again later"
      });
    } else {
      res.send(body);
    }
  });
});

app.get("/api/geolocate/:address", (req, res) => {
  const { address } = req.params;
  request(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=`, (err, response, body) => {
    if (err) {
      console.log(`Error with the API request to Google API - ${err}`);
      res.json({
        error: "Oops, an error on our end, try again later"
      });
    } else if (body.error_message) {
      console.log(`Error with the API request to Google API - ${body.error_message}`);
      res.json({
        error: "Oops, an error on our end, try again later"
      });
    } else {
      res.send(body);
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is running on http://${host}:${port}`);
});