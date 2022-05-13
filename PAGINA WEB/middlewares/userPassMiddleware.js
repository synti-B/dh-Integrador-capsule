const express = require("express");
const path = require('path');

const { body } = require('express-validator')

const validations = [

    body('password').notEmpty().withMessage('Tienes que escribir una contraseña').bail(),
]

module.exports = validations;