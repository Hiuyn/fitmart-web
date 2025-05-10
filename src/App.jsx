import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Import các trang chính
import HomePage from './pages/public/HomePage';
import FootballProductPage from './pages/public/FootballProductPage';
import RunningProductPage from './pages/public/RunningProductPage';
import TennisProductPage from './pages/public/TennisProductPage';
import VolleyballProductPage from './pages/public/VolleyballProductPage';
import BasketballProductPage from './pages/public/BasketballProductPage';
import ProductDetailPage from './pages/public/ProductDetailPage';
// Chỉ import PageNotFound và Cart mà không khai báo lại bằng lazy loading
import PageNotFound from './pages/public/PageNotFound';
import Cart from './pages/public/Cart';
import LoginPage from './pages/public/LoginPage';
import SignupPage from './pages/public/SignupPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Trang chính */}
          <Route path="/" element={<HomePage />} />
          
          {/* Trang danh mục */}
          <Route path="/football" element={<FootballProductPage />} />
          <Route path="/running" element={<RunningProductPage />} />
          <Route path="/tennis" element={<TennisProductPage />} />
          <Route path="/volleyball" element={<VolleyballProductPage />} />
          <Route path="/basketball" element={<BasketballProductPage />} />
          
          {/* Trang chi tiết sản phẩm */}
          <Route path="/product/:id" element={<ProductDetailPage />} />
          
          {/* Trang giỏ hàng */}
          <Route path="/cart" element={<Cart />} />
          
          {/* Đăng nhập / Đăng ký */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* 404 Page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
