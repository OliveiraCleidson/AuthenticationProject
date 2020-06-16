const user = require('../database/models').User;
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  list(req, res) {
    return user
      .findAll({
        order: [['firstName', 'DESC']],
      })
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((error) => {
        res.status(400).send(error)
      });
  },

  getById(req, res) {
    const { id } = req.params;
    return user.findAll({
      where: {
        id: id
      }
    })
      .then((users) => {
        if (users.length === 1) {
          res.send(users).status(200)
        } else {
          res.status(406).json({
            "Message": "User not found"
          })
        }

      });
  },

  create(req, res) {
    const { firstName, lastName, email } = req.body;
    let { password } = req.body;
    return bcrypt.hash(password, saltRounds)
      .then((hash) => {
        password = hash;
        user
          .create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          })
          .then((user) => {
            res.status(201).json({
              'Message': 'The user has been created'
            });
          })
          .catch((error) => {
            res.status(400).send(error)
          });
      })
      .catch((err) => { console.log(err) });
  },

  update(req, res) {
    res.send('This is ok! Update!');
  },

  delete(req, res) {
    res.send('This is ok! Delete!');
  }
}