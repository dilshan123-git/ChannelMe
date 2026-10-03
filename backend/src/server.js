const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/database");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use(
  "/api/specializations",
  require("./routes/specializationRoutes")
);

app.use(
  "/api/clinics",
  require("./routes/clinicRoutes")
);

app.use(
  "/api/doctors",
  require("./routes/doctorRoutes")
);

app.use(
  "/api/appointments",
  require("./routes/appointmentRoutes")
);

app.use(
  "/api/payments",
  require("./routes/paymentRoutes")
);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Healthcare Appointment API is running",
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});