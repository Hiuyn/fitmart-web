import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiSearch, FiShoppingCart, FiHeart, FiPhone, 
  FiMail, FiMapPin, FiChevronDown
} from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // States
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  
  // Refs
  const searchRef = useRef(null);
  const productMenuRef = useRef(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      if (productMenuRef.current && !productMenuRef.current.contains(event.target)) {
        setProductMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchText)}`);
      setSearchOpen(false);
      setSearchText('');
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top info bar */}
      <div className="border-b border-gray-200 py-2 bg-white hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-sm text-gray-600">
              <FiPhone className="h-4 w-4 mr-1" />
              <span>+84 123 456 789</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FiMail className="h-4 w-4 mr-1" />
              <span>cskh@sport.vn</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FiMapPin className="h-4 w-4 mr-1" />
              <span>Hà Nội, Việt Nam</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="https://facebook.com" className="text-gray-600 hover:text-blue-600" aria-label="Facebook">
              <FaFacebookF className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" className="text-gray-600 hover:text-pink-600" aria-label="Instagram">
              <FaInstagram className="h-4 w-4" />
            </a>
            <a href="https://youtube.com" className="text-gray-600 hover:text-red-600" aria-label="YouTube">
              <FaYoutube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" aria-label="Trang chủ">
              <img src="/logo.png" alt="Logo" className="h-10" />
            </Link>
          </div>
          
          {/* Main menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'}`}>
              TRANG CHỦ
            </Link>
            <div ref={productMenuRef} className="relative">
              <button 
                onClick={() => setProductMenuOpen(!productMenuOpen)}
                className={`flex items-center font-medium ${location.pathname.includes('/san-pham') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'}`}
              >
                SẢN PHẨM
                <FiChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {productMenuOpen && (
                <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <div className="py-1">
                    <Link to="/san-pham/nam" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Đồ thể thao nam
                    </Link>
                    <Link to="/san-pham/nu" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Đồ thể thao nữ
                    </Link>
                    <Link to="/san-pham/giay" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Giày thể thao
                    </Link>
                    <Link to="/san-pham/phu-kien" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Phụ kiện thể thao
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/khuyen-mai" className={`font-medium ${location.pathname === '/khuyen-mai' ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'}`}>
              KHUYẾN MÃI
            </Link>
            <Link to="/lien-he" className={`font-medium ${location.pathname === '/lien-he' ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'}`}>
              LIÊN HỆ
            </Link>
          </nav>
          
          {/* Right actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-gray-600 hover:text-blue-600"
                aria-label="Tìm kiếm"
              >
                <FiSearch className="h-5 w-5" />
              </button>
              
              {searchOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg p-2">
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </form>
                </div>
              )}
            </div>
            
            {/* Wishlist */}
            <Link to="/wishlist" className="text-gray-600 hover:text-blue-600" aria-label="Yêu thích">
              <FiHeart className="h-5 w-5" />
            </Link>
            
            {/* Cart */}
            <Link to="/cart" className="text-gray-600 hover:text-blue-600 relative" aria-label="Giỏ hàng">
              <FiShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            
            {/* Auth buttons */}
            <div className="flex items-center space-x-2">
              <Link to="/login" className="text-gray-800 hover:text-blue-600 text-sm font-medium">
                Đăng nhập
              </Link>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded">
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;