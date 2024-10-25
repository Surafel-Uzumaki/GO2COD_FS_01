import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error creating post");
      }

      setTitle("");
      setContent("");
      setImage(null);
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold mb-5 text-center text-gray-800">
        Create a New Post
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Create Post
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link to="/blogs">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition duration-300">
            View All Posts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreatePost;
