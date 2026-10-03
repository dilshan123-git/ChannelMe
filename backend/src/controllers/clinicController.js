const Clinic = require("../models/Clinic");

exports.createClinic = async (req, res) => {
  try {
    const clinic = await Clinic.create(req.body);

    res.status(201).json({
      message: "Clinic created",
      data: clinic,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create clinic",
      error: error.message,
    });
  }
};

exports.getClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find();

    res.json({
      data: clinics,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch clinics",
      error: error.message,
    });
  }
};