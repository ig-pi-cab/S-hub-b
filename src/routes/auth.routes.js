const express = require("express");
const { register, login } = require("../controllers/authController");
const validateRequest = require("../middlewares/validateRequest");
const { registerSchema, loginSchema } = require("../validations/authSchemas");

const router = express.Router();

// Registro de usuario
router.post("/register", validateRequest(registerSchema), register);

// Login de usuario
router.post("/login", validateRequest(loginSchema), login);

module.exports = router;
