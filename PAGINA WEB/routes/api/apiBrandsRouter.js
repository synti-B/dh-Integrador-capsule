const express = require("express");
const router = express.Router();
const path = require("path");
const apiBrandsController = require("../../controllers/apiController/apiBrandsController");

router.get("/", apiBrandsController.listBrands);

module.exports = router