const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ------------------------
// AUTH PROTECT MIDDLEWARE
// ------------------------
exports.protect = async (req, res, next) => {
  try {
    // read token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // attach user to request
    req.user = user;

    // allow route to continue
    next();

  } catch (err) {
    console.log("Auth Error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};


// ------------------------
// ROLE BASED ACCESS
// ------------------------
exports.restrictTo = (...roles) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden - Access denied" });
    }

    next();
  };
};
