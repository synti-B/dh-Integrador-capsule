const fs = require('fs');
const path = require('path');
const db = require("../../database/models");
const { Op } = require("sequelize");

let direccion = "http://localhost:3050/img/category/";

const apiCategoryController = {

    listCategories: (req, res) => {
        db.ProductCategory.findAll()
            .then((categories) => { 
                categories.forEach( categories=> {
                    categories.dataValues.image = direccion + categories.dataValues.image
                });
                if (categories.length > 0) {
                    return res.status(200).json({
                        total: categories.length,
                        data: categories,
                        status: 200
                    })
                }
                return res.status(200).json('No se existen en la BD')
            })
        }}

module.exports = apiCategoryController