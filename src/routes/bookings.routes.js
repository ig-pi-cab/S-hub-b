const express = require("express");
const {
  create,
  listClientBookings,
  listProviderBookings,
  confirmBooking,
  cancelBooking
} = require("../controllers/bookingController");
const validateRequest = require("../middlewares/validateRequest");
const authMiddleware = require("../middlewares/authMiddleware");
const { createBookingSchema } = require("../validations/bookingSchemas");
const { requireRole } = require("../middlewares/roleAuth");
console.log("typeof requireRole:", typeof requireRole);
console.log("typeof requireRole('provider'):", typeof requireRole("provider"));
const router = express.Router();
router.use(authMiddleware);

router.post("/", validateRequest(createBookingSchema), create);
router.get("/", listClientBookings);
router.get("/provider", requireRole("provider"), listProviderBookings);
router.patch("/:id/confirm", requireRole("provider"), confirmBooking);
router.patch("/:id/cancel", requireRole("provider"), cancelBooking);

module.exports = router;
