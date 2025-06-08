const {
  createBooking,
  getBookingsForClient,
  getBookingsForProvider,
  updateBookingStatus
} = require("../services/bookingService");

async function create(req, res, next) {
  try {
    const booking = await createBooking({
      clientId: req.user.id,
      ...req.body
    });
    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    next(err);
  }
}

async function listClientBookings(req, res, next) {
  try {
    const bookings = await getBookingsForClient(req.user.id);
    res.json({ bookings });
  } catch (err) {
    next(err);
  }
}

async function listProviderBookings(req, res, next) {
  try {
    const { status, fromDate, toDate } = req.query;

    const filters = {
      providerId: req.user.id,
      ...(status && { status }),
      ...(fromDate && toDate && { fromDate, toDate }),
    };

    const bookings = await getBookingsForProvider(filters);
    res.json({ bookings });
  } catch (err) {
    next(err);
  }
}


async function confirmBooking(req, res, next) {
  try {
    const booking = await updateBookingStatus({
      bookingId: req.params.id,
      providerId: req.user.id,
      status: "confirmed"
    });
    res.json({ message: "Booking confirmed", booking });
  } catch (err) {
    next(err);
  }
}

async function cancelBooking(req, res, next) {
  try {
    const booking = await updateBookingStatus({
      bookingId: req.params.id,
      providerId: req.user.id,
      status: "cancelled"
    });
    res.json({ message: "Booking cancelled", booking });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  create,
  listClientBookings,
  listProviderBookings,
  confirmBooking,
  cancelBooking
};
