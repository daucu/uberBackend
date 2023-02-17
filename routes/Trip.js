const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const Trip_Schema = require("../models/Trip_schema");
// code to get trip data from database and populate driver, user and car data
router.get("/", async (req, res) => {
  try {
    const token = req.headers["token"];
    console.log(token);
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const trip = await Trip_Schema.find().populate([
      {
        path: "driverID",
      },

      {
        path: "userId",
      },

      {
        path: "carID",
      },
      {
        path: "location",
      },
    ]);
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

// code to post trip data to database
router.post("/", async (req, res) => {
  try {
    const token = req.headers["token"];
    console.log(token);
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const trip = new Trip_Schema({
      trip_start_time: req.body.trip_start_time,
      trip_end_time: req.body.trip_end_time,
      wait_time: req.body.wait_time,
      trip_status: req.body.trip_status,
      trip_distance: req.body.trip_distance,
      driverID: req.body.driverID,
      userId: req.body.userId,
      carID: req.body.carID,
      location: req.body.location,
    });
    const newTrip = await trip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

module.exports = router;
