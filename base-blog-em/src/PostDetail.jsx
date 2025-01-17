import { useQuery,useMutation } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post }) {

  const { data, isError,isLoading, error } = useQuery({
    queryKey: ["postComments",post.id],
    queryFn: () => fetchComments(post.id),
 
  });

  const deleteMutation = useMutation((postId) => deletePost(postId));



  if (isError) return <div>there somthing wrong {error.toString()}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={()=>deleteMutation.mutate(post.id)}>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
