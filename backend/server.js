import express from "express";
import authRoutes from "./Routes/auth.routes.js";
import usersRoutes from "./Routes/users.routes.js"
import postsRoutes from "./Routes/posts.routes.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectToMongoDB } from "./db/connectMongoDB.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
    connectToMongoDB();
  });
