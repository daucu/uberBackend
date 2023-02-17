require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log(
      "Uber Database Connected Successfuly----------------------"
    );
  } catch (error) {
    console.log("(Uber Connection error) ", error);
  }
};
module.exports = connectDB;
