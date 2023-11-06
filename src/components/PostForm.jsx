import React, { useState } from "react";
import { BsArrowLeft, BsCardImage } from "react-icons/bs";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProfileImage from "./ProfileImage";
import { postData } from "../utils/fetchData";

const PostForm = ({ onClose }) => {
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData(["profile"]);
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState(null);
  const createPostMutation = useMutation((post) =>
    postData(`api/posts/`, post)
  );

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("text", postText);
      if (file) formData.append("media_file", file);

      await createPostMutation.mutateAsync(formData, {
        onSuccess: () => {
          setPostText("");
          setFile(null);
        },
      });
      console.log("success full created");
    } catch (error) {
      console.log(error);
    }
  };
  const disable = !file && postText.length === 0;
  return (
    <div className=' shadow-2xl shadow-[#222222] flex text-slate-300 flex-col max-w-[31rem] sm:max-h-[28rem] sm:w-[31rem] w-full h-full bg-[#0b0b0b] space-y-4 rounded-lg'>
      <div className='flex items-center border-b border-gray-700 p-3'>
        <BsArrowLeft size={25} onClick={onClose} />
        <p className='w-full text-center '>Create post</p>
        <button
          onClick={handleSubmit}
          disabled={disable}
          className={`sm:hidden rounded-lg bg-indigo-800 px-5 py-0.5 ${
            disable ? "bg-indigo-900" : ""
          }`}>
          post
        </button>
      </div>
      <div className='flex text-lg justify-start items-center space-x-2 px-2'>
        <ProfileImage
          image={profile.profile_image}
          name={profile.username}
          size={9}
        />
        <p>{profile.username}</p>
      </div>

      <div className='flex'>
        <textarea
          className='w-full h-40 focus:outline-none text-xl text-text-gray-500 placeholder:text-gray-500 placeholder:text-xl bg-[#0b0b0b] px-3 py-1 mt-4 scrollbar-none'
          placeholder='Share your idea'
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
      </div>

      <div className='border-b border-indigo-950 flex justify-center items-center mx-3 pb-1'>
        <label
          className='flex gap-x-2 items-center w-full sm:px-10'
          htmlFor='file'>
          {file ? (
            <p>{file.name}</p>
          ) : (
            <p className='text-sm sm:text-lg'>
              Add image or video to your post
            </p>
          )}
          <span className='flex gap-x-2'>
            <BsCardImage size={25} /> <MdOutlineVideoLibrary size={25} />
          </span>
        </label>
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
            console.log(file);
          }}
          id='file'
          className='hidden'
          type='file'
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={disable}
        className={`hidden sm:block bg-indigo-800 py-1 text-lg mx-3 rounded-lg ${
          disable ? "bg-indigo-900" : ""
        }`}>
        Post
      </button>
    </div>
  );
};

export default PostForm;
