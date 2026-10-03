const Specialization = require("../models/Specialization");

exports.createSpecialization = async (req, res) => {
  try {
    const specialization =
      await Specialization.create(req.body);

    res.status(201).json({
      message: "Specialization created",
      data: specialization,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create specialization",
      error: error.message,
    });
  }
};

exports.getSpecializations = async (req, res) => {
  try {
    const specializations =
      await Specialization.find();

    res.json({
      data: specializations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch specializations",
      error: error.message,
    });
  }
};