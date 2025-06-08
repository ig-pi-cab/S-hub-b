const express = require("express");
const { create, list, update, remove } = require("../controllers/serviceController");
const validateRequest = require("../middlewares/validateRequest");
const authMiddleware = require("../middlewares/authMiddleware");
const { createServiceSchema, updateServiceSchema } = require("../validations/serviceSchemas");

const router = express.Router();

router.get("/", authMiddleware, list);
router.post("/", authMiddleware, validateRequest(createServiceSchema), create);
router.patch("/:id", authMiddleware, validateRequest(updateServiceSchema), update);
router.delete("/:id", authMiddleware, remove);

module.exports = router;
