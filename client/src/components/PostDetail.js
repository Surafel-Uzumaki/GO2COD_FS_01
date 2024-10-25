import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function PostDetail() {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/${id}`
        );
        setPost(response.data);
      } catch (error) {
        setError("Post not found");
      }
    };

    fetchPost();
  }, [id]); // Dependency array includes id

  if (error) {
    return (
      <div className="container mx-auto p-5 text-red-600">Error: {error}</div>
    );
  }

  if (!post) {
    return <div className="container mx-auto p-5">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Title Section */}
        <h2 className="text-3xl font-bold text-center mb-3 p-4 border-b">
          {post.title}
        </h2>

        {/* Image Section */}
        {post.imagePath && (
          <div className="relative">
            <img
              src={`http://localhost:5000/uploads/${post.imagePath}`}
              alt={post.title}
              className="w-full h-64 object-cover mb-4 lg:h-96 lg:w-[600px] mx-auto" // Fixed size for larger screens
            />
          </div>
        )}

        {/* Content Section */}
        <div className="p-4 border-t border-gray-300 bg-gray-50">
          <p className="text-gray-700 text-lg">{post.content}</p>
        </div>

        {/* Navigation Buttons */}
      </div>
      <div className="flex justify-between p-4">
        <Link to="/">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Back to Home
          </button>
        </Link>
        <Link to="/blogs">
          <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
            Back to Blogs
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PostDetail;
