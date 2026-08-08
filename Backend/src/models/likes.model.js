const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    foodItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem",
    },
  },
  {
    timestamps: true,
  },
);

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
