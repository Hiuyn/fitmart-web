import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiFilter, FiGrid, FiList, FiStar, FiHeart, FiShoppingCart, FiX, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

const TennisProductPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [filters, setFilters] = useState({
    brands: [],
    category: [],
    priceRange: [0, 10000000],
    features: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  // Danh sách thương hiệu
  const brands = [
    "Wilson", "Head", "Babolat", "Yonex", "Prince", "Tecnifibre", "Dunlop", "Nike", "Adidas"
  ];

  // Danh sách danh mục
  const categories = ["Vợt", "Giày", "Quần áo", "Bóng", "Phụ kiện"];

  // Danh sách tính năng
  const featureOptions = [
    "Kiểm soát", "Sức mạnh", "Nhẹ", "Cân bằng", "Cho người mới", "Cho người chuyên nghiệp"
  ];

  useEffect(() => {
    // Giả lập API call
    setTimeout(() => {
      const mockProducts = [
        {
          id: 101,
          name: "Vợt Tennis Wilson Pro Staff RF97 Autograph",
          price: 5500000,
          originalPrice: 6200000,
          discount: 11,
          brand: "Wilson",
          image: "/assets/images/products/tennis-racket-1.jpg",
          category: "Vợt",
          rating: 4.9,
          reviewCount: 156,
          features: ["Sức mạnh", "Cho người chuyên nghiệp"],
          isNew: false,
          isBestSeller: true,
          weight: "340g",
          headSize: "97 sq. in",
          description: "Vợt tennis chuyên nghiệp được thiết kế với sự hợp tác của Roger Federer, cung cấp độ kiểm soát và độ chính xác tuyệt vời."
        },
        {
          id: 102,
          name: "Vợt Tennis Babolat Pure Drive",
          price: 4800000,
          originalPrice: 5300000,
          discount: 9,
          brand: "Babolat",
          image: "/assets/images/products/tennis-racket-2.jpg",
          category: "Vợt",
          rating: 4.8,
          reviewCount: 143,
          features: ["Sức mạnh", "Cân bằng"],
          isNew: false,
          isBestSeller: true,
          weight: "300g",
          headSize: "100 sq. in",
          description: "Một trong những vợt được ưa chuộng nhất, Pure Drive cung cấp sự kết hợp hoàn hảo giữa sức mạnh và khả năng kiểm soát."
        },
        {
          id: 103,
          name: "Vợt Tennis Head Graphene 360+ Speed Pro",
          price: 5100000,
          originalPrice: 5600000,
          discount: 9,
          brand: "Head",
          image: "/assets/images/products/tennis-racket-3.jpg",
          category: "Vợt",
          rating: 4.7,
          reviewCount: 112,
          features: ["Kiểm soát", "Cho người chuyên nghiệp"],
          isNew: true,
          isBestSeller: false,
          weight: "310g",
          headSize: "100 sq. in",
          description: "Vợt của Novak Djokovic, mang lại sự cân bằng hoàn hảo giữa sức mạnh và khả năng kiểm soát cho những cú đánh chính xác."
        },
        {
          id: 104,
          name: "Vợt Tennis Yonex EZONE 98",
          price: 4900000,
          originalPrice: 5400000,
          discount: 9,
          brand: "Yonex",
          image: "/assets/images/products/tennis-racket-4.jpg",
          category: "Vợt",
          rating: 4.6,
          reviewCount: 98,
          features: ["Cân bằng", "Kiểm soát"],
          isNew: false,
          isBestSeller: false,
          weight: "305g",
          headSize: "98 sq. in",
          description: "Được thiết kế để mang lại cảm giác thoải mái và công nghệ giảm rung động, giúp người chơi có thể chơi lâu hơn và thoải mái hơn."
        },
        {
          id: 105,
          name: "Giày Tennis Nike Air Zoom Vapor Pro",
          price: 3200000,
          originalPrice: 3700000,
          discount: 14,
          brand: "Nike",
          image: "/assets/images/products/tennis-shoes-1.jpg",
          category: "Giày",
          rating: 4.8,
          reviewCount: 124,
          features: ["Nhẹ", "Cân bằng"],
          isNew: true,
          isBestSeller: true,
          description: "Giày tennis nhẹ và linh hoạt với công nghệ Nike Air Zoom, mang lại sự thoải mái và hỗ trợ tối đa cho những cú di chuyển nhanh trên sân."
        },
        {
          id: 106,
          name: "Giày Tennis Adidas SoleCourt Boost",
          price: 3600000,
          originalPrice: 4100000,
          discount: 12,
          brand: "Adidas",
          image: "/assets/images/products/tennis-shoes-2.jpg",
          category: "Giày",
          rating: 4.7,
          reviewCount: 106,
          features: ["Kiểm soát", "Cho người chuyên nghiệp"],
          isNew: false,
          isBestSeller: false,
          description: "Giày tennis cao cấp với công nghệ Boost, mang lại sự ổn định và hỗ trợ tối đa cho những động tác di chuyển mạnh mẽ trên sân."
        },
        {
          id: 107,
          name: "Áo Tennis Nike Court Dri-FIT",
          price: 890000,
          originalPrice: 1100000,
          discount: 19,
          brand: "Nike",
          image: "/assets/images/products/tennis-apparel-1.jpg",
          category: "Quần áo",
          rating: 4.6,
          reviewCount: 87,
          features: ["Nhẹ", "Thoáng khí"],
          isNew: true,
          isBestSeller: false,
          description: "Áo tennis chất lượng cao với công nghệ Dri-FIT giúp thoát mồ hôi nhanh, giữ cơ thể khô ráo trong suốt trận đấu."
        },
        {
          id: 108,
          name: "Váy Tennis Adidas Club",
          price: 1200000,
          originalPrice: 1400000,
          discount: 14,
          brand: "Adidas",
          image: "/assets/images/products/tennis-apparel-2.jpg",
          category: "Quần áo",
          rating: 4.5,
          reviewCount: 64,
          features: ["Thoáng khí", "Thoải mái"],
          isNew: false,
          isBestSeller: true,
          description: "Váy tennis với thiết kế hiện đại, chất liệu thoáng khí và quần short tích hợp bên trong giúp vận động tự do trên sân."
        },
        {
          id: 109,
          name: "Bóng Tennis Wilson US Open Extra Duty",
          price: 180000,
          originalPrice: 210000,
          discount: 14,
          brand: "Wilson",
          image: "/assets/images/products/tennis-balls-1.jpg",
          category: "Bóng",
          rating: 4.8,
          reviewCount: 234,
          features: ["Độ bền cao", "Tốc độ ổn định"],
          isNew: false,
          isBestSeller: true,
          description: "Bóng tennis chất lượng cao được sử dụng trong giải US Open, phù hợp cho các sân cứng và mang đến trải nghiệm chơi tuyệt vời."
        },
        {
          id: 110,
          name: "Balo Tennis Head Djokovic Backpack",
          price: 2200000,
          originalPrice: 2500000,
          discount: 12,
          brand: "Head",
          image: "/assets/images/products/tennis-accessories-1.jpg",
          category: "Phụ kiện",
          rating: 4.7,
          reviewCount: 76,
          features: ["Nhiều ngăn", "Bền"],
          isNew: true,
          isBestSeller: false,
          description: "Balo tennis cao cấp với nhiều ngăn chứa vợt, giày và các phụ kiện khác, thiết kế đặc biệt dành cho người chơi chuyên nghiệp."
        }
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filters, products]);

  const filterProducts = () => {
    let result = [...products];

    // Lọc theo thương hiệu
    if (filters.brands.length > 0) {
      result = result.filter(product => filters.brands.includes(product.brand));
    }

    // Lọc theo danh mục
    if (filters.category.length > 0) {
      result = result.filter(product => filters.category.includes(product.category));
    }

    // Lọc theo khoảng giá
    result = result.filter(
      product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Lọc theo tính năng
    if (filters.features.length > 0) {
      result = result.filter(product => 
        product.features && product.features.some(feature => filters.features.includes(feature))
      );
    }

    setFilteredProducts(result);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };

      switch (filterType) {
        case "brand":
          if (newFilters.brands.includes(value)) {
            newFilters.brands = newFilters.brands.filter(brand => brand !== value);
          } else {
            newFilters.brands = [...newFilters.brands, value];
          }
          break;
        case "category":
          if (newFilters.category.includes(value)) {
            newFilters.category = newFilters.category.filter(cat => cat !== value);
          } else {
            newFilters.category = [...newFilters.category, value];
          }
          break;
        case "priceRange":
          newFilters.priceRange = value;
          break;
        case "feature":
          if (newFilters.features.includes(value)) {
            newFilters.features = newFilters.features.filter(f => f !== value);
          } else {
            newFilters.features = [...newFilters.features, value];
          }
          break;
        default:
          break;
      }

      return newFilters;
    });
  };

  const resetFilters = () => {
    setFilters({
      brands: [],
      category: [],
      priceRange: [0, 10000000],
      features: [],
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner & Breadcrumb */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-8 mb-6 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sản Phẩm Tennis
            </h1>
            <p className="text-blue-100 mb-6 text-lg">
              Khám phá bộ sưu tập vợt, giày và phụ kiện tennis chất lượng cao từ các thương hiệu hàng đầu thế giới
            </p>
            <div className="flex space-x-4">
              <a
                href="#products"
                className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-blue-50 transition"
              >
                Khám phá ngay
              </a>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="320"
              height="320"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">Sản phẩm tennis</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-1/4 bg-white p-4 rounded-lg shadow-sm border border-gray-100 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Bộ lọc</h2>
            <button onClick={resetFilters} className="text-sm text-blue-600 hover:text-blue-700">
              Đặt lại
            </button>
          </div>

          {/* Thương hiệu */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Thương hiệu</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleFilterChange("brand", brand)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`brand-${brand}`} className="ml-2 text-gray-700">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Danh mục */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Danh mục</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    checked={filters.category.includes(category)}
                    onChange={() => handleFilterChange("category", category)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`category-${category}`} className="ml-2 text-gray-700">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Giá */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Khoảng giá</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>{formatPrice(filters.priceRange[0])}</span>
                <span>{formatPrice(filters.priceRange[1])}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000000"
                step="500000"
                value={filters.priceRange[0]}
                onChange={(e) => handleFilterChange("priceRange", [parseInt(e.target.value), filters.priceRange[1]])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="10000000"
                step="500000"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange("priceRange", [filters.priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="text-xs text-gray-500">Từ</label>
                  <input
                    type="number"
                    min="0"
                    max={filters.priceRange[1]}
                    value={filters.priceRange[0]}
                    onChange={(e) => handleFilterChange("priceRange", [parseInt(e.target.value), filters.priceRange[1]])}
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-xs text-gray-500">Đến</label>
                  <input
                    type="number"
                    min={filters.priceRange[0]}
                    max="10000000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange("priceRange", [filters.priceRange[0], parseInt(e.target.value)])}
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tính năng */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Tính năng</h3>
            <div className="space-y-2">
              {featureOptions.map((feature) => (
                <div key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`feature-${feature}`}
                    checked={filters.features.includes(feature)}
                    onChange={() => handleFilterChange("feature", feature)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`feature-${feature}`} className="ml-2 text-gray-700">
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {/* Filter controls for mobile */}
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md lg:hidden"
              >
                {showFilters ? <FiX className="mr-2" /> : <FiFilter className="mr-2" />}
                {showFilters ? "Đóng bộ lọc" : "Lọc sản phẩm"}
              </button>
              <span className="text-gray-500 text-sm">
                Hiển thị {filteredProducts.length} sản phẩm
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <FiList />
              </button>
            </div>
          </div>

          {/* Products */}
          {filteredProducts.length === 0 ? (
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100 text-yellow-700 mb-6">
              Không tìm thấy sản phẩm phù hợp với bộ lọc. Vui lòng thử lại với các điều kiện khác.
            </div>
          ) : (
            <div className={`grid ${
              viewMode === "list" 
                ? "grid-cols-1" 
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              } gap-6`}
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div className={viewMode === "list" ? "w-1/3 relative" : "relative"}>
                    <Link to={`/product/${product.id}`} className="block">
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full ${viewMode === "grid" ? "h-64" : "h-full"} object-cover`}
                      />
                      {product.discount > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{product.discount}%
                        </div>
                      )}
                      {product.isNew && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Mới
                        </div>
                      )}
                    </Link>
                    <button className="absolute bottom-2 right-2 p-2 rounded-full bg-white text-gray-700 hover:text-red-500 transition shadow-sm">
                      <FiHeart />
                    </button>
                  </div>
                  <div
                    className={`p-4 flex flex-col ${
                      viewMode === "list" ? "w-2/3" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs font-medium text-gray-500">
                          {product.brand}
                        </span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-xs text-gray-500">
                          {product.category}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FiStar className="text-yellow-400 fill-current mr-1 h-3 w-3" />
                        <span className="text-xs text-gray-600">
                          {product.rating} ({product.reviewCount})
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="font-medium text-gray-900 hover:text-blue-600 mb-2 line-clamp-2"
                    >
                      {product.name}
                    </Link>
                    
                    <div className="flex items-center mt-auto">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    
                    {viewMode === "list" && (
                      <div className="mt-4">
                        <p className="text-gray-600 text-sm mb-4">
                          {product.description}
                        </p>
                        <div className="flex space-x-2">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center hover:bg-blue-700 transition text-sm">
                            <FiShoppingCart className="mr-2" /> Thêm vào giỏ
                          </button>
                          <Link 
                            to={`/product/${product.id}`}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition text-sm"
                          >
                            Chi tiết
                          </Link>
                        </div>
                      </div>
                    )}
                    
                    {viewMode === "grid" && (
                      <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center hover:bg-blue-700 transition text-sm">
                        <FiShoppingCart className="mr-2" /> Thêm vào giỏ
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TennisProductPage; 