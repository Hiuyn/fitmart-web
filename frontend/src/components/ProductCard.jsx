import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiEye, FiStar, FiBarChart2 } from 'react-icons/fi';
import PropTypes from 'prop-types';

const ProductCard = ({ product, layout = "grid" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Format price with Vietnamese currency
  const formatPrice = (price) => price.toLocaleString('vi-VN') + '₫';

  // Xử lý khi hình ảnh tải xong
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      className={`product-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
        layout === "list" ? "flex flex-col md:flex-row" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Phần hình ảnh sản phẩm */}
      <div className={`relative overflow-hidden ${layout === "list" ? "md:w-2/5" : ""}`}>
        {/* Badge cho sản phẩm mới */}
        {product.isNew && (
          <div className="absolute top-2 right-2 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-sm">
            MỚI
          </div>
        )}
        
        {/* Badge cho sản phẩm bán chạy */}
        {product.isBestSeller && (
          <div className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-sm">
            BÁN CHẠY
          </div>
        )}
        
        {/* Badge giảm giá */}
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-sm">
            -{product.discount}%
          </div>
        )}
        
        {/* Khung ảnh với tỷ lệ cố định */}
        <div className={`ratio-container ${layout === "horizontal" ? "ratio-container-4x3" : ""}`}>
          {/* Ảnh placeholder khi đang tải */}
          <div className={`blur-placeholder ${isLoaded ? 'loaded' : ''}`}>
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                onLoad={handleImageLoaded}
              />
            </Link>
          </div>
          
          {/* Quick action buttons */}
          <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent 
            flex justify-center space-x-2 transition-all duration-300
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
              className="bg-white text-gray-800 rounded-full p-2 hover:bg-blue-600 hover:text-white transition-colors focus-ring"
              aria-label="Add to cart"
            >
              <FiShoppingCart size={16} />
            </button>
            <button 
              className="bg-white text-gray-800 rounded-full p-2 hover:bg-red-500 hover:text-white transition-colors focus-ring"
              aria-label="Add to wishlist"
            >
              <FiHeart size={16} />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="bg-white text-gray-800 rounded-full p-2 hover:bg-green-600 hover:text-white transition-colors focus-ring"
              aria-label="Quick view"
            >
              <FiEye size={16} />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Phần thông tin sản phẩm */}
      <div className={`p-4 flex flex-col ${layout === "list" ? "md:w-3/5 md:p-6" : ""}`}>
        {/* Thương hiệu (nếu có) */}
        {product.brand && (
          <span className="text-xs font-medium text-gray-500 mb-1">{product.brand}</span>
        )}
        
        {/* Tên sản phẩm */}
        <Link to={`/product/${product.id}`} className="group">
          <h3 className="font-medium text-gray-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FiStar 
                key={i} 
                size={14}
                className={`${i < Math.floor(product.rating) ? "fill-current" : ""}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.rating}) · {product.reviews} đánh giá
          </span>
        </div>
        
        {/* Giá */}
        <div className="mt-auto">
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-gray-800">
              {formatPrice(product.price)}
            </span>
            
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Status indicators */}
          <div className="flex items-center mt-2 text-xs text-gray-500">
            {product.inStock ? (
              <span className="flex items-center text-green-600">
                <span className="w-2 h-2 rounded-full bg-green-600 mr-1"></span> Còn hàng
              </span>
            ) : (
              <span className="flex items-center text-red-500">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span> Hết hàng
              </span>
            )}
            
            {product.freeShipping && (
              <span className="ml-4">Miễn phí vận chuyển</span>
            )}
          </div>
          
          {/* Buy button */}
          <div className="mt-3">
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition transform hover:translate-y-px"
              disabled={!product.inStock}
            >
              {product.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Các badge đặc biệt */}
      {product.flashSale && (
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-2 left-0 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-r-full flex items-center">
            <FiBarChart2 className="mr-1" /> Flash Sale
          </div>
        </div>
      )}
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    discount: PropTypes.number,
    image: PropTypes.string.isRequired,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    reviews: PropTypes.number,
    brand: PropTypes.string,
    isNew: PropTypes.bool,
    isBestSeller: PropTypes.bool,
    inStock: PropTypes.bool,
    freeShipping: PropTypes.bool,
    flashSale: PropTypes.bool
  }).isRequired,
  layout: PropTypes.oneOf(['grid', 'list', 'horizontal']),
};

ProductCard.defaultProps = {
  layout: 'grid'
};

export default ProductCard; 