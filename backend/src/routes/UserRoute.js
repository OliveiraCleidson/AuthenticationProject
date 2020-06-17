const express = require('express');
const router = express.Router();
const user = require('../controllers').userController;
const { celebrate, Joi, Segments } = require('celebrate');

//Routing from /user
router.get('/', user.list);
router.get('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), user.getById);
router.delete('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), user.delete);

router.put('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    newFirstName: Joi.string().min(2),
    newLastName: Joi.string().min(2),
    newEmail: Joi
      .string().email({ minDomainSegments: 2, tlds: true }),
    password: Joi.string().required().min(6)
  })
}), user.update);

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    firstName: Joi.string().required().min(2),
    lastName: Joi.string().min(2),
    email: Joi
      .string().email({ minDomainSegments: 2, tlds: true })
      .required(),
    password: Joi.string().required().min(6)
  })
}), user.create);

module.exports = router;

