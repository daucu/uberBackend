require("dotenv").config();
const mongoose = require("mongoose");

const car_schema = new mongoose.Schema({
  carID: {
    type: String,
    required: true,
  },
  carname: {
    type: String,
    required: true,
  },
  carmodel: {
    type: String,
    required: true,
  },
  carcolor: {
    type: String,
    required: true,
  },
  carnumber: {
    type: String,
    required: true,
  },
  carimage: {
    type: String,
    required: true,
  },
  carType: {
    type: String,
    required: true,
  },
  baseRate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("cars", car_schema);
