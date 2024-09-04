import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { queryClient, submitLike } from "../util/http";

const Post = ({ postData, authUser }) => {
  const { mutate } = useMutation({
    mutationFn: submitLike,
    onSuccess: (updatedLikes) => {
      queryClient.setQueryData(["posts"], (oldData) => {
        return oldData.map((post) => {
          if (post._id === postData._id) {
            return { ...post, likes: updatedLikes };
          }
          return post;
        });
      });
    },
  });

  const user = postData.user;

  const isLiked = postData.likes.includes(authUser._id);

  function handleLike() {
    mutate(postData._id);
  }

  return (
    <section className="flex flex-col border-t border-l border-slate-800 items-center">
      <div className="w-full min-h-10 p-2 pb-0 flex border-b border-r border-slate-800">
        <img className="w-16 h-16 rounded-full" src={user.profileImg} alt="" />
        <div className="px-2 text-zinc-300 w-full">
          <div className="flex items-end">
            <h4 className="text-lg font-semibold">{user.fullName}</h4>
            <p className="text-zinc-400 ml-2">@{user.userName}</p>
          </div>
          <p>{postData.text}</p>
          <img className="w-full rounded-lg mt-2" src={postData.img} alt="" />
          <div className="h-14 flex gap-8">
            <button
              onClick={handleLike}
              className={`flex gap-1 items-center ${
                isLiked ? "text-red-600" : ""
              }`}
            >
              <i className={`fa-${isLiked ? "solid" : "regular"} fa-heart`}></i>
              <span>Like</span>
            </button>
            <button className="flex gap-1 items-center">
              <i className="fa-regular fa-comment"></i>
              <span>Comment</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
