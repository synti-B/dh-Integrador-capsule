const express = require("express");
const router = express.Router();
const path = require("path");
const apiProductController = require("../../controllers/apiController/apiProductController");



router.get("/", apiProductController.listProducts);
router.get("/search", apiProductController.searchProducts);
router.get("/:id", apiProductController.productId)
router.post("/", apiProductController.storeProduct);
router.delete("/:id", apiProductController.deleteProduct);

router.put("/update/:id");

module.exports = router