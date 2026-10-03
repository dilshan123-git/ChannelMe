const express = require("express");

const {
  createClinic,
  getClinics,
} = require("../controllers/clinicController");

const router = express.Router();

router.post("/", createClinic);
router.get("/", getClinics);

module.exports = router;