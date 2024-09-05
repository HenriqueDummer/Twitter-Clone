import React, { useEffect } from "react";
import Post from "./Post";
import { getAllPosts, getUserPosts } from "../util/http";
import { useQuery } from "@tanstack/react-query";
const Feed = ({ data }) => {
  const getFunction = () =>
    feedType === "forYou" ? getAllPosts : () => getUserPosts({ userName });

  

  return (
    <>
      {data && data?.length === 0 ? (
        <h1>No posts yet</h1>
      ) : (
        data?.map((post) => <Post key={post._id} postData={post} />)
      )}
    </>
  );
};

export default Feed;
