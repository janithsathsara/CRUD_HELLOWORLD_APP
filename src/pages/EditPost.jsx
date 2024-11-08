import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPost = ({
    posts,
    handleEdit,
    editTitle,
    setEditTitle,
    editBody,
    setEditBody,
}) => {
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);
    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post]);
    const handleSubmit = (e) => {
        e.preventDefault();
        handleEdit(id);
        setEditTitle("");
        setEditBody("");
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Title</label>
            <input
                type="text"
                id="postTitle"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Body</label>
            <input
                type="text"
                id="postBody"
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default EditPost;
