const express = require("express");
const router = express.Router();
const path = require("path");
const apiCategoriesController = require("../../controllers/apiController/apiCategoriesController");

router.get("/", apiCategoriesController.listCategories);

module.exports = router