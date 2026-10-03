const express = require("express");

const {
  createPayment,
  getPaymentByAppointment,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/", createPayment);

router.get(
  "/appointment/:appointmentId",
  getPaymentByAppointment
);

module.exports = router;