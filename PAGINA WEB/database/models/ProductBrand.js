module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductBrand'; // esto debería estar en singular

    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

    };

    let config = {
        tableName: 'products_brands',
        timestamps: false,
    }


    const ProductBrand = sequelize.define(alias, cols, config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    ProductBrand.associate = function(models) {
        ProductBrand.hasMany(models.Product, {
            as: "productsbrand",
            foreignKey: "brand_id"
        })


    }

    return ProductBrand
}