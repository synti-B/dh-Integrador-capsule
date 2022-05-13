const fs = require('fs');
const path = require('path');
const db = require("../../database/models");
const { Op } = require("sequelize");

let direccion = "http://localhost:3050/img/brand/";

const apiBrandsController = {
    listBrands: (req, res) => {
        db.ProductBrand.findAll()
            .then((brands) => { 
                brands.forEach( brand=> {
                    brand.dataValues.image = direccion + brand.dataValues.image
                });
                if (brands.length > 0) {
                    return res.status(200).json({
                        total: brands.length,
                        data: brands,
                        status: 200
                    })
                }
                return res.status(200).json('No se existen en la BD')
            })
        }}

module.exports = apiBrandsController