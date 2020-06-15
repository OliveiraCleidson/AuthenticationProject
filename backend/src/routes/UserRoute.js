const express = require('express');
const router = express.Router();
const user = require('../controllers').userController;
const { celebrate, Joi, Segments } = require('celebrate');

// Authentication Middleware - It will insert
// router.use(function wait(req, res, next) {
//   console.log('Wait');
//   next();
// });

//Routing from /user
router.get('/', user.list);
router.get('/:id', user.getById);
router.delete('/:id', user.delete);
router.put('/:id', user.update);

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    firstName: Joi.string().required().min(2),
    lastName: Joi.string().min(2),
    email: Joi
      .string().email({ minDomainSegments: 2, tlds: true })
      .required(),
    password: Joi.string().required().length(6)
  })
}), user.create);

router.get('/about', function (req, res) {
  res.send('About birds');
});

module.exports = router;

