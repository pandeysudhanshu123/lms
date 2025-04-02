const jwt = require("jsonwebtoken");
const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token; // ✅ Correct way to access cookies
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized, Please Loging again" });
  }
  try {
    const decoded = jwt.verify(token, process.env.secret_key);
    req.user = decoded; // Store user details in request
    next(); // Move to next middleware or controller
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = isLoggedIn;
