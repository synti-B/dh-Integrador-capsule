module.exports = (sequelize, dataTypes) => {
    let alias = 'ShoppingCart'; // esto debería estar en singular

    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        order_id: {
            type: dataTypes.BIGINT(10),
        },
        product_id: {
            type: dataTypes.BIGINT(10),
        },
        quantity_products: {
            type: dataTypes.INTEGER(),
            allowNull: false
        }
    };

    let config = {
        tableName: 'shopping_carts',
        timestamps: false,

    };


    const ShoppingCart = sequelize.define(alias, cols, config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)
    ShoppingCart.associate = function(models) {

        ShoppingCart.belongsTo(models.Product, {
            as: "shoppingProduct",
            foreignKey: "product_id"
        })




    }



    return ShoppingCart
}