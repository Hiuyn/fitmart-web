import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg text-gray-600">Giỏ hàng hiện đang trống</p>
        <Link to="/" className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
};

export default Cart; 