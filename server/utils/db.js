const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGODB_URI;

const connectDB = async(req,res)=>{
    try {
        await mongoose.connect(URI);
        console.log("connect to DB");
    } catch (error) {
        console.error("database connection failed!")
        process.exit(0);
    }
}

module.exports = connectDB;