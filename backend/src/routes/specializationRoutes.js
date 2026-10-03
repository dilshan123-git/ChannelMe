const express = require("express");

const {
  createSpecialization,
  getSpecializations,
} = require("../controllers/specializationController");

const router = express.Router();

router.post("/", createSpecialization);
router.get("/", getSpecializations);

module.exports = router;