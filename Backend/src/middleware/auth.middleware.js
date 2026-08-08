const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../models/foodPartner.model");

async function AuthUserMiddleware(req, res, next) {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please login" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}


async function authFoodPartnerMiddleware(req, res, next) {
  try {
    const token = req.cookies.foodPartnerToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please login" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodPartner = await foodPartnerModel.findById(decoded.id);
    if (!foodPartner) {
      return res.status(401).json({ message: "Unauthorized, please login" });
    }
    req.foodPartner = foodPartner;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

async function AuthUserOrFoodPartnerMiddleware(req, res, next) {
  try {
    const userToken = req.cookies.userToken;
    const partnerToken = req.cookies.foodPartnerToken;

    if (!userToken && !partnerToken) {
      return res.status(401).json({ message: "Unauthorized, please login" });
    }

    if (userToken) {
      const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
      req.userId = decoded.id;
      return next();
    }

    if (partnerToken) {
      const decoded = jwt.verify(partnerToken, process.env.JWT_SECRET);
      const foodPartner = await foodPartnerModel.findById(decoded.id);
      if (!foodPartner) {
        return res.status(401).json({ message: "Unauthorized, please login" });
      }
      req.foodPartner = foodPartner;
      return next();
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = {
  AuthUserMiddleware,
  authFoodPartnerMiddleware,
  AuthUserOrFoodPartnerMiddleware 
};
