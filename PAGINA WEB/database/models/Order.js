module.exports = (sequelize, dataTypes) => {
    let alias = 'Order'; // esto debería estar en singular

    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        user_id: {
            type: dataTypes.BIGINT(10),
        },
        shoppingcart_id: {
            type: dataTypes.BIGINT(10),
        },

        total_price: {
            type: dataTypes.INTEGER(),
            allowNull: false
        },
        ordersstatus_id: dataTypes.BIGINT(10),

        paystatus_id: dataTypes.BIGINT(10),


    };

    let config = {
        tableName: 'orders',
        timestamps: false,

    };



    const Order = sequelize.define(alias, cols, config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    Order.associate = function(models) {
        Order.belongsTo(models.OrderStatus, {
                as: "orderstatus",
                foreignKey: "ordersstatus_id"
            }),

            Order.belongsTo(models.PayStatus, {
                as: "payment_status",
                foreignKey: "paystatus_id"
            })


    }

    return Order
}