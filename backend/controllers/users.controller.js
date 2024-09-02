import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import { response } from "express";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ userName: username }).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const followUnfollowUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    if (!userToModify || !currentUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

      return res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });

      const newNotification = new Notification({
        type: "follow",
        from: req.user._id,
        to: id,
      });

      await newNotification.save();
    }

    res.status(200).json({ message: "User" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  const { userName, fullName, currentPassword, newPassword, bio } =
    req.body;
  let { profileImg, coverImg } = req.body;
  const userId = req.user._id;

  try {
    let user = await User.findById(userId);

    if (!user) return res.status(400).json({ message: "User not found" });

    if (
      (currentPassword && !newPassword) ||
      (!currentPassword && newPassword)
    ) {
      res
        .status(400)
        .json({ message: "Please provide both current and new password" });
    }

    if (currentPassword && newPassword) {
      if (currentPassword !== user.password) {
        return res.status(400).json({ message: "Password is incorrect" });
      }

      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters lng" });
      }

      user.password = newPassword;
    }

    user.profileImg = profileImg || user.profileImg
    user.coverImg = coverImg || user.coverImg
    user.fullName = fullName || user.fullName
    user.bio = bio || user.bio
    user.userName = userName || user.userName

    user = await user.save()
    user.password = null

    return res.status(200).json(user)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" });
  }
};
