const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const validationsRegister = require('../middlewares/userMiddle');
const guesmiddleware = require('../middlewares/guesmiddleware');
const authMiddLeware = require('../middlewares/authMiddleware');
const validationsLogin = require('../middlewares/userLoginMiddleware')
const validationsPass = require('../middlewares/userPassMiddleware')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/users');
    },
    filename: (req, file, cb) => {
        console.log(file);
        let profileUser = `${Date.now()}_user${path.extname(file.originalname)}`;
        cb(null, profileUser);
    }
});

const uploadFile = multer({ storage });
const usersController = require("../controllers/usersController")

// formulario login
router.get("/login", guesmiddleware, usersController.login);
router.post("/login", validationsLogin, usersController.loginProcess);
router.post("/pass", validationsPass, usersController.loginPass);

// creacion del formulario
router.get("/register", guesmiddleware, usersController.register);
// procesamiento del formulario de creacion usuario
router.post("/register", uploadFile.single('avatar'), validationsRegister, usersController.processRegister);
router.get("/profile", authMiddLeware, usersController.profile);
router.get("/logout", usersController.logout);
// eliminar un usuario
router.delete("/delete/:id", usersController.deleteUser);
router.get("/terms", usersController.terms);
router.get("/help", usersController.help);
module.exports = router