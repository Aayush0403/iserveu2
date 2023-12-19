const mongoose = require("mongoose");
require("colors");


//database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Mongodb connected to ${mongoose.connection.host}`.bgGreen);
  } catch (err) {
    console.log(`Mongodb Server Issue ${err}`.bgRed);
  }
};

module.exports = connectDB;