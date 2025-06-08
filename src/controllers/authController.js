const { registerUser, loginUser, switchUserRole } = require("../services/authService");


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
module.exports = { register, login , switchRole};
