import mongoose from "mongoose";

const DB_URL = "mongodb://localhost:27017/blog";

export const connectToDatebase = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB OK");
  } catch (error) {
    console.log("MongoDB Bad", error);
  }
};
