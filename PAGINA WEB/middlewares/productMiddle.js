const express = require("express");
const { body } = require("express-validator");
const path = require("path")

const productValidator = [
    body("name")
    .notEmpty()
    .withMessage("debe completar el nombre del producto"),
    body("description")
    .notEmpty()
    .withMessage("debe realizar una descripcion breve del producto"),
    body("color")
    .notEmpty()
    .withMessage("debe completar el color"),
    body("stock")
    .notEmpty()
    .withMessage("debe completar el stock"),
    body("discount")
    .notEmpty()
    .withMessage("tiene descuento?")
    .isInt()
    .withMessage("tiene que ser numero"),
    body("price")
    .notEmpty()
    .withMessage("debe colocar un precio a su producto")
    .isInt()
    .withMessage("tiene que ser un numero"),
    body("category")
    .notEmpty()
    .withMessage("seleccione una de las categorias"),
    body("image").custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`las extensiones del archivo permitidas son ${acceptedExtensions.join(',')} `);
            }
        }

        return true;
    })
]

module.exports = productValidator