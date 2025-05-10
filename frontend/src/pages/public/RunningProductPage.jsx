import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiFilter, FiGrid, FiList, FiStar, FiHeart, FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";

const RunningProductPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [filters, setFilters] = useState({
    brands: [],
    gender: [],
    priceRange: [0, 10000000],
    features: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  // Danh sách thương hiệu
  const brands = [
    "Nike", "Adidas", "Asics", "New Balance", "Mizuno", "Hoka", "Brooks"
  ];

  // Danh sách giới tính
  const genders = ["Nam", "Nữ", "Unisex"];

  // Danh sách tính năng
  const featureOptions = [
    "Cushioning", "Lightweight", "Stability", "Trail", "Road"
  ];

  useEffect(() => {
    // Giả lập API call
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: "Nike Air Zoom Pegasus 39",
          price: 3299000,
          originalPrice: 3700000,
          discount: 10,
          brand: "Nike",
          image: "/assets/images/products/running-shoes-1.jpg",
          gender: "Nam",
          rating: 4.8,
          reviewCount: 128,
          features: ["Cushioning", "Road"],
          isNew: true,
          isBestSeller: true,
        },
        {
          id: 2,
          name: "Adidas Adizero Boston 11",
          price: 2890000,
          originalPrice: 3500000,
          discount: 17,
          brand: "Adidas",
          image: "/assets/images/products/running-shoes-2.jpg",
          gender: "Nam",
          rating: 4.6,
          reviewCount: 94,
          features: ["Lightweight", "Road"],
          isNew: false,
          isBestSeller: true,
        },
        {
          id: 3,
          name: "Asics Gel-Nimbus 24",
          price: 3900000,
          originalPrice: 4200000,
          discount: 7,
          brand: "Asics",
          image: "/assets/images/products/running-shoes-3.jpg",
          gender: "Nữ",
          rating: 4.9,
          reviewCount: 156,
          features: ["Cushioning", "Stability"],
          isNew: false,
          isBestSeller: false,
        },
        {
          id: 4,
          name: "New Balance Fresh Foam X 1080v12",
          price: 3850000,
          originalPrice: 4100000,
          discount: 6,
          brand: "New Balance",
          image: "/assets/images/products/running-shoes-4.jpg",
          gender: "Unisex",
          rating: 4.7,
          reviewCount: 87,
          features: ["Cushioning", "Road"],
          isNew: true,
          isBestSeller: false,
        },
        {
          id: 5,
          name: "Hoka Clifton 8",
          price: 3200000,
          originalPrice: 3600000,
          discount: 11,
          brand: "Hoka",
          image: "/assets/images/products/running-shoes-5.jpg",
          gender: "Nữ",
          rating: 4.8,
          reviewCount: 112,
          features: ["Lightweight", "Cushioning"],
          isNew: false,
          isBestSeller: true,
        },
        {
          id: 6,
          name: "Brooks Ghost 14",
          price: 2990000,
          originalPrice: 3400000,
          discount: 12,
          brand: "Brooks",
          image: "/assets/images/products/running-shoes-6.jpg",
          gender: "Nam",
          rating: 4.5,
          reviewCount: 76,
          features: ["Stability", "Road"],
          isNew: false,
          isBestSeller: false,
        },
        {
          id: 7,
          name: "Mizuno Wave Rider 26",
          price: 3100000,
          originalPrice: 3500000,
          discount: 11,
          brand: "Mizuno",
          image: "/assets/images/products/running-shoes-7.jpg",
          gender: "Nam",
          rating: 4.4,
          reviewCount: 64,
          features: ["Stability", "Cushioning"],
          isNew: true,
          isBestSeller: false,
        },
        {
          id: 8,
          name: "Nike Pegasus Trail 4",
          price: 3499000,
          originalPrice: 3800000,
          discount: 8,
          brand: "Nike",
          image: "/assets/images/products/running-shoes-8.jpg",
          gender: "Unisex",
          rating: 4.7,
          reviewCount: 92,
          features: ["Trail", "Cushioning"],
          isNew: true,
          isBestSeller: false,
        },
        {
          id: 9,
          name: "Adidas Ultraboost 22",
          price: 4200000,
          originalPrice: 4800000,
          discount: 12,
          brand: "Adidas",
          image: "/assets/images/products/running-shoes-9.jpg",
          gender: "Nam",
          rating: 4.9,
          reviewCount: 214,
          features: ["Cushioning", "Road"],
          isNew: false,
          isBestSeller: true,
        },
        {
          id: 10,
          name: "Asics GT-2000 10",
          price: 2800000,
          originalPrice: 3200000,
          discount: 12,
          brand: "Asics",
          image: "/assets/images/products/running-shoes-10.jpg",
          gender: "Nữ",
          rating: 4.5,
          reviewCount: 73,
          features: ["Stability", "Road"],
          isNew: false,
          isBestSeller: false,
        },
        {
          id: 11,
          name: "Hoka Speedgoat 5",
          price: 3900000,
          originalPrice: 4200000,
          discount: 7,
          brand: "Hoka",
          image: "/assets/images/products/running-shoes-11.jpg",
          gender: "Unisex",
          rating: 4.8,
          reviewCount: 89,
          features: ["Trail", "Cushioning"],
          isNew: true,
          isBestSeller: false,
        },
        {
          id: 12,
          name: "Brooks Glycerin 20",
          price: 3700000,
          originalPrice: 4100000,
          discount: 10,
          brand: "Brooks",
          image: "/assets/images/products/running-shoes-12.jpg",
          gender: "Nam",
          rating: 4.7,
          reviewCount: 68,
          features: ["Cushioning", "Road"],
          isNew: false,
          isBestSeller: false,
        },
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

    // Lọc theo giới tính
    if (filters.gender.length > 0) {
      result = result.filter(product => filters.gender.includes(product.gender));
    }

    // Lọc theo khoảng giá
    result = result.filter(
      product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Lọc theo tính năng
    if (filters.features.length > 0) {
      result = result.filter(product => 
        product.features.some(feature => filters.features.includes(feature))
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
        case "gender":
          if (newFilters.gender.includes(value)) {
            newFilters.gender = newFilters.gender.filter(g => g !== value);
          } else {
            newFilters.gender = [...newFilters.gender, value];
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
      gender: [],
      priceRange: [0, 10000000],
      features: [],
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
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
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-8 mb-6 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sản Phẩm Chạy Bộ
            </h1>
            <p className="text-blue-100 mb-6 text-lg">
              Khám phá bộ sưu tập giày và phụ kiện chạy bộ chất lượng cao từ các thương hiệu hàng đầu
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
          <span className="font-medium text-gray-900">Sản phẩm chạy bộ</span>
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

          {/* Giới tính */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Giới tính</h3>
            <div className="space-y-2">
              {genders.map((gender) => (
                <div key={gender} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`gender-${gender}`}
                    checked={filters.gender.includes(gender)}
                    onChange={() => handleFilterChange("gender", gender)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`gender-${gender}`} className="ml-2 text-gray-700">
                    {gender}
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
                step="100000"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange("priceRange", [0, parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleFilterChange("priceRange", [0, 2000000])}
                  className={`text-xs px-2 py-1 rounded ${
                    filters.priceRange[1] === 2000000
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Dưới 2tr
                </button>
                <button
                  onClick={() => handleFilterChange("priceRange", [2000000, 4000000])}
                  className={`text-xs px-2 py-1 rounded ${
                    filters.priceRange[0] === 2000000 && filters.priceRange[1] === 4000000
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  2tr - 4tr
                </button>
                <button
                  onClick={() => handleFilterChange("priceRange", [4000000, 6000000])}
                  className={`text-xs px-2 py-1 rounded ${
                    filters.priceRange[0] === 4000000 && filters.priceRange[1] === 6000000
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  4tr - 6tr
                </button>
                <button
                  onClick={() => handleFilterChange("priceRange", [6000000, 10000000])}
                  className={`text-xs px-2 py-1 rounded ${
                    filters.priceRange[0] === 6000000 && filters.priceRange[1] === 10000000
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Trên 6tr
                </button>
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
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden bg-gray-100 px-4 py-2 rounded-md flex items-center text-gray-700 mr-4"
              >
                <FiFilter className="mr-2" /> Bộ lọc
              </button>
            </div>
            <div className="flex items-center space-x-2 ml-auto">
              <div className="flex border rounded overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <FiGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <FiList size={18} />
                </button>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
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
            <div
              id="products"
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
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
                          Giày chạy bộ chất lượng cao với các tính năng: {product.features.join(", ")}
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

export default RunningProductPage; 