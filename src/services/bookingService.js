const Booking = require("../models/Booking");
const Service = require("../models/Service");

async function createBooking({ clientId, serviceId, scheduledAt, responses }) {
  const service = await Service.findById(serviceId);
  if (!service) throw new Error("Service not found");

  const booking = new Booking({
    service: service._id,
    provider: service.provider,
    client: clientId,
    scheduledAt,
    responses: responses || []
  });

  await booking.save();
  return booking;
}

async function getBookingsForClient(clientId) {
  return Booking.find({ client: clientId }).populate("service");
}
async function getBookingsForProvider({ providerId, status, fromDate, toDate }) {
  const query = { provider: providerId };

  if (status) query.status = status;
  if (fromDate && toDate) {
    query.scheduledAt = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }

  return Booking.find(query)
    .populate("service client")
    .sort({ scheduledAt: 1 });
}


async function updateBookingStatus({ bookingId, providerId, status }) {
  const booking = await Booking.findOne({ _id: bookingId, provider: providerId });
  if (!booking) throw new Error("Booking not found or not authorized");

  booking.status = status;
  await booking.save();
  return booking;
}
module.exports = {
  createBooking,
  getBookingsForClient,
  getBookingsForProvider,
  updateBookingStatus
};
