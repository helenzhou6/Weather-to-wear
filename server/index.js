const express = require("express");
const request = require("request");
const env = require("env2")("./.env");
const dummyData = require("./dummyData.json");

const app = express();

app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api/darksky/:latitude/:longitude", (req, res) => {
  // request(`https://api.darksky.net/forecast/${process.env.API_KEY}/${req.params.latitude},${req.params.longitude}`, (_err, _response, body) => {
  //   res.json(body);
  // });
  res.json(dummyData);
});

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`app is running on http://${host}:${port}`);
});