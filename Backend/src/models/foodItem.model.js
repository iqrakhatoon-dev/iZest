const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    foodPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodPartner",
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const foodItemModel = mongoose.model("foodItem", foodItemSchema);

module.exports = foodItemModel;
