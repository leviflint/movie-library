const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

//Import Routes
const postsRoute = require("./routes/posts");

//Middlewares - function that executes when routes are being hit
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/posts", postsRoute);

//Home Route
app.get("/", (req, res) => {
  res.send("We are on home");
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to DB!");
});

//Boot server
app.listen(3000);