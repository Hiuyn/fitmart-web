import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition"
        >
          Sign In
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300 ease-in-out">
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignIn;
