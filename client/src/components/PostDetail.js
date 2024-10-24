import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <p className="text-center">Loading post details...</p>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold mb-4 text-center">{post.title}</h1>

      {/* Display the image if it exists */}
      {post.imagePath && (
        <div className="flex justify-center mb-4">
          <img
            src={`http://localhost:5000/${post.imagePath}`} // Ensure this path is correct
            alt={post.title}
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}

      <div className="text-gray-800 text-lg leading-relaxed mb-5">
        {post.content}
      </div>

      <div className="flex justify-between mt-6">
        <Link to="/blogs">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Back to Blogs
          </button>
        </Link>
        <Link to="/">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;
