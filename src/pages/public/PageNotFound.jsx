import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6">Không tìm thấy trang</h2>
        <p className="text-gray-600 mb-8">Trang bạn đang tìm kiếm có thể đã bị xóa hoặc tạm thời không khả dụng.</p>
        <Link 
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound; 