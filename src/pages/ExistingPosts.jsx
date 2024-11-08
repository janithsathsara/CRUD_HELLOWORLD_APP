import { Link } from "react-router-dom";

const ExistingPosts = ({ posts, search, handleDelete, searchResults }) => {
    return (
        <>
            {posts &&
                !search &&
                posts.map((post) => (
                    <RenderPosts key={post.id} handleDelete={handleDelete} post={post} />
                ))}
            {!posts.length && <p>No posts</p>}
            {posts &&
                search &&
                searchResults.map((post) => (
                    <RenderPosts key={post.id} handleDelete={handleDelete} post={post} />
                ))}
        </>
    );
};

export const RenderPosts = ({ post, handleDelete }) => (
    <div key={post.id}>
        <Link to={`/post/${post.id}`}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </Link>
        <button onClick={() => handleDelete(post.id)}>Delete</button>
        <Link to={`/edit/${post.id}`}>
            <button>Edit</button>
        </Link>
    </div>
);

export default ExistingPosts;
