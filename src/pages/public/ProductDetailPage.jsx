import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar, FiTruck, FiPackage, FiRefreshCw, FiChevronRight, FiChevronLeft, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate API call
    setTimeout(() => {
      // Mock product data
      setProduct({
        id,
        name: "Giày Bóng Đá Nike Mercurial Vapor 15 Elite",
        price: 3200000,
        originalPrice: 3800000,
        discount: 15,
        brand: "Nike",
        sku: "NK-MV15-001",
        rating: 4.8,
        reviews: 124,
        availability: "Còn hàng",
        description: "Giày bóng đá Nike Mercurial Vapor 15 Elite mang đến thiết kế siêu nhẹ và công nghệ cao cấp giúp tăng tốc độ và độ chính xác khi sút bóng. Phần upper làm từ vật liệu Flyknit kết hợp với công nghệ NikeSkin mang đến cảm giác mỏng nhẹ nhưng vẫn đảm bảo độ bền cao.",
        details: "Công nghệ Nike Aerow Track trên mặt giày mang lại sự thoải mái và phù hợp hơn. Cấu trúc Vaporposite+ mang đến sự kết hợp hoàn hảo giữa độ bền và cảm nhận bóng. Gót giày được làm bằng lớp đệm mềm hỗ trợ tối đa trong trận đấu dài.",
        features: [
          "Công nghệ Flyknit với lớp phủ NikeSkin",
          "Đế giày thiết kế cho sân cỏ nhân tạo và sân cỏ tự nhiên",
          "Trọng lượng siêu nhẹ tối đa hóa tốc độ",
          "Lớp đệm êm ái và thoải mái",
          "Công nghệ Nike Grip giữ chân không bị trượt"
        ],
        colors: [
          { name: "Đen / Xám", code: "#222222", image: "/assets/images/products/shoe-black.jpg" },
          { name: "Đỏ / Đen", code: "#c62828", image: "/assets/images/products/shoe-red.jpg" },
          { name: "Trắng / Xanh", code: "#f5f5f5", image: "/assets/images/products/shoe-white.jpg" }
        ],
        sizes: [39, 40, 41, 42, 43, 44],
        images: [
          "/assets/images/products/football-shoes-1.jpg",
          "/assets/images/products/football-shoes-1-side.jpg",
          "/assets/images/products/football-shoes-1-back.jpg",
          "/assets/images/products/football-shoes-1-sole.jpg"
        ],
        specifications: [
          { name: "Thương hiệu", value: "Nike" },
          { name: "Loại sân", value: "Sân cỏ nhân tạo, Sân cỏ tự nhiên" },
          { name: "Chất liệu upper", value: "Flyknit, NikeSkin" },
          { name: "Chất liệu đế", value: "Cao su đặc biệt" },
          { name: "Trọng lượng", value: "195g" }
        ],
        shipping: {
          free: true,
          estimatedDays: "2-4"
        }
      });

      // Related products
      setRelatedProducts([
        {
          id: 2,
          name: "Giày Bóng Đá Adidas Predator Edge",
          price: 2800000,
          originalPrice: 3400000,
          discount: 17,
          image: "/assets/images/products/football-shoes-2.jpg",
          brand: "Adidas",
          rating: 4.6
        },
        {
          id: 3,
          name: "Giày Bóng Đá Puma Future Z",
          price: 2500000,
          originalPrice: 3000000,
          discount: 16,
          image: "/assets/images/products/football-shoes-3.jpg",
          brand: "Puma",
          rating: 4.5
        },
        {
          id: 4,
          name: "Giày Bóng Đá Nike Phantom GT2",
          price: 3500000,
          originalPrice: 4100000,
          discount: 14,
          image: "/assets/images/products/football-shoes-4.jpg",
          brand: "Nike",
          rating: 4.9
        }
      ]);

      setLoading(false);
    }, 800);
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleColorSelect = (colorIndex) => {
    setSelectedColor(colorIndex);
    // In a real app, this might change the product images to show the selected color
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn kích thước");
      return;
    }
    
    // In a real app, dispatch to cart state/context or API call
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
  };

  const handleImageNav = (direction) => {
    if (direction === 'next') {
      setActiveImage((prev) => (prev + 1) % product.images.length);
    } else {
      setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex text-sm">
          <Link to="/" className="text-gray-500 hover:text-blue-600">
            Trang chủ
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/football" className="text-gray-500 hover:text-blue-600">
            Sản phẩm bóng đá
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/football/shoes" className="text-gray-500 hover:text-blue-600">
            Giày bóng đá
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail Main Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row -mx-4">
          {/* Product Image Gallery */}
          <div className="md:w-1/2 px-4 mb-8 md:mb-0">
            <div className="relative">
              <div className="sticky top-24 space-y-4">
                <div className="relative overflow-hidden rounded-lg bg-gray-100 h-96 mb-4">
                  {product.discount > 0 && (
                    <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-sm font-medium px-2 py-1 rounded">
                      -{product.discount}%
                    </div>
                  )}
                  
                  <img
                    src={product.images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-105"
                  />
                  
                  <button 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                    onClick={() => handleImageNav('prev')}
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  
                  <button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                    onClick={() => handleImageNav('next')}
                  >
                    <FiChevronRight size={20} />
                  </button>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`
                        cursor-pointer border-2 rounded-md overflow-hidden
                        ${activeImage === index ? 'border-blue-600' : 'border-transparent'}
                      `}
                      onClick={() => setActiveImage(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - view ${index + 1}`} 
                        className="w-full h-24 object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 px-4">
            <div className="lg:pl-8">
              <div className="mb-2">
                <span className="inline-block text-sm font-medium text-blue-600 mb-1">{product.brand}</span>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <FiStar
                        key={index}
                        className={`${
                          index < Math.floor(product.rating) 
                            ? "text-yellow-400 fill-current" 
                            : "text-gray-300"
                        } h-5 w-5`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-700">
                      {product.rating} ({product.reviews} đánh giá)
                    </span>
                  </div>
                  <span className="mx-3 text-gray-300">|</span>
                  <span className="text-sm text-gray-700">SKU: {product.sku}</span>
                </div>
              </div>
              
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold text-gray-900 mr-2">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="ml-2 text-sm font-medium text-red-600">
                      Tiết kiệm {formatPrice(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
              </div>
              
              <div className="mb-6">
                <h2 className="text-sm font-medium text-gray-900 mb-2">Mô tả ngắn</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              {/* Color Selection */}
              <div className="mb-6">
                <h2 className="text-sm font-medium text-gray-900 mb-2">
                  Màu sắc: <span className="text-gray-600 font-normal">
                    {selectedColor !== '' ? product.colors[selectedColor].name : 'Chọn màu'}
                  </span>
                </h2>
                <div className="flex space-x-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`
                        w-10 h-10 rounded-full focus:outline-none border-2 p-0.5
                        ${selectedColor === index ? 'border-blue-600' : 'border-transparent'}
                      `}
                      onClick={() => handleColorSelect(index)}
                      title={color.name}
                    >
                      <span 
                        className="block w-full h-full rounded-full"
                        style={{ backgroundColor: color.code }}
                      ></span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-medium text-gray-900">
                    Kích thước: <span className="text-gray-600 font-normal">
                      {selectedSize ? selectedSize : 'Chọn kích thước'}
                    </span>
                  </h2>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Bảng kích thước
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`
                        py-2 text-center rounded-md border text-sm font-medium transition-colors
                        ${selectedSize === size
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                        }
                      `}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity & Add to Cart */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      className="px-3 py-2 text-gray-600 hover:text-gray-900"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      -
                    </button>
                    <span className="w-10 text-center">{quantity}</span>
                    <button
                      className="px-3 py-2 text-gray-600 hover:text-gray-900"
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    onClick={handleAddToCart}
                  >
                    <FiShoppingCart className="mr-2" />
                    Thêm vào giỏ hàng
                  </button>
                  
                  <button
                    className="p-3 border border-gray-300 rounded-md text-gray-600 hover:text-red-600 hover:border-red-600 transition-colors"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <FiHeart className={isWishlisted ? "fill-current text-red-600" : ""} />
                  </button>
                </div>
              </div>
              
              {/* Product Highlights */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiTruck className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Giao hàng {product.shipping.free ? 'miễn phí' : 'tiêu chuẩn'}</h3>
                      <p className="text-sm text-gray-500">Dự kiến: {product.shipping.estimatedDays} ngày</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiRefreshCw className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Đổi trả dễ dàng</h3>
                      <p className="text-sm text-gray-500">Trong vòng 30 ngày</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiPackage className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Sản phẩm chính hãng</h3>
                      <p className="text-sm text-gray-500">100% authentic</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiClock className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Tình trạng</h3>
                      <p className="text-sm text-green-600 font-medium">{product.availability}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-12 border-t border-gray-200">
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          <button
            className={`mr-8 py-4 text-sm font-medium whitespace-nowrap ${
              activeTab === "description"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Mô tả chi tiết
          </button>
          <button
            className={`mr-8 py-4 text-sm font-medium whitespace-nowrap ${
              activeTab === "specifications"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("specifications")}
          >
            Thông số kỹ thuật
          </button>
          <button
            className={`mr-8 py-4 text-sm font-medium whitespace-nowrap ${
              activeTab === "reviews"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Đánh giá ({product.reviews})
          </button>
        </div>

        <div className="prose max-w-none">
          {activeTab === "description" && (
            <div>
              <p className="mb-4">{product.description}</p>
              <p className="mb-6">{product.details}</p>
              
              <h3 className="text-lg font-medium mb-4">Đặc điểm nổi bật</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {product.specifications.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {spec.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FiStar
                      key={index}
                      className={`${
                        index < Math.floor(product.rating) 
                          ? "text-yellow-400 fill-current" 
                          : "text-gray-300"
                      } h-6 w-6`}
                    />
                  ))}
                </div>
                <span className="ml-3 text-gray-700">
                  Dựa trên {product.reviews} đánh giá
                </span>
              </div>
              
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Chưa có đánh giá nào cho sản phẩm này.</p>
                <button className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 bg-white font-medium rounded-md hover:bg-blue-50">
                  Viết đánh giá
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Sản phẩm tương tự</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <motion.div
                key={relatedProduct.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden group"
              >
                <Link to={`/product/${relatedProduct.id}`} className="block relative">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {relatedProduct.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      -{relatedProduct.discount}%
                    </div>
                  )}
                </Link>
                <div className="p-4">
                  <span className="text-sm font-medium text-gray-500 mb-1 block">
                    {relatedProduct.brand}
                  </span>
                  <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-blue-600">
                    <Link to={`/product/${relatedProduct.id}`}>{relatedProduct.name}</Link>
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <FiStar className="text-yellow-400 fill-current h-4 w-4 mr-1" />
                      <span className="text-sm text-gray-700">
                        {relatedProduct.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-base font-medium text-gray-900">
                        {formatPrice(relatedProduct.price)}
                      </span>
                      {relatedProduct.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          {formatPrice(relatedProduct.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button className="p-2 rounded-full bg-gray-100 text-gray-700 hover:text-blue-600 transition-colors">
                      <FiShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 