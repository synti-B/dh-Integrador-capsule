
module.exports = (sequelize, dataTypes) => {
    let alias = 'User'; // esto debería estar en singular
        
    let cols = {
            id: {
                type: dataTypes.BIGINT(10).UNSIGNED,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            
            first_name: {
                type: dataTypes.STRING(100),
                allowNull: false
            },

            last_name: {
                type: dataTypes.STRING(100),
                allowNull: false
            },

            avatar: {
                type: dataTypes.STRING(100),
                allowNull: false
            },
            email: {
                type: dataTypes.STRING(100),
                allowNull: false
            },
           
            password: {
                type: dataTypes.STRING(250),
                allowNull: false
            },

            adress: {
                type: dataTypes.STRING(250),
                allowNull: false
            },
           
            category_id: dataTypes.BIGINT(10),
        



       
        };
       
        let config = {
            tableName: 'users',
            timestamps: true,
            createdAt: true,
            updatedAt: true,

         
        };
      
      
     const User = sequelize.define(alias,cols,config);
    
    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)
    
     User.associate = function (models) {
     User.belongsTo(models.UserCategory, { 
                as: "userscategories",
                foreignKey: "category_id"
            })

 
   
                   
            }
    
    
        return User
    }