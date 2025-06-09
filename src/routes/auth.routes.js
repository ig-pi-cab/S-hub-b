const express = require("express");
const { register, login, switchRole, googleCallback } = require("../controllers/authController");
const validateRequest = require("../middlewares/validateRequest");
const { registerSchema, loginSchema } = require("../validations/authSchemas");
const authMiddleware = require("../middlewares/authMiddleware");
const passport = require("passport");
const router = express.Router();

// Registro de usuario
router.post("/register", validateRequest(registerSchema), register);

// Login de usuario
router.post("/login", validateRequest(loginSchema), login);
router.post("/switch-role", authMiddleware, switchRole);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);


module.exports = router;
