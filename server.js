const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const speakerRoute = require("./routes/speakers");

const app = express();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.ATLAS_URI;
const port = process.env.PORT;

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/speakers", speakerRoute);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
