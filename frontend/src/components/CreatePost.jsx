import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { queryClient, submitCreatePost } from "../util/http";

const Post = ({ authUser }) => {
  const imgRef = useRef();
  const textRef = useRef()

  const [img, setImg] = useState();


  const { mutate, isPending } = useMutation({
    mutationFn: submitCreatePost,
    onSuccess: () => {
      setImg("")
      textRef.current.value = ""
      queryClient.invalidateQueries(["posts"])
    }
  });


  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function handleCreatePost() {
    mutate({text: textRef.current.value, img})
  }

  return (
    <section className="flex flex-col border-t border-l border-slate-800 items-center">
      <div className="w-full min-h-10 p-2 pb-0 flex border-b border-r border-slate-800">
        <img className="w-16 h-16 rounded-full" src={authUser.profileImg} alt="" />
        <div className="px-2 text-zinc-300 w-full">
            <form className="w-full">
            <textarea
              className='textarea w-full mt-2 text-lg resize-none h-auto border-none focus:outline-none bg-slate-900 border-gray-800'
              placeholder='What is happening?!'
              ref={textRef}
            />

              {img && 
              <div className="relative">
                <button onClick={() => setImg(null)} className="bg-slate-900 w-10 aspect-square rounded-full absolute right-2 top-2 opacity-70">
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <img className="w-full rounded-lg mt-2" src={img} alt="" />
              </div>
              }

              <div className="flex w-full">
                <div className="flex justify-between items-center w-full h-16">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImgChange}
                    hidden
                    ref={imgRef}
                  />
                  <button
                    onClick={() => imgRef.current.click()}
                    type="button"
                    className="text-xl text-blue-600"
                  >
                    <i className="fa-regular fa-image"></i>
                  </button>
                  <button
                    type="button"
                    onClick={handleCreatePost}
                    className={`px-3 py-1 ${isPending ?  "bg-blue-400" : "bg-blue-600"} rounded-full text-lg font-semibold`}
                    disabled={isPending}
                  >
                    <span>
                      {isPending ? "Posting..." : "Tweet"}
                    </span>
                  </button>
                </div>
              </div>
            </form>
        </div>
      </div>
    </section>
  );
};

export default Post;
