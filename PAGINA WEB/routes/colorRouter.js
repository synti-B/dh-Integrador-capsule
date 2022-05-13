const express = require("express");
const router = express.Router();
const path = require("path");
const colorsController = require("../controllers/colorsController");
const colorMiddle = require("../middlewares/colorMiddle")
const adminMiddleware = require('../middlewares/adminMiddleware')



router.get("/", adminMiddleware, colorsController.listColors);

router.get("/create", adminMiddleware, colorsController.create);
router.post("/create", adminMiddleware, colorMiddle, colorsController.store);

router.get("/edit/:id", adminMiddleware, colorsController.editColor);
router.put("/update/:id", adminMiddleware, colorsController.updateColor);

router.delete("/delete/:id", adminMiddleware, colorsController.delete);

module.exports = router