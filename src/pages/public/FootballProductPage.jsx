import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiFilter, FiGrid, FiList, FiStar, FiHeart } from "react-icons/fi";

const FootballProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("grid");
  const [filters, setFilters] = useState({
    price: "",
    brand: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popular");

  // Mock data - thay thế bằng API call trong thực tế
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: "Giày Bóng Đá Nike Mercurial Vapor 15",
          price: 3200000,
          originalPrice: 3800000,
          discount: 15,
          image: "/assets/images/products/football-shoes-1.jpg",
          brand: "Nike",
          rating: 4.8,
          reviews: 124,
          isNew: true,
        },
        {
          id: 2,
          name: "Áo Bóng Đá Adidas Manchester United",
          price: 1800000,
          originalPrice: 2200000,
          discount: 18,
          image: "/assets/images/products/football-jersey-1.jpg",
          brand: "Adidas",
          rating: 4.6,
          reviews: 89,
        },
        {
          id: 3,
          name: "Bóng Đá Nike Flight Premium",
          price: 2500000,
          originalPrice: 3000000,
          discount: 16,
          image: "/assets/images/products/football-ball-1.jpg",
          brand: "Nike",
          rating: 4.9,
          reviews: 56,
          isNew: true,
        },
        {
          id: 4,
          name: "Găng Tay Thủ Môn Puma Future Ultimate",
          price: 1200000,
          originalPrice: 1500000,
          discount: 20,
          image: "/assets/images/products/football-gloves-1.jpg",
          brand: "Puma",
          rating: 4.7,
          reviews: 42,
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const toggleFilter = () => {
    setShowFilters(!showFilters);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="/assets/images/football-banner.jpg"
          alt="Sản phẩm bóng đá"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Sản Phẩm Bóng Đá</h1>
            <p className="text-white text-lg">Thiết bị & trang phục chuyên nghiệp</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6 text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            Trang chủ
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900 font-medium">Sản phẩm bóng đá</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter sidebar - simplified */}
          <div
            className={`md:w-64 bg-white ${
              showFilters ? "block" : "hidden md:block"
            }`}
          >
            <div className="sticky top-24">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-medium mb-3">Giá</h3>
                <div className="space-y-2">
                  {["Dưới 1 triệu", "1 - 2 triệu", "2 - 3 triệu", "Trên 3 triệu"].map(
                    (range) => (
                      <label key={range} className="flex items-center">
                        <input
                          type="radio"
                          name="price"
                          className="h-4 w-4 text-blue-600"
                          checked={filters.price === range}
                          onChange={() => 
                            setFilters({...filters, price: range})
                          }
                        />
                        <span className="ml-2 text-sm text-gray-700">{range}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-medium mb-3">Thương hiệu</h3>
                <div className="space-y-2">
                  {["Nike", "Adidas", "Puma", "Mizuno"].map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600"
                        checked={filters.brand.includes(brand)}
                        onChange={() => {
                          const updatedBrands = filters.brand.includes(brand)
                            ? filters.brand.filter(b => b !== brand)
                            : [...filters.brand, brand];
                          setFilters({...filters, brand: updatedBrands});
                        }}
                      />
                      <span className="ml-2 text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product listing */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <button
                className="inline-flex items-center mb-4 md:mb-0 md:hidden px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                onClick={toggleFilter}
              >
                <FiFilter className="mr-2" />
                {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
              </button>

              <div className="flex w-full md:w-auto justify-between items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    className={`p-2 rounded-md ${
                      view === "grid"
                        ? "bg-gray-200 text-gray-800"
                        : "text-gray-400 hover:text-gray-800"
                    }`}
                    onClick={() => setView("grid")}
                  >
                    <FiGrid />
                  </button>
                  <button
                    className={`p-2 rounded-md ${
                      view === "list"
                        ? "bg-gray-200 text-gray-800"
                        : "text-gray-400 hover:text-gray-800"
                    }`}
                    onClick={() => setView("list")}
                  >
                    <FiList />
                  </button>
                </div>

                <div className="flex items-center">
                  <label htmlFor="sort" className="text-sm text-gray-600 mr-2">
                    Sắp xếp:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="popular">Phổ biến</option>
                    <option value="newest">Mới nhất</option>
                    <option value="priceAsc">Giá tăng dần</option>
                    <option value="priceDesc">Giá giảm dần</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-500">
                Hiển thị {products.length} sản phẩm
              </p>
            </div>

            {/* Product grid - simplified */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link to={`/product/${product.id}`} className="block relative">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        -{product.discount}%
                      </div>
                    )}
                    {product.isNew && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                        Mới
                      </div>
                    )}
                    <button className="absolute right-2 bottom-2 p-2 rounded-full bg-white text-gray-700 hover:text-red-500 transition-colors">
                      <FiHeart />
                    </button>
                  </Link>
                  <div className="p-4">
                    <div className="flex items-center mb-1">
                      <span className="text-sm font-medium text-gray-500">
                        {product.brand}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <FiStar className="text-yellow-400 h-4 w-4 mr-1" />
                        <span className="text-sm text-gray-700">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-base font-medium text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center">
                <button className="px-3 py-1 border rounded-l-md border-gray-300 text-gray-700 hover:bg-gray-50">
                  Trước
                </button>
                <button className="px-3 py-1 border-t border-b border-gray-300 bg-blue-600 text-white">
                  1
                </button>
                <button className="px-3 py-1 border rounded-r-md border-gray-300 text-gray-700 hover:bg-gray-50">
                  Sau
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootballProductPage; 