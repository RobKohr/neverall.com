require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/" + process.env.dbName, {
  useNewUrlParser: true,
});
var MongoDBStore = require("connect-mongodb-session")(session);

// run the build of the server
app.use(express.static("build"));

app.listen(process.env.serverPort, () => {
  console.info(
    "\n\n\n\n======================================================\n"
  );
  console.info(`App listening at http://localhost:${process.env.serverPort}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function timeLog(req, res, next) {
  console.info({
    "Time:": new Date(),
    url: req.originalUrl,
    body: req.body,
  });
  next();
});

console.info("Mongo connected, starting api");

app.use("/api", require("./api/api"));

// Add mongodb session support
const mongoUrl = process.env.mongoUrl;
const dbName = process.env.dbName;
console.log({
  uri: `${mongoUrl}/${dbName}`,
  collection: "sessions",
});

var store = new MongoDBStore({
  uri: `${mongoUrl}/${dbName}`,
  collection: "sessions",
});
app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
  })
);
