import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");
        if (!response.ok) {
          throw new Error("Error fetching posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center">Loading posts...</p>; // Loading state
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold mb-4 text-center">Blog Posts</h1>
      {posts.length === 0 ? (
        <p className="text-center">No posts available.</p> // Message when no posts are found
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold mb-2">
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
              </h2>
              <p className="text-gray-700 mb-4">
                {post.content.substring(0, 100)}...
              </p>
              <Link
                to={`/posts/${post._id}`}
                className="text-blue-500 hover:underline"
              >
                Read more
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
