import React, { useRef, useState } from "react";
import {
  AiOutlineComment,
  AiOutlineSend,
  AiFillLike,
  AiOutlineLike,
} from "react-icons/ai";
import Comments from "./Comments";
import ProfileImage from "./ProfileImage";
import { SlControlPlay } from "react-icons/sl";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostMutation, deletePostMutation } from "../service/postService";
import { postData } from "../utils/fetchData";
import CommentInput from "./CommentInput";
const Post = ({ post, isLikedByCurrentUser, isSavedByCurrentUser }) => {
  const [like, setLike] = useState(isLikedByCurrentUser);
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [save, setSave] = useState(isSavedByCurrentUser);
  const [saveCount, setSaveCount] = useState(post.save_count);
  const [comment, setComment] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const { post_comments } = post;
  const likeMutation = createPostMutation("likes");
  const saveMutation = createPostMutation("save");

  const deleteSaveMutation = deletePostMutation("save");
  const deleteLikeMutation = deletePostMutation("likes");

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleLike = () => {
    if (!like) {
      setLikeCount((prevState) => prevState + 1);
      likeMutation.mutate(post.id, null);
    } else {
      setLikeCount((prevState) => prevState - 1);
      deleteLikeMutation.mutate(post.id);
    }
    setLike((prevState) => !prevState);
  };
  const toggleSave = () => {
    if (!save) {
      setSaveCount((prevState) => prevState + 1);
      saveMutation.mutate(post.id, null);
    } else {
      setSaveCount((prevState) => prevState - 1);
      deleteSaveMutation.mutate(post.id);
    }
    setSave((prevState) => !prevState);
  };
  const handleSeeMore = () => setExpanded(!expanded);

  const truncateString = (str) => {
    if (str.length > 30 && !expanded) return str.slice(0, 30) + "...See more";
    else return str;
  };

  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(post.media_file);
  const isVideo = /\.(mp4|mov|avi)$/i.test(post.media_file);

  function getTime(time) {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    let period = "AM";
    if (hours >= 12) {
      period = "PM";
    }

    const displayHours = hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes} ${period}`;
  }

  return (
    <div className='rounded-lg py-2 bg-[#1c1e21] text-slate-300 flex flex-col justify-center'>
      <div className='pl-3 flex space-x-3'>
        <ProfileImage
          image={post.profile_image}
          name={post.username}
          size={10}
        />
        <div className='flex flex-col'>
          <p>{post.username}</p>
          <p className='text-xs'>{getTime(post.created_at)}</p>
        </div>
      </div>

      <div className='px-3 break-words my-1'>
        {post.text && (
          <p onClick={handleSeeMore}>
            {post.media_file ? truncateString(post.text) : post.text}
          </p>
        )}
      </div>

      <div
        className={
          post.media_file ? "flex justify-center items-center mt-3" : "hidden"
        }>
        {isImage && (
          <img
            src={post.media_file}
            alt=''
            className='rounded-lg object-cover'
          />
        )}
        {isVideo && (
          <>
            <video
              ref={videoRef}
              src={post.media_file}
              className=' rounded-lg'
              onClick={handleVideoClick}
            />
            {!isPlaying && (
              <SlControlPlay
                onClick={handleVideoClick}
                className='text-gray-400 absolute top-1/2 bottom-1/2'
                size={45}
              />
            )}
          </>
        )}
      </div>

      <div className='flex justify-between items-center h-8 border-b border-gray-800 px-2'>
        <div className='flex space-x-1'>
          <AiFillLike className='text-red-800' size={25} />
          <span>{likeCount}</span>
        </div>
        <div className='flex gap-x-2'>
          <div className='flex gap-x-1'>
            <span>{post.comment_count}</span>
            <AiOutlineComment size={25} />
          </div>
          <div className='flex'>
            <span>{saveCount}</span>
            <CiBookmark size={25} />
          </div>
        </div>
      </div>

      <div className='flex justify-between py-1 border-b border-gray-800 items-center px-2'>
        <section className='flex space-x-2'>
          {!like ? (
            <AiOutlineLike onClick={toggleLike} size={25} />
          ) : (
            <AiFillLike
              onClick={toggleLike}
              className='text-red-800'
              size={25}
            />
          )}
          <span>Like</span>
        </section>
        <section
          onClick={() => setComment(!comment)}
          className='flex space-x-2'>
          <AiOutlineComment size={25} />
          <span>comments</span>
        </section>
        <section onClick={toggleSave} className='flex space-x-2'>
          {save ? (
            <>
              <IoBookmark className='text-red-800' size={25} />
              <span>save</span>
            </>
          ) : (
            <>
              <CiBookmark size={25} />
              <span>save</span>
            </>
          )}
        </section>
      </div>

      {/* comments */}
      {post_comments.length !== 0 && (
        <div className='flex flex-col space-y-2 max-h-72 mt-3 px-2 overflow-y-scroll scrollbar-none'>
          {comment ? (
            <>
              {post_comments.map((comment) => (
                <Comments key={comment.id} comment={comment} />
              ))}
            </>
          ) : (
            <Comments comment={post_comments[0]} />
          )}
        </div>
      )}

      <CommentInput post={post} />
    </div>
  );
};

export default Post;
