const { z } = require("zod");

const customFieldSchema = z.object({
  label: z.string().min(1),
  type: z.enum(["text", "textarea", "select"]),
  options: z.array(z.string()).optional(),
});

const createServiceSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(0),
  durationMinutes: z.number().min(1).optional(),
  customFields: z.array(customFieldSchema).optional(),
});

module.exports = { createServiceSchema };
