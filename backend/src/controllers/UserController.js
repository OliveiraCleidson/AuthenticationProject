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

  async update(req, res) {
    const { firstName, lastName, email, password, id } = req.body;
    const { newFirstName, newLastName, newEmail, newPassword, changePass = 0 } = req.body;
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
              if (match) {
                let newPass = "a";
                if (changePass) {

                }
                user.update({
                  newFirstName,
                  newEmail,
                  newLastName,
                  newPassword
                }, {
                  where: {
                    id,
                    firstName,
                    lastName,
                    email,
                  },

                });
                res.status(200).json({ "message": match });
              } else {
                res.status(401).json({ "message:": "Password not matchs" });
              }

              console.log(result);
            })
            .catch((error) => {
              res.status(400).json({ "message1": error })
            })
        } else {
          res.status(400).json({ "message": "User not found!" })
        }
      })
      .catch((err) => {
        res.status(400).json({ "message": "User not found" })
      })
  },

  delete(req, res) {
    res.send('This is ok! Delete!');
  }
}