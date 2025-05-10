import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiFilter, FiGrid, FiList, FiStar, FiHeart, FiShoppingCart, FiX, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

const BasketballProductPage = () => {
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
  const [sortBy, setSortBy] = useState("recommended");

  // Hàm định dạng giá
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  // Danh sách thương hiệu
  const brands = [
    "Nike", "Jordan", "Adidas", "Under Armour", "Puma", "Spalding", "Wilson"
  ];

  // Danh sách danh mục
  const categories = ["Giày", "Bóng", "Quần áo", "Phụ kiện"];

  // Danh sách tính năng
  const featureOptions = [
    "Đệm êm", "Bám đất", "Nhẹ", "Cao cổ", "Thấp cổ", "Outdoor", "Indoor"
  ];

  // Hàm reset bộ lọc
  const resetFilters = () => {
    setFilters({
      brands: [],
      category: [],
      priceRange: [0, 10000000],
      features: [],
    });
    setPriceRange([0, 10000000]);
  };

  // Toggle một lựa chọn trong bộ lọc
  const toggleFilter = (type, value) => {
    setFilters(prev => {
      const current = [...prev[type]];
      const index = current.indexOf(value);
      
      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prev,
        [type]: current
      };
    });
  };

  // Cập nhật khoảng giá
  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
    setFilters(prev => ({
      ...prev,
      priceRange: newRange
    }));
  };

  // Lấy dữ liệu sản phẩm
  useEffect(() => {
    // Giả lập API call
    setTimeout(() => {
      const mockProducts = [
        {
          id: 301,
          name: "Giày bóng rổ Nike LeBron 19",
          price: 4500000,
          originalPrice: 5200000,
          discount: 13,
          brand: "Nike",
          image: "/assets/images/products/basketball-shoes-1.jpg",
          category: "Giày",
          rating: 4.8,
          reviewCount: 157,
          features: ["Đệm êm", "Bám đất", "Cao cổ"],
          isNew: true,
          isBestSeller: true,
          description: "Giày bóng rổ signature của LeBron James, thiết kế với công nghệ Air Max và Zoom Air giúp tăng độ đàn hồi và ổn định."
        },
        {
          id: 302,
          name: "Giày bóng rổ Jordan XXXVI",
          price: 4200000,
          originalPrice: 4700000,
          discount: 11,
          brand: "Jordan",
          image: "/assets/images/products/basketball-shoes-2.jpg",
          category: "Giày",
          rating: 4.9,
          reviewCount: 189,
          features: ["Nhẹ", "Bám đất", "Thấp cổ"],
          isNew: true,
          isBestSeller: true,
          description: "Giày bóng rổ Jordan XXXVI với công nghệ Eclipse Plate 3.0 và hệ thống đệm Zoom Air, mang lại khả năng phản hồi tuyệt vời."
        },
        {
          id: 303,
          name: "Giày bóng rổ Adidas Harden Vol. 6",
          price: 3800000,
          originalPrice: 4200000,
          discount: 10,
          brand: "Adidas",
          image: "/assets/images/products/basketball-shoes-3.jpg",
          category: "Giày",
          rating: 4.7,
          reviewCount: 135,
          features: ["Đệm êm", "Thấp cổ", "Indoor"],
          isNew: false,
          isBestSeller: true,
          description: "Giày bóng rổ signature của James Harden, được thiết kế để tăng cường khả năng kiểm soát và tốc độ trên sân."
        },
        {
          id: 304,
          name: "Giày bóng rổ Under Armour Curry 9",
          price: 3900000,
          originalPrice: 4500000,
          discount: 13,
          brand: "Under Armour",
          image: "/assets/images/products/basketball-shoes-4.jpg",
          category: "Giày",
          rating: 4.8,
          reviewCount: 142,
          features: ["Nhẹ", "Thấp cổ", "Bám đất"],
          isNew: false,
          isBestSeller: false,
          description: "Giày bóng rổ signature của Stephen Curry, siêu nhẹ và linh hoạt, thiết kế đặc biệt cho những cú di chuyển nhanh và xử lý bóng tốt."
        },
        {
          id: 305,
          name: "Bóng rổ Spalding NBA Official Game Ball",
          price: 2500000,
          originalPrice: 2700000,
          discount: 7,
          brand: "Spalding",
          image: "/assets/images/products/basketball-ball-1.jpg",
          category: "Bóng",
          rating: 4.9,
          reviewCount: 201,
          features: ["Indoor"],
          isNew: false,
          isBestSeller: true,
          description: "Bóng rổ chính thức của giải NBA, được làm từ da tổng hợp cao cấp, mang lại cảm giác bám tay và khả năng kiểm soát tuyệt vời."
        },
        {
          id: 306,
          name: "Bóng rổ Wilson NCAA Official Game Ball",
          price: 1800000,
          originalPrice: 2100000,
          discount: 14,
          brand: "Wilson",
          image: "/assets/images/products/basketball-ball-2.jpg",
          category: "Bóng",
          rating: 4.7,
          reviewCount: 118,
          features: ["Indoor", "Outdoor"],
          isNew: false,
          isBestSeller: false,
          description: "Bóng rổ chính thức của giải NCAA, thiết kế bền bỉ, phù hợp cho cả sân trong nhà và ngoài trời."
        },
        {
          id: 307,
          name: "Áo đấu bóng rổ Nike NBA Swingman Jersey - Lakers",
          price: 1900000,
          originalPrice: 2200000,
          discount: 14,
          brand: "Nike",
          image: "/assets/images/products/basketball-jersey-1.jpg",
          category: "Quần áo",
          rating: 4.8,
          reviewCount: 95,
          features: ["Nhẹ"],
          isNew: true,
          isBestSeller: true,
          description: "Áo đấu NBA Swingman của đội Los Angeles Lakers, thiết kế chính xác với chất liệu nhẹ và thoáng khí, co giãn 4 chiều."
        },
        {
          id: 308,
          name: "Áo đấu bóng rổ Nike NBA Swingman Jersey - Bulls",
          price: 1900000,
          originalPrice: 2200000,
          discount: 14,
          brand: "Nike",
          image: "/assets/images/products/basketball-jersey-2.jpg",
          category: "Quần áo",
          rating: 4.8,
          reviewCount: 88,
          features: ["Nhẹ"],
          isNew: false,
          isBestSeller: false,
          description: "Áo đấu NBA Swingman của đội Chicago Bulls, thiết kế chính xác với chất liệu nhẹ và thoáng khí, co giãn 4 chiều."
        },
        {
          id: 309,
          name: "Bảo vệ đầu gối Nike Pro Combat Elite",
          price: 750000,
          originalPrice: 900000,
          discount: 17,
          brand: "Nike",
          image: "/assets/images/products/basketball-knee-pad.jpg",
          category: "Phụ kiện",
          rating: 4.6,
          reviewCount: 76,
          features: ["Nhẹ", "Bám đất"],
          isNew: false,
          isBestSeller: false,
          description: "Bảo vệ đầu gối cao cấp với công nghệ Pro Combat giúp giảm thiểu chấn thương khi va chạm, đồng thời tăng cường sự thoải mái."
        },
        {
          id: 310,
          name: "Băng cổ tay Under Armour Performance Wristband",
          price: 250000,
          originalPrice: 300000,
          discount: 17,
          brand: "Under Armour",
          image: "/assets/images/products/basketball-wristband.jpg",
          category: "Phụ kiện",
          rating: 4.5,
          reviewCount: 63,
          features: ["Nhẹ"],
          isNew: false,
          isBestSeller: false,
          description: "Băng cổ tay chất lượng cao, thấm hút mồ hôi tốt, giữ cho tay luôn khô ráo trong suốt quá trình thi đấu."
        },
        {
          id: 311,
          name: "Quần đấu bóng rổ Nike Elite",
          price: 890000,
          originalPrice: 1050000,
          discount: 15,
          brand: "Nike",
          image: "/assets/images/products/basketball-shorts.jpg",
          category: "Quần áo",
          rating: 4.7,
          reviewCount: 82,
          features: ["Nhẹ"],
          isNew: true,
          isBestSeller: false,
          description: "Quần đấu bóng rổ thiết kế rộng rãi, thoáng khí với công nghệ Dri-FIT giúp thấm hút mồ hôi nhanh chóng."
        },
        {
          id: 312,
          name: "Túi đựng bóng rổ Spalding Ball Bag",
          price: 450000,
          originalPrice: 520000,
          discount: 13,
          brand: "Spalding",
          image: "/assets/images/products/basketball-bag.jpg",
          category: "Phụ kiện",
          rating: 4.4,
          reviewCount: 58,
          features: ["Outdoor"],
          isNew: false,
          isBestSeller: false,
          description: "Túi đựng bóng rổ chất lượng cao, có thể chứa được 1-2 quả bóng, thiết kế bền bỉ với dây đeo tiện lợi."
        }
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Apply filters
  useEffect(() => {
    if (products.length > 0) {
      let result = [...products];
      
      // Lọc theo thương hiệu
      if (filters.brands.length) {
        result = result.filter(item => filters.brands.includes(item.brand));
      }
      
      // Lọc theo danh mục
      if (filters.category.length) {
        result = result.filter(item => filters.category.includes(item.category));
      }
      
      // Lọc theo tính năng
      if (filters.features.length) {
        result = result.filter(item => 
          item.features && item.features.some(feature => filters.features.includes(feature))
        );
      }
      
      // Lọc theo giá
      result = result.filter(item => 
        item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]
      );
      
      // Sắp xếp
      if (sortBy === "price-asc") {
        result.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-desc") {
        result.sort((a, b) => b.price - a.price);
      } else if (sortBy === "newest") {
        result.sort((a, b) => b.isNew - a.isNew);
      } else if (sortBy === "bestseller") {
        result.sort((a, b) => b.isBestSeller - a.isBestSeller);
      }
      
      setFilteredProducts(result);
    }
  }, [filters, products, sortBy]);

  return (
    <div className="bg-gray-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Sản phẩm bóng rổ</h1>
          <p className="text-lg opacity-90">
            Khám phá bộ sưu tập sản phẩm bóng rổ chất lượng cao
          </p>
          <div className="flex mt-4">
            <Link to="/" className="text-white hover:underline">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white opacity-90">Bóng rổ</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className={`md:w-1/4 lg:w-1/5 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold">Bộ lọc sản phẩm</h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Đặt lại
                </button>
              </div>

              {/* Filter by brand */}
              <div className="mb-4 pb-4 border-b">
                <h3 className="font-medium mb-2">Thương hiệu</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                        checked={filters.brands.includes(brand)}
                        onChange={() => toggleFilter("brands", brand)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter by category */}
              <div className="mb-4 pb-4 border-b">
                <h3 className="font-medium mb-2">Danh mục</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                        checked={filters.category.includes(category)}
                        onChange={() => toggleFilter("category", category)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter by price range */}
              <div className="mb-4 pb-4 border-b">
                <h3 className="font-medium mb-2">Khoảng giá</h3>
                <div className="space-y-4">
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="10000000"
                      step="100000"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        {formatPrice(priceRange[0])}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatPrice(priceRange[1])}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter by features */}
              <div>
                <h3 className="font-medium mb-2">Tính năng</h3>
                <div className="space-y-2">
                  {featureOptions.map((feature) => (
                    <label key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                        checked={filters.features.includes(feature)}
                        onChange={() => toggleFilter("features", feature)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="md:w-3/4 lg:w-4/5">
            {/* Controls */}
            <div className="flex flex-wrap justify-between items-center mb-6">
              <div className="w-full sm:w-auto flex items-center mb-4 sm:mb-0">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center text-gray-700 mr-4"
                >
                  <FiFilter className="mr-2" /> Bộ lọc
                  {showFilters ? <FiX className="ml-1" /> : null}
                </button>
                
                <div className="flex items-center border rounded overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${
                      viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                    }`}
                  >
                    <FiGrid />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${
                      viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                    }`}
                  >
                    <FiList />
                  </button>
                </div>
              </div>
              
              <div className="w-full sm:w-auto flex">
                <div className="relative">
                  <select
                    className="appearance-none bg-white border border-gray-300 py-2 pl-3 pr-10 rounded leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recommended">Đề xuất</option>
                    <option value="price-asc">Giá: Thấp đến cao</option>
                    <option value="price-desc">Giá: Cao đến thấp</option>
                    <option value="newest">Mới nhất</option>
                    <option value="bestseller">Bán chạy</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FiChevronDown />
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Không tìm thấy sản phẩm</h3>
                <p className="mt-1 text-gray-500">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác.</p>
                <div className="mt-6">
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              </div>
            ) : (
              <div className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    <div className={viewMode === "list" ? "w-1/3 relative" : "relative"}>
                      <Link to={`/product/${product.id}`} className="block">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
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
                        <span className="text-xs font-medium text-gray-500">
                          {product.brand}
                        </span>
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
    </div>
  );
};

export default BasketballProductPage; 