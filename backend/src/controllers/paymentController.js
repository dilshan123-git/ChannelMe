const Payment = require("../models/Payment");

exports.createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);

    const populatedPayment =
      await Payment.findById(payment._id)
        .populate("appointment");

    res.status(201).json({
      message: "Payment created",
      data: populatedPayment,
    });
  } catch (error) {
    res.status(400).json({
      message: "Payment creation failed",
      error: error.message,
    });
  }
};

exports.getPaymentByAppointment = async (
  req,
  res
) => {
  try {
    const payment = await Payment.findOne({
      appointment: req.params.appointmentId,
    }).populate("appointment");

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.json({
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch payment",
      error: error.message,
    });
  }
};