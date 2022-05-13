module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductColor'; // esto debería estar en singular

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
        }


    };

    let config = {
        tableName: 'products_colors',
        timestamps: false,
    }


    const ProductColor = sequelize.define(alias, cols, config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    ProductColor.associate = function(models) {
        ProductColor.hasMany(models.Product, {
            as: "productscolor",
            foreignKey: "color_id"
        })


    }

    return ProductColor
}