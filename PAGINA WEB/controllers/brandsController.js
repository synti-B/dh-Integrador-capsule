const db = require("../database/models");
const { validationResult } = require("express-validator");

const brandsController = {
    listBrands: (req, res) => {
        db.ProductBrand.findAll()
            .then((brands) => {
                res.render("secondaryTables/listBrands", { brands });
            })
            .catch((err) => {
                console.log(err);
            });
    },

    create: (req, res) => {
        db.ProductBrand.findAll()
            .then(() => {
                return res.render("secondaryTables/createBrands");
            })
            .catch((err) => {
                console.log(err);
            });
    },

    store: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            res.render("secondaryTables/createBrands", {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        } else {
            db.ProductBrand.create({
                name: req.body.name,
                image: req.file.filename,
            }).then(() => {

                res.redirect("/brand");
            })
        }
    },

    editBrand: (req, res) => {
        let id = req.params.id;
        db.ProductBrand.findByPk(id)
            .then((brand) => {
                return res.render("secondaryTables/editBrands", { brand });
            })
            .catch((err) => {
                console.log(err);
            });
    },

    updateBrand: (req, res) => {
        if (req.file) {
            db.ProductBrand.update({
                    name: req.body.name,
                    image: req.file.filename,
                }, { where: { id: req.params.id } })
                .then(() => {
                    res.redirect("/brand");
                })
        } else {
            db.ProductBrand.update({
                    name: req.body.name,
                }, { where: { id: req.params.id } })
                .then(() => {
                    res.redirect("/brand");
                })
        }
    },

    delete: (req, res) => {
        db.ProductBrand.destroy({
                where: {
                    id: req.params.id,
                },
            })
            .then(() => {
                res.redirect("/brand");
            })
    },
};
module.exports = brandsController;