import Post from "./Post";
import { getCurrentUserId } from "../service/authService";

const Feed = ({ posts }) => {
  const user = getCurrentUserId();

  const isLikedByCurrentUser = (post) => {
    return post.post_likes.some((like) => like.user_id === user);
  };

  const isSavedByCurrentUser = (post) => {
    return post.save_post.some((save) => save.user_id === user);
  };
  return (
    <div className='w-full h-full overflow-y-scroll space-y-1 scrollbar-none'>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          isLikedByCurrentUser={isLikedByCurrentUser(post)}
          isSavedByCurrentUser={isSavedByCurrentUser(post)}
        />
      ))}
    </div>
  );
};

export default Feed;
