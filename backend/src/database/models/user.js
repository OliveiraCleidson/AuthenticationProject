'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    // Timestamps
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};