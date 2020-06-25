const express = require('express');
const router = express.Router();
const user = require('../controllers').userController;
const { celebrate, Joi, Segments } = require('celebrate');
const passport = require('passport'),
  BearerStrategy = require('passport-http-bearer');

passport.use(new BearerStrategy(
  function (token, done) {
    if (token === "123456") {
      return done(null, { name: "API Test" }, { scope: 'all' })
    }
    return done(null, false)
  }
));

//Routing from /user
router.get('/', passport.authenticate('bearer', { session: false }), user.list);

router.get('/:id', [passport.authenticate('bearer', { session: false }),
celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
})], user.getById);
router.delete('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), user.delete);

router.put('/:id', [passport.authenticate('bearer', { session: false }),
celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    user: {
      firstName: Joi.string().min(2),
      lastName: Joi.string().min(2),
      email: Joi
        .string().email({ minDomainSegments: 2, tlds: true }),
      password: Joi.string().min(6)
    }
  })
})], user.update);

router.post('/', [passport.authenticate('bearer', { session: false }),
celebrate({
  [Segments.BODY]: Joi.object().keys({
    user: {
      firstName: Joi.string().required().min(2),
      lastName: Joi.string().min(2),
      email: Joi
        .string().email({ minDomainSegments: 2, tlds: true })
        .required(),
      password: Joi.string().required().min(6)
    }
  })
})], user.create);

module.exports = router;

