const mongoose = require("mongoose");

async function connectDB() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error("Error: MONGODB_URI environment variable is not defined");
        return;
    }

    try {
        await mongoose.connect(uri); // Ensure no deprecated options are used here
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectDB;
