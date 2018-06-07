const express = require("express");
const request = require("request");
const env = require("env2")("../.env");
const dummyData = require("./dummyData.json");

const app = express();

app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api/darksky/:latitude/:longitude", (req, res) => {
  // const { latitude, longitude } = req.params;
  // request(`https://api.darksky.net/forecast/${process.env.API_KEY}/${latitude},${longitude}`, (err, _response, body) => {
  // if (err) {
  // console.log(`Error with the API request to dark sky ${err}`)
  //   res.json({
  //     error: "Oops, an error on our end, try again later"
  //   });
  // } else {
  //   res.json(body);
  // }
  // });
  res.json(dummyData);
});

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`app is running on http://${host}:${port}`);
});