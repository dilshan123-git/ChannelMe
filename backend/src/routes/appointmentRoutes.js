const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createAppointment,
  getMyAppointments,
  updateAppointmentStatus,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createAppointment
);

router.get(
  "/my",
  authMiddleware,
  getMyAppointments
);

router.patch(
  "/:id/status",
  authMiddleware,
  updateAppointmentStatus
);

module.exports = router;