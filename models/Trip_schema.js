require("dotenv").config();
const mongoose = require("mongoose");

const trip_schema = new mongoose.Schema({
  driverID: {
    type: mongoose.Types.ObjectId,
    ref: "drivers",
    reqired: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    reqired: true,
  },
  carID: {
    type: mongoose.Types.ObjectId,
    ref: "cars",
    reqired: true,
  },

  location: {
    type: mongoose.Types.ObjectId,
    ref: "locations",
  },
  // start_location_id: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "locations",
  //   reqired: true,
  // },
  // end_location_id: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "locations",
  //   reqired: true,
  // },
  //  get the current timestamp for start time
  trip_start_time: {
    type: Date,
    default: Date.now,
  },
  //  get the current timestamp for end time
  trip_end_time: {
    // set time + 1 hour from start time
    type: Date,
    default: Date.now,
  },
  wait_time: {
    type: Number,
    reqired: true,
  },
  trip_status: {
    type: String,
    reqired: true,
  },
  trip_distance: {
    type: Number,
    reqired: true,
  },
});

module.exports = mongoose.model("trips", trip_schema);
