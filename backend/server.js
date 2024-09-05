import express from "express";
import authRoutes from "./Routes/auth.routes.js";
import usersRoutes from "./Routes/users.routes.js"
import postsRoutes from "./Routes/posts.routes.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

import {v2 as cloudinary} from "cloudinary"
import { connectToMongoDB } from "./db/connectMongoDB.js";

dotenv.config({
  path: "../.env"
});

const PORT = process.env.PORT;

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
})

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json({limit: "5mb"}));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
    connectToMongoDB();
  });
