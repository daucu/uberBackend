require("dotenv").config();
const mongoose = require("mongoose");

const driver_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    reqired: true,
  },

  address: {
    type: String,
    reqired: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    reqired: true,
  },
  age: {
    type: String,
    reqired: true,
  },
  license: {
    type: String,
    reqired: true,
  },
  carID: {
    type: mongoose.Types.ObjectId,
    ref: "cars",
    // reqired: true,
  },
  joindate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("drivers", driver_schema);
