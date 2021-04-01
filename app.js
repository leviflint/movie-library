const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

//Import Routes
const postsRoute = require("./routes/posts");

//Middlewares - function that executes when routes are being hit
app.use(cors({

  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },

  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],

  credentials: true,
}));
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/posts", postsRoute);

//Home Route
app.get("/", (req, res) => {
  res.send("We are on home");
});

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to database.");
  }
);

//Boot server
app.listen(process.env.PORT || 3000);
