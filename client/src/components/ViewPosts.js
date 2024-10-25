import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting post");
      }

      alert("Post deleted successfully!");
      setPosts(posts.filter((post) => post._id !== postId)); // Update posts state after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5 text-center">View All Posts</h1>
      {posts.length === 0 ? (
        <p className="text-center">Loading posts...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-lg overflow-hidden p-4 transition-transform transform hover:scale-105"
            >
              <Link to={`/posts/${post._id}`}>
                <h2 className="text-xl font-semibold mb-3 text-center">
                  {post.title}
                </h2>
                {post.imagePath && (
                  <img
                    src={`http://localhost:5000/uploads/${post.imagePath}`} // Display image if exists
                    alt={post.title}
                    className="mb-2 w-full h-40 object-cover" // Smaller image size with cover
                  />
                )}
                <p className="text-gray-700 mb-3 text-center">
                  {post.content.length > 100
                    ? `${post.content.substring(0, 100)}...`
                    : post.content}
                </p>
              </Link>
              <div className="flex justify-between">
                <Link to={`/edit/${post._id}`}>
                  <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link to="/">
        <button className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ViewPosts;
