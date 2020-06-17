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
        id
      }
    })
      .then((user) => {
        if (user.length === 1) {
          res.json(user).status(200)
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
    // Encrypt the Pass
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
            return res.status(201).json({
              'Message': 'The user has been created'
            });
          })
          .catch((error) => {
            res.status(400).send(error)
          });
      })
      .catch((err) => { console.log(err) });
  },

  async update(req, res) {
    const { firstName, lastName, email, password, id } = req.body;
    let { newFirstName, newLastName, newEmail, newPassword } = req.body;
    return user.findAll({
      where: {
        id
      }
    })
      .then((resp) => {
        if (resp.length === 1) {
          const hash = resp[0].password;
          bcrypt.compare(password, hash)
            .then((match) => {
              console.log(match);
              if (match) {
                resp[0].update({
                  firstName: newFirstName || firstName,
                  email: newEmail || email,
                  lastName: newLastName || lastName
                })
                  .then((resp) => {
                    return res.status(200).json({ "message": match });
                  })
                  .catch((err) => {
                    return res.status(401).json({ "message:": "Update isn't complete" });
                  });
              } else {
                return res.status(401).json({ "message:": "Password not matchs" });
              }
            })
            .catch((error) => {
              console.log(error);
              return res.status(400).json({ "message": error })
            })
        } else {
          return res.status(400).json({ "message": "User not found!" })
        }
      })
      .catch((err) => {
        return res.status(400).json({ "message": "User not found" })
      })
  },

  delete(req, res) {
    res.send('This is ok! Delete!');
  }
}