const db = require("../../database/models");
const { Op } = require("sequelize");

const TotalController = {
listTotal: (req, res) => {
    let Product = db.Product.findAll({
        include: [{ association: "productscategories" },
            { association: "productscolors" },
            { association: "productsbrands" }
        ]
    });
    let User = db.User.findAll();
    let Categ = db.ProductCategory.findAll();
    let Col = db.ProductColor.findAll();
    let Bran = db.ProductBrand.findAll();
    Promise
        .all([Product, User,Categ, Col, Bran])
        .then(([products,users, categories, colors, brands]) => {

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
    
                return res.status(200).json({
                    data: [ 
                       {  name: "Products",
                           total: products.length},
                       { name: "Categories",
                           total: categories.length},
                       { name: "Colors",
                           total: colors.length},
                       { name: "Brands",
                           total: brands.length},
                        { name: "Users",
                           total: users.length}
                    ],
                    productsCategories:  resultado ,
                    status: 200
                })
      
        }).catch(
            err => { console.log(err) }
        )
}
}


module.exports = TotalController