import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiFilter, FiGrid, FiList, FiStar, FiHeart, FiShoppingCart, FiX, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

const VolleyballProductPage = () => {
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
    "Mizuno", "Asics", "Mikasa", "Molten", "Nike", "Adidas"
  ];

  // Danh sách danh mục
  const categories = ["Giày", "Bóng", "Quần áo", "Đồ bảo hộ", "Phụ kiện"];

  // Danh sách tính năng
  const featureOptions = [
    "Nhẹ", "Bám đất", "Đệm êm", "Cho người mới", "Cho người chuyên nghiệp"
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
          id: 201,
          name: "Giày bóng chuyền Mizuno Wave Momentum 2",
          price: 3200000,
          originalPrice: 3800000,
          discount: 16,
          brand: "Mizuno",
          image: "/assets/images/products/volleyball-shoes-1.jpg",
          category: "Giày",
          rating: 4.8,
          reviewCount: 134,
          features: ["Nhẹ", "Bám đất", "Cho người chuyên nghiệp"],
          isNew: true,
          isBestSeller: true,
          description: "Giày bóng chuyền cao cấp với công nghệ Wave đem lại cảm giác êm ái và khả năng hấp thụ lực tác động tốt."
        },
        {
          id: 202,
          name: "Giày bóng chuyền Asics Gel-Rocket 10",
          price: 2600000,
          originalPrice: 2900000,
          discount: 10,
          brand: "Asics",
          image: "/assets/images/products/volleyball-shoes-2.jpg",
          category: "Giày",
          rating: 4.7,
          reviewCount: 114,
          features: ["Bám đất", "Đệm êm", "Cho người mới"],
          isNew: false,
          isBestSeller: true,
          description: "Giày bóng chuyền với công nghệ Gel hấp thụ lực tốt, phù hợp cho cả người mới chơi và các VĐV chuyên nghiệp."
        },
        {
          id: 203,
          name: "Bóng chuyền Mikasa V200W - Tiêu chuẩn thi đấu quốc tế",
          price: 1800000,
          originalPrice: 2100000,
          discount: 14,
          brand: "Mikasa",
          image: "/assets/images/products/volleyball-ball-1.jpg",
          category: "Bóng",
          rating: 4.9,
          reviewCount: 178,
          features: ["Cho người chuyên nghiệp"],
          isNew: false,
          isBestSeller: true,
          description: "Bóng chuyền tiêu chuẩn thi đấu quốc tế FIVB, được sử dụng trong các giải đấu lớn trên toàn thế giới."
        },
        {
          id: 204,
          name: "Bóng chuyền Molten V5M5000",
          price: 1200000,
          originalPrice: 1400000,
          discount: 14,
          brand: "Molten",
          image: "/assets/images/products/volleyball-ball-2.jpg",
          category: "Bóng",
          rating: 4.6,
          reviewCount: 95,
          features: ["Cho người mới", "Cho người chuyên nghiệp"],
          isNew: false,
          isBestSeller: false,
          description: "Bóng chuyền chất lượng cao, phù hợp cho cả tập luyện và thi đấu, bề mặt bóng mềm mại, dễ kiểm soát."
        },
        {
          id: 205,
          name: "Bộ quần áo bóng chuyền nam Mizuno",
          price: 850000,
          originalPrice: 950000,
          discount: 11,
          brand: "Mizuno",
          image: "/assets/images/products/volleyball-uniform-1.jpg",
          category: "Quần áo",
          rating: 4.7,
          reviewCount: 89,
          features: ["Nhẹ"],
          isNew: true,
          isBestSeller: false,
          description: "Bộ quần áo bóng chuyền nam chất liệu thoáng khí, thấm hút mồ hôi tốt, co giãn 4 chiều, tạo sự thoải mái khi di chuyển."
        },
        {
          id: 206,
          name: "Bộ quần áo bóng chuyền nữ Asics",
          price: 890000,
          originalPrice: 980000,
          discount: 9,
          brand: "Asics",
          image: "/assets/images/products/volleyball-uniform-2.jpg",
          category: "Quần áo",
          rating: 4.8,
          reviewCount: 103,
          features: ["Nhẹ"],
          isNew: false,
          isBestSeller: true,
          description: "Bộ quần áo bóng chuyền nữ với thiết kế thời trang, chất liệu nhẹ và thoáng khí, co giãn tốt và bền màu."
        },
        {
          id: 207,
          name: "Bảo vệ đầu gối Mizuno VS1",
          price: 450000,
          originalPrice: 520000,
          discount: 13,
          brand: "Mizuno",
          image: "/assets/images/products/volleyball-kneepad-1.jpg",
          category: "Đồ bảo hộ",
          rating: 4.9,
          reviewCount: 215,
          features: ["Đệm êm", "Cho người chuyên nghiệp"],
          isNew: false,
          isBestSeller: true,
          description: "Bảo vệ đầu gối hàng đầu của Mizuno, đệm dày, hỗ trợ tối đa cho các pha đổ người cứu bóng."
        },
        {
          id: 208,
          name: "Bảo vệ đầu gối Asics Gel-Kneepad",
          price: 380000,
          originalPrice: 450000,
          discount: 16,
          brand: "Asics",
          image: "/assets/images/products/volleyball-kneepad-2.jpg",
          category: "Đồ bảo hộ",
          rating: 4.7,
          reviewCount: 167,
          features: ["Đệm êm", "Cho người mới"],
          isNew: true,
          isBestSeller: false,
          description: "Bảo vệ đầu gối với công nghệ Gel độc quyền, mềm mại và bảo vệ tối ưu, phù hợp cho mọi đối tượng."
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
      if (filters.brands.length > 0) {
        result = result.filter(item => filters.brands.includes(item.brand));
      }
      
      // Lọc theo danh mục
      if (filters.category.length > 0) {
        result = result.filter(item => filters.category.includes(item.category));
      }
      
      // Lọc theo tính năng
      if (filters.features.length > 0) {
        result = result.filter(item => 
          item.features && item.features.some(feature => 
            filters.features.includes(feature)
          )
        );
      }
      
      // Lọc theo khoảng giá
      result = result.filter(item => 
        item.price >= filters.priceRange[0] && 
        item.price <= filters.priceRange[1]
      );
      
      setFilteredProducts(result);
    }
  }, [filters, products]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">Bóng Chuyền</h1>
          <p className="mt-2 text-lg text-blue-100">
            Trang bị chuyên nghiệp cho những pha bóng hoàn hảo
          </p>
          <div className="mt-4 text-sm text-blue-200">
            <span>Trang chủ</span> <span className="mx-2">›</span>
            <span className="font-medium text-white">Bóng Chuyền</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex">
          {/* Filter sidebar */}
          <div className={`md:w-1/4 pr-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="sticky top-4 space-y-6">
              <div className="flex justify-between items-center md:hidden mb-4">
                <h2 className="text-lg font-medium">Bộ lọc</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Thương hiệu</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        id={`brand-${brand}`}
                        name={`brand-${brand}`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={filters.brands.includes(brand)}
                        onChange={() => toggleFilter('brands', brand)}
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Danh mục</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        name={`category-${category}`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={filters.category.includes(category)}
                        onChange={() => toggleFilter('category', category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Khoảng giá</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{formatPrice(priceRange[0])}</span>
                    <span className="text-sm text-gray-600">{formatPrice(priceRange[1])}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Tính năng</h3>
                <div className="space-y-2">
                  {featureOptions.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <input
                        id={`feature-${feature}`}
                        name={`feature-${feature}`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={filters.features.includes(feature)}
                        onChange={() => toggleFilter('features', feature)}
                      />
                      <label
                        htmlFor={`feature-${feature}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={resetFilters}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset bộ lọc
              </button>
            </div>
          </div>

          {/* Product grid */}
          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center text-sm font-medium text-gray-700"
              >
                <FiFilter className="mr-2 h-5 w-5" />
                Bộ lọc
              </button>

              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-3">
                  {filteredProducts.length} sản phẩm
                </span>
                <div className="flex space-x-1">
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

export default VolleyballProductPage; 