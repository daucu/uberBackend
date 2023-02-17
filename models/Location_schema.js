require("dotenv").config();
const mongoose = require("mongoose");

// schema
const location_schema = new mongoose.Schema({
  latitude: {
    type: Number,
    reqired: true,
  },
  longitude: {
    type: Number,
    reqired: true,
  },
  landmark_state: {
    type: String,
    reqired: true,
  },
  landmark_city: {
    type: String,
    reqired: true,
  },
  landmark_country: {
    type: String,
    reqired: true,
  },
  landmark_name: {
    type: String,
    reqired: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("locations", location_schema);
