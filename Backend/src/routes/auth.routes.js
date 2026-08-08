const express = require('express');
const authController = require('../controller/auth.controller')
const Middleware = require('../middleware/auth.middleware')

const router = express.Router();

// user auth routes
router.post('/user/register',  authController.registerUser)
router.post('/user/login', authController.loginUser)
router.get('/user/logout', Middleware.AuthUserMiddleware, authController.logoutUser)

// food partner auth routes
router.post('/food-partner/register', authController.registerFoodPartner)
router.post('/food-partner/login', authController.loginFoodPartner)
router.get('/food-partner/logout', Middleware.authFoodPartnerMiddleware, authController.logoutFoodPartner)

module.exports = router