
module.exports = (sequelize, dataTypes) => {
    let alias = 'UserCategory'; // esto debería estar en singular
        
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
            tableName: 'users_categories',
            timestamps: false,
        }
      
      
     const UserCategory = sequelize.define(alias,cols,config);
    
    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)
    
        UserCategory.associate = function (models) {
            UserCategory.hasMany(models.Product, { 
                as: "userscategories",
                foreignKey: "category_id"
            })
        

        }
    
        return UserCategory
    }