import express from "express";
import { protectRoute } from "../middleware/protectRouter.js";
import {
  createPost,
  likePost,
  deletePost,
  commentPost,
  getAllPosts,
  getUserPosts,
} from "../controllers/posts.controller.js";

const route = express.Router();

route.get("/all", protectRoute, getAllPosts);
route.get("/user/:userName", protectRoute, getUserPosts);
route.post("/create", protectRoute, createPost);
route.post("/like/:id", protectRoute, likePost);
route.post("/comment/:id", protectRoute, commentPost);
route.delete("/:id", protectRoute, deletePost);

export default route;
