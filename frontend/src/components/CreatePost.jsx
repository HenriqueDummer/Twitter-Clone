import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { queryClient, submitCretePost, submitLike } from "../util/http";

const Post = ({ authUser }) => {
  const imgRef = useRef();
  const textRef = useRef()

  const { mutate } = useMutation({
    mutationFn: submitCretePost,
    onSuccess: () => {

    }
  });

  const [img, setImg] = useState();

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
              <input
                className="bg-transparent border border-slate-800 rounded-lg p-2 mt-2 w-full"
                type="text"
                name="text"
                id="text"
                placeholder={img}
                ref={textRef}
              />

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
                    className="px-3 py-1 bg-blue-600 rounded-full text-lg font-semibold"
                  >
                    <span>Tweet</span>
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
