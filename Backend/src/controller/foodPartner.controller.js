const foodPartnerModel = require("../models/foodPartner.model");
const foodItemModel = require("../models/foodItem.model");

async function getFoodPartnerProfile(req, res) {
  try {
    const foodPartnerId = req.params.id;

    const partner = await foodPartnerModel.findById(foodPartnerId);

    if (!partner) {
      return res.status(404).json({ message: "Food Partner not found" });
    }

    res.status(200).json({
      message: "Food partner retrieved successfully",
      partner,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getFoodPartnerVideos(req, res) {
  try {
    const foodItems = await foodItemModel.find({ foodPartner: req.params.id });
    res.status(200).json({ foodItems });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  getFoodPartnerProfile,
  getFoodPartnerVideos,
};
