const { createService, getServicesByProvider, updateService, deleteService } = require("../services/serviceService");

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

async function update(req, res, next) {
  try {
    const updated = await updateService(req.params.id, req.user.id, req.body);
    res.json({ message: "Service updated", service: updated });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await deleteService(req.params.id, req.user.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, update, remove };
