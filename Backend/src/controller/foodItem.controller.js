const foodItemModel = require("../models/foodItem.model");
const storageService = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");

async function createFoodItem(req, res) {
  try {
    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuidv4(),
    );

    const foodItem = await foodItemModel.create({
      name: req.body.name,
      description: req.body.description,
      videoUrl: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
      message: "Food item created successfully",
      food: foodItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getFoodItems(req, res) {
  const foodItems = await foodItemModel.find({});

  res.status(200).json({
    message: "Food items fetched successfully",
    foodItems,
  });
}

async function likeFoodItem(req, res) {
  try {
    const { foodItemId } = req.body;
    const userId = req.userId ?? req.foodPartner?._id;

    const isAlreadyLiked = await likeModel.findOne({ userId, foodItemId });

    if (isAlreadyLiked) {
      await likeModel.deleteOne({ _id: isAlreadyLiked._id });
      await foodItemModel.findByIdAndUpdate(foodItemId, {
        $inc: { likeCount: -1 },
      });
      return res
        .status(200)
        .json({ message: "Food item unliked successfully" });
    }

    const like = await likeModel.create({ userId, foodItemId });

    await foodItemModel.findByIdAndUpdate(foodItemId, {
      $inc: { likeCount: 1 },
    });

    res.status(201).json({ message: "Food item liked successfully", like });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getLikedItems(req, res) {
  try {
    const userId = req.userId ?? req.foodPartner?._id;
    const likes = await likeModel.find({ userId });

    const populated = await Promise.all(
      likes.map(async (like) => {
        const foodItem = await foodItemModel.findById(like.foodItemId);
        return { ...like.toObject(), foodItemId: foodItem };
      }),
    );

    res.status(200).json({ likes: populated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function saveFoodItem(req, res) {
  try {
    const { foodItemId } = req.body;

    const user = req.userId ?? req.foodPartner?._id;
    console.log("user:", user, "foodItemId:", foodItemId);
    const isAlreadySaved = await saveModel.findOne({ user, foodItemId });

    if (isAlreadySaved) {
      await saveModel.deleteOne({ _id: isAlreadySaved._id });
      console.log("already saved:", isAlreadySaved);
      return res.status(200).json({
        message: "Food item unsaved successfully",
      });
    }

    const save = await saveModel.create({
      user,
      foodItemId,
    });

    res.status(201).json({
      message: "Food item saved successfully",
      save,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getSavedFoodItems(req, res) {
  try {
    const user = req.userId ?? req.foodPartner?._id;
    const saves = await saveModel.find({ user });

    const populated = await Promise.all(
      saves.map(async (save) => {
        const foodItem = await foodItemModel.findById(save.foodItemId);
        return { ...save.toObject(), foodItemId: foodItem };
      }),
    );

    res.status(200).json({ saves: populated });
  } catch (error) {
    console.log("getSavedFoodItems error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  createFoodItem,
  getFoodItems,
  likeFoodItem,
  getLikedItems,
  saveFoodItem,
  getSavedFoodItems,
};
