const express = require('express');

//* controllers
const userController = require('../controllers/user.controller');

//* middlewares
const userMiddleware = require('../middlewares/user.middleware')

const router = express.Router();

//* routes
router.post('/signup', userController.signup)
router.post('/login', userMiddleware.validUser, userController.login)
router.get('/:id/history', userController.history)


module.exports = router