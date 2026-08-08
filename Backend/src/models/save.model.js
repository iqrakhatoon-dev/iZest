const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saveSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foodItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem",
    },
  },
  {
    timestamps: true,
  }
);

const Save = mongoose.model("Save", saveSchema);
module.exports = Save;
