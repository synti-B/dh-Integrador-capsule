module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductCategory'; // esto debería estar en singular

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
        tableName: 'products_categories',
        timestamps: false,
    }

    const ProductCategory = sequelize.define(alias, cols, config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    ProductCategory.associate = function(models) {
        ProductCategory.hasMany(models.Product, {
            as: "productscategory",
            foreignKey: "category_id"
        })

    }

    return ProductCategory
}