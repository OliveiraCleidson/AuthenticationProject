const User = require('../database/models').User;

module.exports = {
  list(req, res) {
    return User
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
    res.send('This is ok! getById!');
  },

  create(req, res) {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body)
    return User
      .create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
      .then((user) => {
        res.status(201).send(`O usuário: ${user.firstName} foi criado!`)
      })
      .catch((error) => {
        res.status(400).send(error)
      });
  },

  update(req, res) {
    res.send('This is ok! Update!');
  },

  delete(req, res) {
    res.send('This is ok! Delete!');
  }
}