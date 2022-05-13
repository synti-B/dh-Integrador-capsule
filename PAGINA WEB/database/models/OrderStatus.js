module.exports = (sequelize, dataTypes) => {
    let alias = 'OrderStatus'; // esto debería estar en singular

    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        status: {
            type: dataTypes.STRING(30),
            allowNull: false
        }


    };

    let config = {
        tableName: 'order_status',
        timestamps: false,
    }


    const OrderStatus = sequelize.define(alias, cols, config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    OrderStatus.associate = function(models) {
        OrderStatus.hasMany(models.Order, {
            as: "statusOrder",
            foreignKey: "ordersstatus_id"
        })


    }

    return OrderStatus
}