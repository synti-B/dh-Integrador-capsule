const db = require("../database/models")
const { validationResult } = require("express-validator");

const colorsController = {
    listColors: (req, res) => {
        db.ProductColor.findAll()
            .then((colors) => {
                res.render("secondaryTables/listColors", { colors });
            }).catch(
                err => { console.log(err) }
            )
    },
    create: (req, res) => {

        db.ProductColor.findAll()
            .then(() => {
                return res.render("secondaryTables/createColors");
            }).catch(
                err => { console.log(err) }
            )
    },
    store: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            res.render('secondaryTables/createColors', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            })

        } else {
            db.ProductColor.create({
                    name: req.body.name,
                })
                .then(() => {
                    res.redirect("/color")
                })
        }
    },
    editColor: (req, res) => {
        let id = req.params.id
        db.ProductColor.findByPk(id)
            .then((color) => {
                return res.render("secondaryTables/editColors", { color });
            }).catch(err => { console.log(err) })

    },
    updateColor: (req, res) => {
        db.ProductColor.update({
                name: req.body.name,
            }, { where: { id: req.params.id } })
            .then(() => {
                res.redirect("/color")
            })

    },
    delete: (req, res) => {
        db.ProductColor.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect("/color")
            })
    }

}
module.exports = colorsController