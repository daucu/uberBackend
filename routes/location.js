const express = require("express");
const router = express.Router();
const Location_Schema = require("../models/Location_schema");
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

// code to get location data from database by id
router.get("/:id", async (req, res) => {
  try {
    const location = await Location_Schema.findById(req.params.id).populate([
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
      destination_longitude: req.body.destination_longitude,
      destination_latitude: req.body.destination_latitude,
      user_id: decoded.id,
    });
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

// code to delete location data from database by id
router.delete("/:id", async (req, res) => {
  try {
    const location = await Location_Schema.findById(req.params.id);
    if (location == null) {
      return res.status(404).json({ message: "Cannot find location" });
    }
    await location.remove();
    res.json({ message: "Deleted location" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

module.exports = router;
