const express = require("express");
const router = express.Router();
const path = require("path");
const apiTotalController = require("../../controllers/apiController/apiTotalController");


router.get("/", apiTotalController.listTotal);


module.exports = router