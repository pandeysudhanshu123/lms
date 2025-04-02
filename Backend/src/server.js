require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const cookie = require("cookie-parser")
const PORT = process.env.PORT || 3000;
const userRoute = require("./features/routes/userRoute");
const connect = require("./features/Config/db");
app.use(express.json());
app.use(cors())
app.use(cookie())
app.use("/", userRoute);

app.listen(PORT, async() => {
   await connect()
  console.log(`Server running at http://localhost:${PORT}`);
});
