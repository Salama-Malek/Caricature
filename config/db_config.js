const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const DB_URL = process.env.DB_URL;

mongoose.connection.on("connected", () => {
  console.log("*-------------------Database Connected--------------------*");
});

mongoose.connection.on("error", (err) => {
  console.log(`-------------------Error In Database-------------------`);
});

const dbConnection = mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = dbConnection;
