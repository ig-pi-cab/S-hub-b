const express = require("express");
const { create, list } = require("../controllers/serviceController");
const validateRequest = require("../middlewares/validateRequest");
const authMiddleware = require("../middlewares/authMiddleware");
const { createServiceSchema } = require("../validations/serviceSchemas");

const router = express.Router();

router.use(authMiddleware); // protege todas las rutas

router.post("/", validateRequest(createServiceSchema), create);
router.get("/", list);

module.exports = router;
