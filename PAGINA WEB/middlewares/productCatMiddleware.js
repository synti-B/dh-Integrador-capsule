const db = require("../database/models");
const { Op } = require("sequelize");


function productCat(req, res, next) {

    db.Product.findAll({
        include: [{ association: "productscategories" },
            { association: "productscolors" },
            { association: "productsbrands" }
        ]
    }).then(products => {

        let productCategory = []
        products.forEach(product => {
            productCategory.push(product.productscategories.dataValues)
        });

        function findOcc(arr, key) {
            let arr2 = [];
            arr.forEach((x) => {

                if (arr2.some((val) => { return val[key] == x[key] })) {
                    arr2.forEach((k) => {
                        if (k[key] === x[key]) {
                            k["cantidad"]++
                        }
                    })
                } else {
                    let a = {}
                    a[key] = x[key]
                    a["cantidad"] = 1
                    arr2.push(a);
                }
            })

            return arr2

        }

        let resultado = findOcc(productCategory, "name");

        res.locals.productXCat = resultado

    })


    next();


}

module.exports = productCat