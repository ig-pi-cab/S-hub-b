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

module.exports = { createService, getServicesByProvider };
