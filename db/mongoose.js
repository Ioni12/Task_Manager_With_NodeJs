const mongoose = require("mongoose");
require("dotenv").config();

const connectionURL = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(connectionURL);
    console.log(`MongoDb Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to mongoDB", error);
    process.exit(1);
  }
};
