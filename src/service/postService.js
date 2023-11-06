import { deleteData, getData, postData } from "../utils/fetchData";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUserId, getJwt } from "./authService";

export const getPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getData("posts/"),
  });
};

export function createPostMutation(url) {
  const postMutation = useMutation((postId, data) =>
    postData(`api/posts/${postId}/${url}/`, data)
  );
  return postMutation;
}

export function deletePostMutation(url) {
  const userId = getCurrentUserId();

  const postMutation = useMutation((postId) =>
    deleteData(`api/posts/${postId}/${url}/${userId}/`)
  );
  return postMutation;
}
