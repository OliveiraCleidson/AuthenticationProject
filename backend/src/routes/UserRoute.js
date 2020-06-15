const express = require('express');
const router = express.Router();
const user = require('../controllers/UserController');

// Authentication Middleware - It will insert
// router.use(function wait(req, res, next) {
//   console.log('Wait');
//   next();
// });


router.get('/', user.list);
router.post('/:id', user.getById);
router.delete('/:id', user.delete);
router.post('/u/:id', user.update);

router.get('/about', function (req, res) {
  res.send('About birds');
});

module.exports = router;

