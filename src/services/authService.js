const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function registerUser({ name, email, password, role }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    passwordHash,
    roles: ["client", "provider"],
    activeRole: role // ✅ CORRECTO
  });

  await user.save();

  const token = jwt.sign(
    {
      id: user._id,
      roles: user.roles,
      activeRole: user.activeRole,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      activeRole: user.activeRole,
    },
  };
}
async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) throw new Error("Invalid credentials");

  const activeRole = user.activeRole || user.roles[0];

  const token = jwt.sign(
    {
      id: user._id,
      roles: user.roles,
      activeRole,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      activeRole,
    }
  };
}
async function switchUserRole(userId, newRole) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (!user.roles.includes(newRole)) {
    const err = new Error("User does not have the requested role");
    err.status = 403;
    throw err;
  }

  user.activeRole = newRole;
  await user.save();

  const token = jwt.sign(
    { id: user._id, roles: user.roles, activeRole: newRole },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      activeRole: newRole,
    }
  };
}

module.exports = { registerUser, loginUser , switchUserRole};
