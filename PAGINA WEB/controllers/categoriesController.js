const db = require("../database/models")
const { validationResult } = require("express-validator");

const categoriesController = {
    listCategories: (req, res) => {
        db.ProductCategory.findAll()
            .then((categories) => {
                res.render("secondaryTables/listCategories", { categories });
            }).catch(
                err => { console.log(err) }
            )
    },

    create: (req, res) => {
        db.ProductCategory.findAll()
            .then(() => {
                return res.render("secondaryTables/createCategories");
            }).catch(
                err => { console.log(err) }
            )



    },
    store: (req, res) => {

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            res.render('secondaryTables/createCategories', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            })

        } else {
            db.ProductCategory.create({
                name: req.body.name,
                image: req.file.filename
            }).then(() => {
                res.redirect("/category")
            })
        }
    },

    editCategory: (req, res) => {
        let id = req.params.id
        db.ProductCategory.findByPk(id)
            .then((category) => {
                return res.render("secondaryTables/editCategories", { category });
            }).catch(err => { console.log(err) })
    },

    updateCategory: (req, res) => {
        if (req.file) {
            db.ProductCategory.update({
                    name: req.body.name,
                    image: req.file.filename
                }, { where: { id: req.params.id } })
                .then(() => {
                    res.redirect("/category")
                })
        } else {
            db.ProductCategory.update({
                    name: req.body.name,
                }, { where: { id: req.params.id } })
                .then(() => {
                    res.redirect("/category")
                })
        }
    },
    delete: (req, res) => {
        db.ProductCategory.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect("/category")
            })
    }

}
module.exports = categoriesController