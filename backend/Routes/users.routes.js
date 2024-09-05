import express from "express";

import {
  getUserProfile,
  followUnfollowUser,
  updateUserProfile
} from "../controllers/users.controller.js";
import { protectRoute } from "../middleware/protectRouter.js";

const routes = express.Router();

routes.get("/profile/:userName", protectRoute, getUserProfile);
routes.post("/follow/:id", protectRoute, followUnfollowUser);
routes.post("/update/:id", protectRoute, updateUserProfile);

export default routes;
