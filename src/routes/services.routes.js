const express = require("express");
const { create, list, update, remove } = require("../controllers/serviceController");
const validateRequest = require("../middlewares/validateRequest");
const authMiddleware = require("../middlewares/authMiddleware");
const { createServiceSchema, updateServiceSchema } = require("../validations/serviceSchemas");

const router = express.Router();

router.use(authMiddleware);
router.post("/", validateRequest(createServiceSchema), create);
router.get("/", list);
router.patch("/:id", validateRequest(updateServiceSchema), update);
router.delete("/:id", remove);
module.exports = router;
