const express = require('express');
const foodPartnerController = require('../controller/foodPartner.controller');
const Middleware = require('../middleware/auth.middleware');
const router = express.Router();

/**
 * @route GET /api/food-partner/profile/video/:id
 * @desc  Get all food items by a food partner
 * ⚠️  video route PEHLE — warna /profile/:id "video" ko id samajh leta
 */
router.get('/profile/video/:id', Middleware.AuthUserOrFoodPartnerMiddleware, foodPartnerController.getFoodPartnerVideos);

/**
 * @route GET /api/food-partner/profile/:id
 * @desc  Get food partner profile
 */
router.get('/profile/:id', Middleware.AuthUserOrFoodPartnerMiddleware, foodPartnerController.getFoodPartnerProfile);

module.exports = router;