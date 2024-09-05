import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import Feed from "../components/Feed";
import { getAllPosts } from "../util/http";

const Home = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const {data} = useQuery({
    queryFn: getAllPosts,
    queryKey: ["posts"]
  })

  return (
    <div className="w-1/3 min-w-[40rem] h-full bg-slate-900 overflow-auto">
      <CreatePost authUser={authUser} />
      <Feed data={data} />
    </div>
  );
};

export default Home;
