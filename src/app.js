const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
//////// to move views folder to any where
const path = require("path");
const viewsDir = path.join(__dirname, "../template/views");
app.set("view engine", "hbs");
app.set("views", viewsDir);
//////// to use static files
const puplicDir = path.join(__dirname, "../public");
app.use(express.static(puplicDir));
//////// to define parials folder
const hbs = require("hbs");
const partialsDir = path.join(__dirname, "../template/partials");
hbs.registerPartials(partialsDir);
//////// to use request for api
const request = require("request");
const { rmSync } = require("fs");
const myUrl =
  "https://newsapi.org/v2/top-headlines?country=eg&apiKey=e011bdf7732e4ba2a4224c95b03ecfd8";
app.get("/", (req, res) => {
  request(
    {
      url: myUrl,
      json: true,
      headers: {
        "User-Agent": "MY IPHINE 7s",
      },
    },
    (error, response) => {
      if (error) {
        console.log("Weak Connection or invalid URL");
      } else if (response.body.message) {
        console.log(response.body.message);
      } else if (response.body.totalResults == 0) {
        console.log("invalid country name");
      } else {
        res.render("index", {
          res: response.body,
          articles0: response.body.articles[0],
          articles1: response.body.articles[1],
          articles2: response.body.articles[2],
          articles3: response.body.articles[3],
          articles4: response.body.articles[4],
          articles5: response.body.articles[5],
          articles6: response.body.articles[6],
        });
      }
    }
  );
});
app.get("/about", (req, res) => {
  res.render("underDevelping", { title: "about" });
});
app.get("/*", (req, res) => {
  res.render("404", { title: "error" });
});

app.listen(port, (req, res) => {});
