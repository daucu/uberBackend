const express = require("express");
const router = express.Router();
const carSchema = require("../models/Car_schema");
const upload = require("../config/image_upload");

router.get("/", async (req, res) => {
  try {
    const car = await carSchema.find();
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "error in getting car", status: "error" });
  }
});

router.post("/", upload.single("picture"), async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
//   console.log(req.body);

  // code to genreate random   carID with 6 digits and 7 characters
  var carID = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (var i = 0; i < 18; i++)
    carID += possible.charAt(Math.floor(Math.random() * possible.length));
//   console.log(carID);

  const car = new carSchema({
    carID: carID,
    carname: req.body.carname,
    carmodel: req.body.carmodel,
    carcolor: req.body.carcolor,
    carnumber: req.body.carnumber,
    carType: req.body.carType,
    baseRate: req.body.baseRate,
    carimage: url + "/medias/" + req.file.filename,
  });

  try {
    const newcar = await car.save();
    res.status(201).json(newcar);
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

module.exports = router;
