'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Histories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,RentBooks}) {
      // define association here
      this.belongsTo(Users, {foreignKey: 'userId', as: 'user'});
      this.belongsTo(RentBooks, {foreignKey: 'rentBookId', as: 'rentBook'});
    }
  };
  Histories.init({
    active: {
      type:DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Histories',
  });
  return Histories;
};