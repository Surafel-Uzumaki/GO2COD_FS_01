import React, { useEffect, useState } from "react";
import "./App.css"; // Import your CSS file

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch("http://localhost:5000/api/posts");
    const data = await response.json();
    setPosts(data);
  };

  const addPost = async () => {
    if (!title || !content) return;
    const response = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    const newPost = await response.json();
    setPosts([...posts, newPost]);
    setTitle("");
    setContent("");
  };

  const deletePost = async (id) => {
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "DELETE",
    });
    setPosts(posts.filter((post) => post._id !== id));
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      <div>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={addPost}>Add Post</button>
      </div>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <button onClick={() => deletePost(post._id)}>Delete Post</button>
        </div>
      ))}
    </div>
  );
}

export default App;
