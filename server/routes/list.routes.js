const express = require("express");
const router = express.Router();
const controller = require("../controllers/list.controller");
const validateList = require("../validators/list.validator");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", validateList, controller.create);
router.put("/:id", validateList, controller.update);
router.delete("/:id", controller.remove);

module.exports = router;

