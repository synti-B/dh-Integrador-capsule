
module.exports = (sequelize, dataTypes) => {
    let alias = 'PayStatus'; // esto debería estar en singular
        
    let cols = {
            id: {
                type: dataTypes.BIGINT(10).UNSIGNED,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            user_id:{
                type: dataTypes.BIGINT(30),
                allowNull: false
            },
            
            pay_status: {
                type: dataTypes.STRING(30),
                allowNull: true
            }
       
         
        };
       
        let config = {
            tableName: 'payment_status',
            timestamps: false,
        }
      
      
     const PayStatus = sequelize.define(alias,cols,config);
    
    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)
    
        PayStatus.associate = function (models) {
            PayStatus.hasMany(models.Order, { 
                as: "payment_status",
                foreignKey: "paystatus_id"
            })


        

        }
    
        return PayStatus
    }