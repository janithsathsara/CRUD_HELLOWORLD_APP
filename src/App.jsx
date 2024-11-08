import { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Header,
    Nav,
    ExistingPosts,
    CreatePost,
    PostPage,
    EditPost,
} from "./pages";

//TODO:
//add axios to get, post and edit data
//comment out the local storage stuff
function App() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    //const [posts, setPosts] = useState(
    //    localStorage.getItem("posts")
    //        ? JSON.parse(localStorage.getItem("posts"))
    //        : [],
    //);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    //create api with axios
    const api = axios.create({
        baseURL: "http://localhost:3500",
    });
    const handleEdit = async (id) => {
        const postIndex = posts.findIndex((post) => post.id == id);
        const editedPost = { id: id, title: editTitle, body: editBody };
        try {
            const response = await api.put(`/posts/${id}`, editedPost);
            const updatedPosts = [...posts];
            updatedPosts[postIndex] = {
                //...updatedPosts[postIndex],
                ...response.data,
            };
            setPosts(updatedPosts);
            setEditTitle("");
            setEditBody("");
        } catch (err) {
            console.log(err.message);
        } finally {
            navigate("/");
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const newPost = { id: id, title: postTitle, body: postBody };
        try {
            const response = await api.post("/posts", newPost);
            setPosts([...posts, response.data]);
            setPostTitle("");
            setPostBody("");
        } catch (err) {
            console.log(err.message);
        } finally {
            navigate("/");
        }
    };

    //useEffect(() => {
    //    localStorage.setItem("posts", JSON.stringify(posts));
    //}, [posts]);

    //Get data
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get("/posts");
                setPosts(response.data);
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else {
                    console.log(err.message);
                }
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const filteredPosts = posts.filter(
            (post) =>
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.body.toLowerCase().includes(search.toLowerCase()),
        );
        setSearchResults(filteredPosts);
    }, [posts, search]);

    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`/posts/${id}`);
            setPosts(posts.filter((post) => post.id !== id));
        } catch (err) {
            console.log(err.message);
        } finally {
            navigate("/");
        }
    };
    return (
        <>
            <Header title="React JS blog" />
            <Nav search={search} setSearch={setSearch} />
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to="/create-post">
                <button>Create post</button>
            </Link>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ExistingPosts
                            posts={posts}
                            search={search}
                            handleDelete={handleDelete}
                            searchResults={searchResults}
                        />
                    }
                />
                <Route
                    path="/create-post"
                    element={
                        <CreatePost
                            postTitle={postTitle}
                            setPostTitle={setPostTitle}
                            postBody={postBody}
                            setPostBody={setPostBody}
                            handleSubmit={handleSubmit}
                        />
                    }
                />
                <Route path="/post/:id" element={<PostPage posts={posts} />} />
                <Route
                    path="/edit/:id"
                    element={
                        <EditPost
                            posts={posts}
                            handleEdit={handleEdit}
                            editTitle={editTitle}
                            setEditTitle={setEditTitle}
                            editBody={editBody}
                            setEditBody={setEditBody}
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default App;
