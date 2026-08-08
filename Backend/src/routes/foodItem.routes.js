const express = require('express');
const foodItemController = require('../controller/foodItem.controller');
const Middleware = require('../middleware/auth.middleware');
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
})


/**
 * @route POST /api/food-items
 * @desc Create a new food item
 * @access private (Food Partner)
 */
router.post('/', Middleware.authFoodPartnerMiddleware, upload.single('videoUrl'), foodItemController.createFoodItem);

/**
 * @route GET /api/food-items
 * @description User can see food items
 * @access public (users)
 */
router.get('/', Middleware.AuthUserOrFoodPartnerMiddleware, foodItemController.getFoodItems);


/**
 * @route POST /api/food-items/liked
 * @description User can like or unlike a food item
 * @access private (users)
 */
router.post("/like", Middleware.AuthUserOrFoodPartnerMiddleware, foodItemController.likeFoodItem);

/**
 * @route GET /api/food-items/liked
 * @description User can get all liked food items
 * @access private (users)
 */
router.get('/liked', Middleware.AuthUserOrFoodPartnerMiddleware, foodItemController.getLikedItems)

/** 
 * @route POST /api/food-items/save
 * @description User can save a food item
 * @access private (users)
*/
router.post("/save", Middleware.AuthUserOrFoodPartnerMiddleware, foodItemController.saveFoodItem);

/**
 * @route GET /api/food-items/saved
 * @description User can get all saved food items
 * @access private (users)
 */
router.get("/saved", Middleware.AuthUserOrFoodPartnerMiddleware, foodItemController.getSavedFoodItems);


module.exports = router;