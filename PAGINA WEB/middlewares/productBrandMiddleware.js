const db = require("../database/models");
const { Op } = require("sequelize");


function productBrand(req, res, next) {

    db.Product.findAll({
        include: [{ association: "productscategories" },
            { association: "productscolors" },
            { association: "productsbrands" }
        ]
    }).then(products => {

        let productBrands = []
        products.forEach(product => {
            productBrands.push(product.productsbrands.dataValues)
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
        let resultado = findOcc(productBrands, "name");
        res.locals.productXBrand = resultado
    })


    next();


}

module.exports = productBrand