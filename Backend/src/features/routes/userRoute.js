const express = require("express");
const { register, login, getProfile } = require("../Controllers/user.control");
const isLoggedIn = require("../middlewares/auth.login");
const upload = require("../Config/multer");
const app = express.Router();
app.post("/register", upload.single("image"), register);
app.post("/login", login);
app.get("/getProfile", isLoggedIn, getProfile);
module.exports = app;
