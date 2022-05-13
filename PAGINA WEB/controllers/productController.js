const path = require('path');
const { validationResult } = require('express-validator');
const db = require("../database/models");
const { Op } = require("sequelize");

const productController = {
    listProducts: (req, res) => {
        let Product = db.Product.findAll({
            order: [
                ["discount", "DESC"]
            ],
            include: [{ association: "productscategories" },
                { association: "productscolors" },
                { association: "productsbrands" }
            ]
        });
        let Categ = db.ProductCategory.findAll();
        let Col = db.ProductColor.findAll();
        let Bran = db.ProductBrand.findAll();
        Promise
            .all([Product, Categ, Col, Bran])
            .then(([products, categories, colors, brands]) => {
                res.render("products/products", { products, categories, colors, brands });
            }).catch(
                err => { console.log(err) }
            )
    },
    listBrands: (req, res) => {
        db.ProductBrand.findAll({
                where: {
                    name: req.params.brand
                },
                include: [{ association: "productsbrand" }]
            })
            .then((products) => {
                res.render("products/brandProduct", { products: products[0].dataValues.productsbrand, brand: products[0].dataValues });
            }).catch(
                err => { console.log(err) }
            )
    },
    listCategories: (req, res) => {
        db.ProductCategory.findAll({
                where: {
                    name: req.params.category
                },
                include: [{ association: "productscategory" }]
            })
            .then((products) => {
                res.render("products/categoryProduct", { products: products[0].dataValues.productscategory, category: products[0].dataValues });
            }).catch(
                err => { console.log(err) }
            )
    },
    searchProduct: (req, res) => {
        let Product = db.Product.findAll({
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
            order: [
                ["discount", "DESC"]
            ],
            include: [{ association: "productscategories" },
                { association: "productscolors" },
                { association: "productsbrands" }
            ]
        })
        let Categ = db.ProductCategory.findAll();
        let Col = db.ProductColor.findAll();
        let Bran = db.ProductBrand.findAll();
        Promise
            .all([Product, Categ, Col, Bran])
            .then(([products, categories, colors, brands]) => {
                res.render("products/searchP", { products, categories, colors, brands, search: req.query.busqueda });
            }).catch(
                err => { console.log(err) }
            )
    },
    IdProduct: (req, res) => {
        db.Product.findByPk(req.query.id, {
                include: [{ association: "productscategories" },
                    { association: "productscolors" },
                    { association: "productsbrands" }
                ]
            })
            .then((product) => {
                res.render("products/productDetail", { product: product });
            }).catch(
                err => { console.log(err) }
            )
    },
    detailProduct: (req, res) => {

        db.Product.findByPk(req.params.id, {
                include: [{ association: "productscategories" },
                    { association: "productscolors" },
                    { association: "productsbrands" }
                ]
            })
            .then((product) => {

                if (!req.cookies.cat1) {
                    res.cookie("cat1", product.productscategories.id, { maxAge: 60 * 60 * 1000 })
                } else if (req.cookies.cat1 && !req.cookies.cat2 && req.cookies.cat1 != product.productscategories.id) {
                    res.cookie("cat2", product.productscategories.id, { maxAge: 60 * 60 * 1000 })
                } else if (req.cookies.cat2 && req.cookies.cat1 != product.productscategories.id) {
                    res.clearCookie('cat1');
                    res.cookie("cat1", product.productscategories.id, { maxAge: 60 * 60 * 1000 })
                } else {
                    res.clearCookie('cat2');
                }

                res.render("products/productDetail", { product: product });
            }).catch(
                err => { console.log(err) }
            )
    },
    create: (req, res) => {
        let Categ = db.ProductCategory.findAll();
        let Col = db.ProductColor.findAll();
        let Bran = db.ProductBrand.findAll();
        Promise
            .all([Categ, Col, Bran])
            .then(([categories, colors, brands]) => {
                return res.render("products/create", { categories, colors, brands });
            }).catch(err => { console.log(err) })
    },
    store: (req, res) => {

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            let Categ = db.ProductCategory.findAll();
            let Col = db.ProductColor.findAll();
            let Bran = db.ProductBrand.findAll();
            Promise
                .all([Categ, Col, Bran])
                .then(([categories, colors, brands]) => {
                    res.render('products/create', {
                        errors: resultValidation.mapped(),
                        oldData: req.body,
                        categories,
                        brands,
                        colors
                    })
                }).catch(err => { console.log(err) })

        } else {

            db.Product.create({
                name: req.body.name,
                description: req.body.description,
                image: req.file.filename,
                stock: req.body.stock,
                price: req.body.price,
                discount: req.body.discount,
                category_id: req.body.category,
                color_id: req.body.color,
                brand_id: req.body.brand
            }).then(() => {
                res.redirect("/products")
            })
        }

    },
    editProduct: (req, res) => {
        let id = req.params.id
        let Prod = db.Product.findByPk(id)
        let Categ = db.ProductCategory.findAll();
        let Col = db.ProductColor.findAll();
        let Bran = db.ProductBrand.findAll();
        Promise
            .all([Prod, Categ, Col, Bran])
            .then(([product, categories, colors, brands]) => {
                return res.render("products/edit", { product, categories, colors, brands });
            }).catch(err => { console.log(err) })

    },
    updateProduct: (req, res) => {
        if (req.file) {
            db.Product.update({
                    name: req.body.name,
                    description: req.body.description,
                    image: req.file.filename,
                    stock: req.body.stock,
                    price: req.body.price,
                    discount: req.body.discount,
                    category_id: req.body.category,
                    color_id: req.body.color,
                    brand_id: req.body.brand
                }, { where: { id: req.params.id } })
                .then(() => {
                    res.redirect("/products")
                })
        } else {
            db.Product.update({
                    name: req.body.name,
                    description: req.body.description,
                    stock: req.body.stock,
                    price: req.body.price,
                    discount: req.body.discount,
                    category_id: req.body.category,
                    color_id: req.body.color,
                    brand_id: req.body.brand
                }, { where: { id: req.params.id } })
                .then(() => {
                    res.redirect("/products")
                })
        }
    },
    delete: (req, res) => {
        db.Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect("/products")
            })
    }

}

module.exports = productController