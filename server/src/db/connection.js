const { default: mongoose } = require("mongoose");
const dotenv=require("dotenv")
dotenv.config();


const port = process.env.PORT; // Updated port to match your example
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://portfolio:portfolio@cluster0.tkw7ktb.mongodb.net/?appName=Cluster0";
// MongoDB Connection
const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Successfully connected to MongoDB, ${MONGODB_URI}`);
  } catch (err) {
    console.error("Error occurred:", err);
  }
};

module.exports=dbConnect