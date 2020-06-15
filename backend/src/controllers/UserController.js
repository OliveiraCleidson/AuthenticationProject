module.exports = {
  list(req, res) {
    res.send('This is ok! List!');
  },

  getById(req, res) {
    res.send('This is ok! getById!');
  },

  create(req, res) {
    res.send('This is ok! Create');
  },

  update(req, res) {
    res.send('This is ok! Update!');
  },

  delete(req, res) {
    res.send('This is ok! Delete!');
  }
}