const express = require("express");
const { body } = require("express-validator");
const path = require("path")

const colorValidator = [
    body("name")
    .notEmpty()
    .withMessage("debe completar el nombre del color"),

]

module.exports = colorValidator