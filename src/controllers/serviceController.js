const { createService, getServicesByProvider } = require("../services/serviceService");

async function create(req, res, next) {
  try {
    const service = await createService({ providerId: req.user.id, data: req.body });
    res.status(201).json({ message: "Service created", service });
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const services = await getServicesByProvider(req.user.id);
    res.json({ services });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list };
