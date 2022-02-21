'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Publication.belongsTo(models.User,{
        foeignKey:{
          allowNull:false
        }
      });
      models.Publication.belongsTo(models.Comment,{
        foeignKey:{
          allowNull:false
        }
      });
    }
  }
  Publication.init({
    idUSERS: DataTypes.INTEGER,
    idCOMMENTS: DataTypes.INTEGER,
    title: DataTypes.STRING,
    message: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Publication',
  });
  return Publication;
};