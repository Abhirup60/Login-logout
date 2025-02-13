require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-route");
const connectDB = require("./utils/db");

const corsOption = {
  origin:"http://localhost:3000",
  methods:"GET, PUT, POST, PATCH, HEAD",
  credentials:true,
}

app.use(cors(corsOption));

app.use(express.json());

app.use("/api/auth", authRoute);

const PORT = 9000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
