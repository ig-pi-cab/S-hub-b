const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const authMiddleware = require("../middlewares/authMiddleware");

const serviceRoutes = require("./services.routes");

router.use("/auth", authRoutes);

// Ruta protegida de prueba
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Authenticated user",
    user: req.user, // { id, role }
  });
});

router.get("/health", (req, res) => res.json({ status: "ok" }));
router.use("/services", serviceRoutes);
module.exports = router;
