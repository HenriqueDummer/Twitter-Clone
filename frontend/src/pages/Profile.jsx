import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProfile, getUserPosts } from "../util/http";
import { useParams } from "react-router-dom";
import Feed from "../components/Feed";

const Me = () => {
  const { userName } = useParams();

  const {
    data: profileData,
    isLoading: profileIsLoading,
    isError: profileIsError,
    error: profileError,
  } = useQuery({
    queryFn: () => getProfile(userName),
    queryKey: ["profile", userName],
  });

  const {
    data: postsData,
    isLoading: postsIsLoading,
    isError: postsIsError,
    error: postsError,
  } = useQuery({
    queryFn: () => getUserPosts({ userName }),
    queryKey: ["posts"],
  });

  if (profileError || postsIsError) console.log(error);

  return (
    <section className="border-t border-l border-slate-800 w-1/3 min-w-[40rem] h-full bg-slate-900 overflow-auto">
      <div
        className="w-full h-[14rem] border-b border-r border-slate-800 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${profileData?.coverImg})` }}
      >
        <img
          className="w-[10rem] absolute aspect-square rounded-full -bottom-20 left-5"
          src={profileData?.profileImg}
          alt=""
        />
      </div>
      <div className="w-full border-b border-r border-slate-800 text-zinc-300 p-2">
        <div className="flex justify-end w-full">
          <button className="px-5 py-1 h-10 border border-blue-600 text-blue-600 rounded-full text-lg font-semibold">
            Edit profile
          </button>
        </div>
        <div className="mt-8 pl-3">
          <h2 className="text-xl font-bold">{profileData?.fullName}</h2>
          <p className="text-zinc-400">@{profileData?.userName}</p>
          <p className="my-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
            qui ipsa officia, dicta vitae, quos laudantium hic inventore
            adipisci perspiciatis voluptas culpa at saepe magni rem nisi fugiat
            aspernatur tempora.
          </p>

          <div className="flex gap-5">
            <p className="text-lg flex gap-1 text-zinc-400">
              <span className="font-bold text-zinc-300">221</span>
              Following
            </p>
            <p className="text-lg flex gap-1 text-zinc-400">
              <span className="font-bold text-zinc-300">52</span>
              Followers
            </p>
          </div>
        </div>
      </div>
      <Feed data={postsData} />
    </section>
  );
};

export default Me;
