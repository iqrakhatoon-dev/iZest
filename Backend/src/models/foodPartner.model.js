const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timeseries: true,
  },
);

const foodPartnerModel = mongoose.model("foodPartner", foodPartnerSchema);

module.exports = foodPartnerModel;
