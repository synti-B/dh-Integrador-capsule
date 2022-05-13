const express = require("express");
const { body } = require("express-validator");
const path = require("path")

const categoryValidator = [
    body("name")
    .notEmpty()
    .withMessage("debe completar el nombre de la categoria"),
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

module.exports = categoryValidator