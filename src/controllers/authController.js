const { registerUser, loginUser } = require("../services/authService");


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

async function switchUserRole(req, res, next) {
  try {
    const { newRole } = req.body;
    const userId = req.user.id;

    if (!newRole) {
      return res.status(400).json({ message: "Missing newRole in request body" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.roles.includes(newRole)) {
      return res.status(403).json({ message: "User does not have the requested role" });
    }

    user.activeRole = newRole;
    await user.save();

    const token = jwt.sign(
      { id: user._id, roles: user.roles, activeRole: newRole },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Role switched successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        activeRole: newRole,
      }
    });
  } catch (err) {
    next(err);
  }
}
module.exports = { register, login , switchUserRole};
