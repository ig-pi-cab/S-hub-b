const { registerUser, loginUser, switchUserRole } = require("../services/authService");
const jwt = require("jsonwebtoken");


async function register(req, res, next) {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    next(err);
  }
}
async function login(req, res, next) {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function switchRole(req, res, next) {
  try {
    const result = await switchUserRole(req.user.id, req.body.newRole);
    res.status(200).json({ message: "Role switched successfully", ...result });
  } catch (err) {
    next(err);
  }
}

async function googleCallback(req, res) {
  const user = req.user; // Inyectado por passport

  const token = jwt.sign(
    {
      id: user._id,
      roles: user.roles,
      activeRole: user.activeRole || user.roles[0],
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // Puedes redirigir con el token como query string, o devolver JSON si estás en popup
  return res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
}
module.exports = { register, login , switchRole, googleCallback};
