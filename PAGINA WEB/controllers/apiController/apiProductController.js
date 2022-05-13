const fs = require('fs');
const path = require('path');
const db = require("../../database/models");
const { Op } = require("sequelize");


let direccion = "http://localhost:3050/img/product/";

const apiProductController = {

    listProducts: (req, res) => {
        db.Product.findAll({
                include: [{ association: "productscategories" },
                    { association: "productscolors" },
                    { association: "productsbrands" }
                ]
            })
            .then((products) => {
                let productCategory = []
                products.forEach(product => {
                    productCategory.push(`${product.productscategories.name}`)
                });
                let countCategory = productCategory.reduce((a, d) => (a[d] ? a[d] += 1 : a[d] = 1, a), {});

                products.forEach(product => {
                    product.dataValues.image = direccion + product.dataValues.image
                });

                if (products.length > 0) {
                    return res.status(200).json({
                        total: products.length,
                        ProdCategories: countCategory,
                        data: products,
                        status: 200
                    })
                }
                return res.status(200).json('No se existen en la BD')

            })
    },
    productId: (req, res) => {
        db.Product.findByPk(req.params.id, {
                include: [{ association: "productscategories" },
                    { association: "productscolors" },
                    { association: "productsbrands" }
                ]
            })
            .then((product) => {
                product.dataValues.image = direccion + product.dataValues.image
                if (product) {
                    return res.status(200).json({
                        data: product,
                        status: 200
                    })
                }
                return res.status(200).json('No se existe en la BD')
            })
    },
    storeProduct: (req, res) => {
        db.Product.create(req.body)
            .then((product) => {
                return res.status(200).json({
                    data: product,
                    status: 200,
                    created: "Ok"
                })

            })
    },
    deleteProduct: (req, res) => {
        db.Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((response) => {
                return res.status(200).json('Eliminado correctamente')

            })

    },
    searchProducts: (req, res) => {
        db.Product.findAll({
                where: {
                    [Op.or]: [{
                            name: {
                                [Op.like]: `%${req.query.busqueda}%`
                            }
                        },
                        {
                            description: {
                                [Op.like]: `%${req.query.busqueda}%`
                            }
                        }
                    ]
                },
                include: [{ association: "productscategories" },
                    { association: "productscolors" },
                    { association: "productsbrands" }
                ]
            })
            .then((products) => {
                products.forEach(product => {
                    product.dataValues.image = direccion + product.dataValues.image

                });
                if (products.length > 0) {
                    let productCategory = []
                    products.forEach(product => {
                        productCategory.push(product.productscategories.name)
                    });
                    let countCategory = productCategory.reduce((a, d) => (a[d] ? a[d] += 1 : a[d] = 1, a), {});

                    return res.status(200).json({
                        total: products.length,
                        ProdCategories: countCategory,
                        data: products,
                        status: 200
                    })
                }
                return res.status(200).json('No existen productos')

            })
    },

}
module.exports = apiProductController