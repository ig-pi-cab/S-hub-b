const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["provider", "client"]).optional() // ← aquí estaba el error
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
module.exports = { registerSchema, loginSchema };
