const express = require("express");
const router = express.Router();
const Location_Schema = require("../models/Location_Schema");
const JWT = require("jsonwebtoken");

// code to get location data from database
router.get("/", async (req, res) => {
  try {
    const location = await Location_Schema.find().populate([
      {
        path: "user_id",
      },
    ]);
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

// code to add location data to database
router.post("/", async (req, res) => {
  try {
    const token = req.headers["token"];
    console.log(token);
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const location = new Location_Schema({
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      landmark_state: req.body.landmark_state,
      landmark_city: req.body.landmark_city,
      landmark_country: req.body.landmark_country,
      landmark_name: req.body.landmark_name,
      user_id: decoded.id,
    });
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

module.exports = router;
