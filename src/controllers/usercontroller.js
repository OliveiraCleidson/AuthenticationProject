const user = require('../database/models').User;
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  list(req, res) {
    return user
      .findAll({
        order: [['id', 'ASC']],
      })
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((error) => {
        res.status(400).send(error.toString())
      });
  },

  getById(req, res) {
    const { id } = req.params;
    return user.findByPk(id)
      .then((user) => {
        if (user) {
          res.json(user).status(200)
        } else {
          res.status(406).json({
            "Message": "User not found"
          })
        }
      })
      .catch((error) => res.status(500).json(error.toString()));
  },

  create(req, res) {
    const newUserData = req.body.user;
    return user.createWithEncryptedPass(newUserData)
      .then((newUser) => res.status(201).json(newUser))
      .catch((err) => res.status(500).json(err.toString()));
  },

  update(req, res) {
    const idUser = req.params.id;
    const dataWillUpdate = user.build(req.body.user);
    return user.updateByPk(idUser, dataWillUpdate)
      .then((updatedUser) => res.status(200).json(updatedUser))
      .catch((error) => {
        res.status(500).json(error.toString())
      });
  },

  delete(req, res) {
    const { id } = req.params;
    return user.deleteByPk(id)
      .then((deletedUser) => res.status(200).json(`Deleted User ID ${id}`))
      .catch((err) => res.status(500).json(err.toString()));
  }
}