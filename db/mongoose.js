const mongoose = require("mongoose");
require("dotenv").config();

const connectionURL = process.env.MONGODB_URI;

mongoose
  .connect(connectionURL)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => console.error("error connecting to MongoDB: ", error));
