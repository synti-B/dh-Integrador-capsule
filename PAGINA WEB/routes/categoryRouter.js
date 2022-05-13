const express = require("express");
const router = express.Router();
const path = require("path");
const categoriesController = require("../controllers/categoriesController");
const multer = require("multer");
const { body } = require("express-validator");
const categoryValidator = require("../middlewares/categoryMiddle")
const adminMiddleware = require('../middlewares/adminMiddleware')



const fileStorageEngine = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/img/category');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}--${file.originalname}`)
    }
});

const upload = multer({ storage: fileStorageEngine });

router.get("/", categoriesController.listCategories);


router.get("/create", adminMiddleware, categoriesController.create);
router.post("/create", adminMiddleware, upload.single('image'), categoryValidator, adminMiddleware, categoriesController.store);

router.get("/edit/:id", adminMiddleware, categoriesController.editCategory);
router.put("/update/:id", adminMiddleware,upload.single('image'),categoriesController.updateCategory);

router.delete("/delete/:id", adminMiddleware, categoriesController.delete);

module.exports = router