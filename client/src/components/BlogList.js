// BlogList.js
import React, { useEffect, useState } from 'react';

function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch('http://localhost:5000/api/posts');
    const data = await response.json();
    setPosts(data);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogList;
