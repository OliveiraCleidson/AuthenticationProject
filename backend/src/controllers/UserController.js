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
    return user.findByPk(id)
      .then((user) => {
        if (user) {
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
      .catch((err) => {
        res.status(500);
        console.log(err)
      });
  },

  update(req, res) {
    const { id } = req.params;
    const { password, newFirstName, newLastName, newEmail } = req.body;
    return user.findByPk(id)
      .then((userResult) => {
        if (userResult != null) {
          const { firstName, lastName, email } = userResult;
          //Compare the password with the hash password
          bcrypt.compare(password, userResult.password)
            .then((match) => {
              //If it is validate
              if (match) {
                //Update the user that matches with password
                userResult.update({
                  firstName: newFirstName || firstName,
                  lastName: newLastName || lastName,
                  email: newEmail || email
                })
                  .then((updateUser) => {
                    res.status(200).json(updateUser)
                  })
                  .catch((error) => {
                    return res.status(500).json("Not possible update the user")
                  })
              } else { // It isn`t validate
                return res.status(401).json("Invalid Password");
              }
            })
            .catch((err) => res.send(500))
        } else {
          return res.status(404).json("User not found");
        }

      })
      .catch((error) => {
        return res.status(500).json("Error in Search of User")
      });
  },

  delete(req, res) {
    const { id } = req.params;
    user.findByPk(id)
      .then((userQuery) => {
        if (userQuery) {
          userQuery.destroy()
            .then((destroyed) => {
              console.log(destroyed);
              return res.status(200).json("Deleted")
            })
            .catch((err) => {
              return res.status(500).json("Not possible delete")
            })
        } else {
          return res.status(404).json("User not found");
        }
      })
  }
}