import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);

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

      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5 text-center">View All Posts</h1>
      {posts.length === 0 ? (
        <p className="text-center">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-lg overflow-hidden p-4"
            >
              <Link to={`/posts/${post._id}`}>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700 line-clamp-3">{post.content}</p>
              </Link>
              <div className="mt-2 flex space-x-2">
                <Link to={`/edit/${post._id}`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
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
    </div>
  );
};

export default ViewPosts;
