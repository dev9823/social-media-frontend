import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ProfileImage from "./ProfileImage";
import { AiOutlineSend } from "react-icons/ai";
import { postData } from "../utils/fetchData";

const CommentInput = ({ post }) => {
  const [commentInput, setCommentInput] = useState("");
  const queryClient = useQueryClient();
  const { profile_image, username } = queryClient.getQueryData(["profile"]);
  const commentMutation = useMutation((data) =>
    postData(`api/posts/${post.id}/${"comments"}/`, data)
  );
  // use useState to add the new comment in to the previous comment
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const text = commentInput;
    if (commentInput.length !== 0) {
      commentMutation.mutate({ text });
      setCommentInput("");
    }
  };

  const handleChange = (e) => {
    setCommentInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };
  return (
    <div className='flex items-center mt-3 gap-x-1 px-2'>
      <div className='w-11'>
        <ProfileImage image={profile_image} name={username} size={10} />
      </div>
      <form
        onSubmit={handleCommentSubmit}
        className='w-full bg-[#131517] px-3 py-2 rounded-xl flex items-center'>
        <textarea
          className='w-full max-h-24 focus:outline-none placeholder:text-gray-500 bg-[#131517] scrollbar-none'
          placeholder='Write Your comment...'
          value={commentInput}
          rows={1}
          onChange={handleChange}
        />
        <AiOutlineSend
          className='ml-2'
          onClick={handleCommentSubmit}
          size={25}
        />
      </form>
    </div>
  );
};

export default CommentInput;
