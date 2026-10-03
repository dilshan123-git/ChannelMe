const Appointment = require("../models/Appointment");

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      ...req.body,
      patient: req.user.id,
    });

    const populatedAppointment =
      await Appointment.findById(appointment._id)
        .populate("patient", "name email")
        .populate("doctor");

    res.status(201).json({
      message: "Appointment created",
      data: populatedAppointment,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create appointment",
      error: error.message,
    });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const appointments =
      await Appointment.find({
        patient: req.user.id,
      })
        .populate("doctor")
        .sort({ appointmentDate: 1 });

    res.json({
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};

exports.updateAppointmentStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const appointment =
      await Appointment.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.json({
      message: "Appointment status updated",
      data: appointment,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update appointment",
      error: error.message,
    });
  }
};