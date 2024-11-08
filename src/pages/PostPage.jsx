import React from "react";
import { useParams } from "react-router-dom";

const PostPage = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <>
      {post && (
        <div>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      )}
      {!post && <h1>post not found</h1>}
    </>
  );
};

export default PostPage;
