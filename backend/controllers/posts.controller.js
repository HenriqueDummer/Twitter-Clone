import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const createPost = async (req, res) => {
  let post = req.body;

  try {
    const { text, img } = req.body;
    const userId = req.user._id.toString();

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!text && !img) {
      return res
        .status(400)
        .json({ message: "Must provide a image or a text" });
    }

    const newPost = new Post({
      user: userId,
      text,
      img,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const likePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: postId } = req.params;

    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    const userLikedThePost = post.likes.includes(userId);

    if (userLikedThePost) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      return res.status(200).json({ message: "Disliked the post" });
    } else {
      post.likes.push(userId);

      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });

      await post.save();
      await notification.save();

      return res.status(200).json({ message: "Liked the post" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json({ message: "Post not found" });

    if (!text)
      return res.status(400).json({ message: "Text field is required" });

    const comment = { text, user: userId };

    post.comments.push(comment);
    await post.save();

    res.status(200).json({ message: "Commented on post" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json({ message: "Post not found" });

    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You are not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate({
        path: "user",
        select: "-password"
    }).populate({
        path: "comments.user",
        select: "-password"
    });

    if(posts.length == 0){
        return res.status(200).json([])
    }

    res.status(200).json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Internal server error" });
  }
};
