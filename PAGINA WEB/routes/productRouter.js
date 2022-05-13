const express = require("express");
const router = express.Router();
const path = require("path");
const productController = require("../controllers/productController");
const multer = require("multer");
const { body } = require("express-validator");
const productValidator = require("../middlewares/productMiddle")
const adminMiddleware = require('../middlewares/adminMiddleware')


const fileStorageEngine = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/img/product');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}--${file.originalname}`)
    }
});

const upload = multer({ storage: fileStorageEngine });

router.get("/", productController.listProducts);
router.get("/brand/:brand", productController.listBrands)
router.get("/category/:category", productController.listCategories)
router.get("/search", productController.searchProduct)
router.get("/id", productController.IdProduct)

router.get("/detail/:id", productController.detailProduct);
router.get("/create", adminMiddleware, productController.create);
router.post("/create", adminMiddleware, upload.single('image'), productValidator, productController.store);

router.get("/edit/:id", adminMiddleware, productController.editProduct);
router.put("/update/:id", adminMiddleware, upload.single('image'), productController.updateProduct);

router.delete("/delete/:id", adminMiddleware, productController.delete);

module.exports = router