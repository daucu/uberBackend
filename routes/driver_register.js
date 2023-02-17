const express = require("express");
const router = express.Router();
const driverSchema = require("../models/Driver_schema");
const bcryptjs = require("bcryptjs");
const upload = require("../config/image_upload");

router.get("/", async (req, res) => {
  try {
    const driver = await driverSchema.find().populate([
      {
        path: "carID",
      },
    ]);
    res.json(driver);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in getting driver", status: "error" });
  }
});

router.post("/", upload.single("picture"), async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  //   console.log(req.body);

  const salt = await bcryptjs.genSalt();
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);

  const driver = new driverSchema({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    username: req.body.username,
    password: hashedPassword,
    age: req.body.age,
    license: req.body.license,
    carID: req.body.carID,
    image: url + "/medias/" + req.file.filename,
  });

  try {
    const newDriver = await driver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

module.exports = router;
