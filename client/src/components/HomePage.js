import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-5 text-center text-gray-800">
          Welcome to the Blog
        </h1>
        <div className="flex justify-between">
          <Link to="/create" className="text-white">
            <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
              Create a New Post
            </button>
          </Link>
          <Link to="/blogs" className="text-white">
            <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
              View All Posts
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
