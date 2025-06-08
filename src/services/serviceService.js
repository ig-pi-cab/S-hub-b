const Service = require("../models/Service");

async function createService({ providerId, data }) {
  const service = new Service({
    provider: providerId,
    ...data
  });
  await service.save();
  return service;
}

async function getServicesByProvider(providerId) {
  return Service.find({ provider: providerId });
}

async function updateService(serviceId, providerId, data) {
  const service = await Service.findOne({ _id: serviceId, provider: providerId });
  if (!service) throw new Error("Service not found or not authorized");

  Object.assign(service, data);
  await service.save();
  return service;
}

async function deleteService(serviceId, providerId) {
  const result = await Service.deleteOne({ _id: serviceId, provider: providerId });
  if (result.deletedCount === 0) throw new Error("Service not found or not authorized");
  return true;
}

module.exports = { createService, getServicesByProvider, updateService, deleteService };
