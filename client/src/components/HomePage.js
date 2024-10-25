import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-bold mb-5 text-center text-gray-800">
          Welcome to the Blog
        </h1>
        <div className="flex flex-col space-y-4">
          <Link to="/create" className="text-white">
            <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              Create a New Post
            </button>
          </Link>
          <Link to="/blogs" className="text-white">
            <button className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              View All Posts
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
