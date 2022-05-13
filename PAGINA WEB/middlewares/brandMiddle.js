const express = require("express");
const { body } = require("express-validator");
const path = require("path")

const brandValidator = [
    body("name")
    .notEmpty()
    .withMessage("debe completar el nombre de la Marca"),
]

module.exports = brandValidator