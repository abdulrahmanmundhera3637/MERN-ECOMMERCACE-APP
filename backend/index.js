const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db");
const router = require("./routes");
require("dotenv").config();

const app = express();
// Middleware
app.use(cors({
  origin: "https://mern-frontend-phi-mauve.vercel.app",
  credentials: true
}));


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(express.json()); 


// API Routes
app.use("/api", router);



// Connect to MongoDB and start server
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to MongoDB");
    console.log(`Server is running on port : ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to MongoDB:", err);
});
