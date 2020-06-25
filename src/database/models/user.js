'use strict';
const bcrypt = require('bcrypt');

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
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Timestamps
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };

  User.createWithEncryptedPass = function (newUser) {
    return new Promise((resolve, reject) => {
      User.buildWithEncryptedPass(newUser)
        .then((builtUser) => {
          builtUser.save()
            .then((createdUser) => {
              resolve(createdUser);
            })
        });
    });
  };

  User.buildWithEncryptedPass = function (userToBuild) {
    return new Promise((resolve, reject) => {
      const builtUser = User.build(userToBuild);
      if (builtUser instanceof Array) {
        for (let oneBuiltUser in builtUser.values()) {
          oneBuiltUser.encryptPass();
        }
        resolve(builtUser);
      } else {
        builtUser.encryptPass();
        resolve(builtUser);
      }
    })
  };

  User.updateByPk = function (idUser, dataWillUpdate) {
    return new Promise((resolve, reject) => {
      User.findByPk(idUser)
        .then((userWillUpdated) => {
          if (userWillUpdated) {
            dataWillUpdate.password ? dataWillUpdate.encryptPass() : null;
            userWillUpdated.update(dataWillUpdate.toJSON())
              .then((updatedUser) => {
                resolve(updatedUser);
              })
          } else {
            reject(`User ID not found`)
          }
        });
    });
  };

  User.deleteByPk = function (idUser) {
    return new Promise((resolve, reject) => {
      User.findByPk(idUser)
        .then((userWillDeleted) => {
          if (userWillDeleted) {
            userWillDeleted.destroy()
              .then((destroyed) => {
                resolve(destroyed);
              })
          } else {
            reject("User not found");
          }
        })
    });
  }

  User.prototype.encryptPass = function () {
    let hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
  };

  User.prototype.checkPasswordMatch = function (decryptedPassword) {
    return bcrypt.compareSync(decryptedPassword, this.password)
  }

  return User;
};