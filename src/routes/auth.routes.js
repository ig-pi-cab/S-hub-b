const express = require("express");
const { register, login, switchRole } = require("../controllers/authController");
const validateRequest = require("../middlewares/validateRequest");
const { registerSchema, loginSchema } = require("../validations/authSchemas");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Registro de usuario
router.post("/register", validateRequest(registerSchema), register);

// Login de usuario
router.post("/login", validateRequest(loginSchema), login);
router.post("/switch-role", authMiddleware, switchRole);

module.exports = router;
