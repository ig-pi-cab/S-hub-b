const { z } = require("zod");

const fieldResponseSchema = z.object({
  label: z.string(),
  value: z.string()
});

const createBookingSchema = z.object({
  serviceId: z.string(),
  scheduledAt: z.string().datetime(),
  responses: z.array(fieldResponseSchema).optional()
});

module.exports = { createBookingSchema };
