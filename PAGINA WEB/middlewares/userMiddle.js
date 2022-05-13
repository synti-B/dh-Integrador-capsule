const express = require("express");
const path = require('path');
//const { body, validatorResult } = require("express-validator");
const { body } = require('express-validator')
const validations = [
    body('first_name')
    .notEmpty()
    .withMessage('Tienes que escribir tu nombre'),
    body('last_name')
    .notEmpty()
    .withMessage('Tienes que escribir tu apellido'),
    body('email')
    .notEmpty()
    .withMessage('Tienes que escribir un correo electronico')
    .isEmail()
    .withMessage('Debes escribir un correo electronico válido')
    .bail(),
    body('password')
    .notEmpty()
    .withMessage('Tienes que escribir una contraseña'),
    body('avatar')
    .custom((value, { req }) => {
        let file = req.file;
        let imgDef = req.body.imgDefault
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

        if (!file && !imgDef) {
            throw new Error('Tienes que subir una imagen o tildar Usar avatar');
        } else if (file && !imgDef) {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`las extensiones del archivo permitidas son ${acceptedExtensions.join(',')} `);
            }
        } else {

        }

        return true;
    })
]

module.exports = validations;