const db = require("../database/models")


const getHome = (req, res) => {
    if (req.cookies.cat1 && !req.cookies.cat2) {
        let Product = db.Product.findAll({
            order: [
                ["discount", "DESC"]
            ]
        })
        let pVisited1 = db.Product.findAll({
            where: {
                category_id: req.cookies.cat1
            },
            limit: 3,
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
            .all([Product, pVisited1, Categ, Col, Bran])
            .then(([products, pv1, categories, colors, brands]) => {
                return res.render("users/index", { products, pv1, pv2: [], categories, colors, brands });
            }).catch(err => { console.log(err) })

    } else if (req.cookies.cat1 && req.cookies.cat2) {
        let Product = db.Product.findAll({
            order: [
                ["discount", "DESC"]
            ]
        })
        let pVisited1 = db.Product.findAll({
            where: {
                category_id: req.cookies.cat1
            },
            limit: 3,
            order: [
                ["discount", "DESC"]
            ],
            include: [{ association: "productscategories" },
                { association: "productscolors" },
                { association: "productsbrands" }
            ]
        });
        let pVisited2 = db.Product.findAll({
            where: {
                category_id: req.cookies.cat2
            },
            limit: 3,
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
            .all([Product, pVisited1, pVisited2, Categ, Col, Bran])
            .then(([products, pv1, pv2, categories, colors, brands]) => {
                return res.render("users/index", { products, pv1, pv2, categories, colors, brands });
            }).catch(err => { console.log(err) })

    } else {
        let Product = db.Product.findAll({
            order: [
                ["discount", "DESC"]
            ]
        })
        let Categ = db.ProductCategory.findAll();
        let Col = db.ProductColor.findAll();
        let Bran = db.ProductBrand.findAll();
        Promise
            .all([Product, Categ, Col, Bran])
            .then(([products, categories, colors, brands]) => {
                return res.render("users/index", { products, pv1: [], pv2: [], categories, colors, brands });
            }).catch(err => { console.log(err) })
    }
}

module.exports = {
    getHome,
}