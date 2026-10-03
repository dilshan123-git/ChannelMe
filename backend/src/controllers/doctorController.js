const Doctor = require("../models/Doctor");

exports.createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);

    const populatedDoctor = await Doctor.findById(
      doctor._id
    )
      .populate("specialization")
      .populate("clinic");

    res.status(201).json({
      message: "Doctor created",
      data: populatedDoctor,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create doctor",
      error: error.message,
    });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("specialization")
      .populate("clinic");

    res.json({
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate("specialization")
      .populate("clinic");

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.json({
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch doctor",
      error: error.message,
    });
  }
};