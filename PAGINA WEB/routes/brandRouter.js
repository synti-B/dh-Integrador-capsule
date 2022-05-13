const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const brandsController = require("../controllers/brandsController");
const brandMiddle = require("../middlewares/brandMiddle")
const adminMiddleware = require('../middlewares/adminMiddleware')



const fileStorageEngine = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/img/brand');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}--${file.originalname}`)
    }
});

const upload = multer({ storage: fileStorageEngine });



router.get("/", brandsController.listBrands);

router.get("/create", adminMiddleware, brandsController.create);
router.post("/create", adminMiddleware, upload.single('image'), brandMiddle, brandsController.store);

router.get("/edit/:id", adminMiddleware, brandsController.editBrand);
router.put("/update/:id", adminMiddleware, upload.single('image'), brandsController.updateBrand);

router.delete("/delete/:id", adminMiddleware, brandsController.delete);

module.exports = router