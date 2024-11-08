import React from "react";

const CreatePost = ({
  handleSubmit,
  postTitle,
  postBody,
  setPostTitle,
  setPostBody,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="postTitle">Title</label>
      <input
        placeholder="post title"
        type="text"
        id="postTitle"
        required
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
      />
      <label htmlFor="postBody">Body</label>
      <input
        placeholder="post body"
        type="text"
        id="postBody"
        required
        value={postBody}
        onChange={(e) => setPostBody(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreatePost;
