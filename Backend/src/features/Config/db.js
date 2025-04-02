const mongoose = require("mongoose");
const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed:", error);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connect;
