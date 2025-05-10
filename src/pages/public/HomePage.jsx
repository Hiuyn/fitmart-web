import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { FiChevronRight, FiChevronLeft, FiArrowRight } from 'react-icons/fi';
import ProductCard from '../../components/ProductCard';

const HomePage = () => {
  // State cho carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = {
    categories: useRef(null),
    featured: useRef(null),
    trending: useRef(null),
    blog: useRef(null)
  };
  
  // Dữ liệu carousel
  const carouselItems = [
    {
      id: 1,
      image: 'https://source.unsplash.com/random/1600x900/?sports,running',
      title: 'Bộ sưu tập mới',
      subtitle: 'Trang phục thể thao cao cấp',
      buttonText: 'Mua ngay',
      buttonLink: '/new-collection'
    },
    {
      id: 2,
      image: 'https://source.unsplash.com/random/1600x900/?sports,soccer',
      title: 'Giảm đến 50%',
      subtitle: 'Cho tất cả sản phẩm bóng đá',
      buttonText: 'Xem ngay',
      buttonLink: '/sale'
    },
    {
      id: 3,
      image: 'https://source.unsplash.com/random/1600x900/?sports,basketball',
      title: 'Phụ kiện chuyên nghiệp',
      subtitle: 'Nâng cao trải nghiệm tập luyện',
      buttonText: 'Khám phá',
      buttonLink: '/accessories'
    }
  ];

  // Tự động chuyển slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  // Chuyển slide tiếp theo
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };
  
  // Chuyển slide trước đó
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };
  
  // Dữ liệu danh mục
  const categories = [
    { name: 'Bóng đá', image: 'https://source.unsplash.com/random/300x300/?soccer', path: '/football' },
    { name: 'Running', image: 'https://source.unsplash.com/random/300x300/?running', path: '/running' },
    { name: 'Quần vợt', image: 'https://source.unsplash.com/random/300x300/?tennis', path: '/tennis' },
    { name: 'Bóng chuyền', image: 'https://source.unsplash.com/random/300x300/?volleyball', path: '/volleyball' },
    { name: 'Bóng rổ', image: 'https://source.unsplash.com/random/300x300/?basketball', path: '/basketball' }
  ];
  
  // Dữ liệu sản phẩm nổi bật
  const featuredProducts = Array(8).fill(0).map((_, index) => ({
    id: index + 1,
    name: `Sản phẩm nổi bật ${index + 1}`,
    price: Math.floor(Math.random() * 500000) + 100000,
    originalPrice: Math.floor(Math.random() * 700000) + 200000,
    discount: Math.floor(Math.random() * 30) + 10,
    image: `https://source.unsplash.com/random/300x400/?sportswear,${index + 1}`,
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 100) + 5,
    isNew: index % 3 === 0,
    isBestSeller: index % 5 === 0
  }));
  
  // Dữ liệu sản phẩm xu hướng
  const trendingProducts = Array(4).fill(0).map((_, index) => ({
    id: index + 20,
    name: `Xu hướng ${index + 1}`,
    price: Math.floor(Math.random() * 800000) + 150000,
    originalPrice: Math.floor(Math.random() * 1000000) + 300000,
    discount: Math.floor(Math.random() * 25) + 15,
    image: `https://source.unsplash.com/random/300x400/?trending,sportswear,${index + 1}`,
    rating: (Math.random() * 1 + 4).toFixed(1),
    reviews: Math.floor(Math.random() * 200) + 50,
    isNew: true,
    isBestSeller: true
  }));
  
  // Dữ liệu blog
  const blogPosts = Array(3).fill(0).map((_, index) => ({
    id: index + 1,
    title: [
      'Cách chọn giày phù hợp cho từng môn thể thao',
      'Tập luyện hiệu quả với các phụ kiện thể thao mới',
      'Cải thiện sức bền với kỹ thuật chạy đúng cách'
    ][index],
    slug: ['choosing-right-shoes', 'effective-training', 'improve-endurance'][index],
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl quis aliquam ultricies...',
    image: `https://source.unsplash.com/random/600x400/?sports,blog,${index + 1}`,
    date: ['15/05/2023', '02/06/2023', '18/06/2023'][index],
  }));
  
  // Detect when sections are visible for animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.dataset.section]: true
          }));
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.dataset.section = key;
        observer.observe(ref.current);
      }
    });
    
    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);
  
  // Simulate loading
  useEffect(() => {
    // Simulate api loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pb-12">
      {/* Hero carousel with optimized height */}
      <div className="relative hero-section overflow-hidden h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselItems.map((item) => (
            <div key={item.id} className="w-full h-full flex-shrink-0">
              <div 
                className="w-full h-full flex flex-col justify-center items-center text-center text-white p-6"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundAttachment: 'fixed'
                }}
              >
                <div className="max-w-3xl mx-auto px-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">{item.title}</h1>
                  <p className="text-lg md:text-xl mb-8 max-w-md mx-auto drop-shadow-md">{item.subtitle}</p>
                  <Link 
                    to={item.buttonLink}
                    className="btn-primary hover:bg-blue-700 inline-block text-lg px-8 py-3 rounded-md transition-all transform hover:scale-105"
                  >
                    {item.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Carousel controls with better visual feedback */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full focus:outline-none focus-ring transform transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <FiChevronLeft size={28} />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full focus:outline-none focus-ring transform transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <FiChevronRight size={28} />
        </button>
        
        {/* Improved indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-white w-6' : 'bg-white bg-opacity-50 hover:bg-opacity-70'
              } focus:outline-none`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Category section with animation */}
      <section 
        ref={sectionRefs.categories}
        className={`section py-14 bg-white ${visibleSections.categories ? 'scroll-fade-in visible' : 'scroll-fade-in'}`}
      >
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 relative inline-block mx-auto">
            <span className="relative z-10">Danh mục thể thao</span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow-300 opacity-40 -z-10"></span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <Link 
                to={category.path} 
                key={index}
                className="card group hover:shadow-md transition-all duration-300 overflow-hidden"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="ratio-container overflow-hidden rounded-t-lg">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 ${isLoading ? 'blur-placeholder' : 'blur-placeholder loaded'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                </div>
                <div className="p-3 text-center relative">
                  <h3 className="font-medium">{category.name}</h3>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured products section */}
      <section 
        ref={sectionRefs.featured}
        className={`section py-14 bg-gray-50 ${visibleSections.featured ? 'scroll-fade-in visible' : 'scroll-fade-in'}`}
      >
        <div className="container">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold relative inline-block">
              <span className="relative z-10">Sản phẩm nổi bật</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-300 opacity-40 -z-10"></span>
            </h2>
            <Link to="/products" className="text-blue-600 hover:text-blue-700 flex items-center text-sm sm:text-base font-medium group">
              Xem tất cả 
              <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {isLoading ? (
              // Skeleton loading
              Array(8).fill(0).map((_, index) => (
                <div key={index} className="card skeleton h-[300px] rounded-lg"></div>
              ))
            ) : (
              // Actual products with staggered animation
              featuredProducts.slice(0, 8).map((product, index) => (
                <div 
                  key={product.id} 
                  className="opacity-0 animate-fade-in"
                  style={{animationDelay: `${index * 100}ms`, animationFillMode: 'forwards'}}
                >
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Trending products with large display */}
      <section 
        ref={sectionRefs.trending}
        className={`section py-14 bg-white ${visibleSections.trending ? 'scroll-fade-in visible' : 'scroll-fade-in'}`}
      >
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 relative inline-block mx-auto">
            <span className="relative z-10">Xu hướng mới nhất</span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-red-300 opacity-40 -z-10"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trendingProducts.slice(0, 2).map((product, index) => (
              <Link 
                key={product.id}
                to={`/product/${product.id}`}
                className="group overflow-hidden card hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row"
              >
                <div className="md:w-1/2 relative overflow-hidden">
                  <div className="ratio-container-4x3 md:h-full">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
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
                </div>
                <div className="md:w-1/2 p-4 md:p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="text-gray-600 text-sm ml-1">({product.rating}) - {product.reviews} đánh giá</span>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">
                      Sản phẩm thể thao cao cấp, thiết kế hiện đại, chất lượng vượt trội
                    </p>
                  </div>
                  <div>
                    <div className="flex items-baseline mb-2">
                      <span className="text-xl font-bold text-red-500">{(product.price).toLocaleString()} ₫</span>
                      {product.discount > 0 && (
                        <span className="text-gray-500 line-through text-sm ml-2">
                          {(product.originalPrice).toLocaleString()} ₫
                        </span>
                      )}
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition transform group-hover:scale-95">
                      Mua ngay
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter with parallax effect */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://source.unsplash.com/random/1600x900/?sports,pattern)',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover'
          }}
        ></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-6">Đăng ký nhận thông tin</h2>
          <p className="mb-8 max-w-md mx-auto">Nhận thông báo về khuyến mãi và sản phẩm mới từ chúng tôi</p>
          <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Email của bạn" 
              className="bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-md flex-grow placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium px-8 py-3 rounded-md transition transform hover:scale-105 shadow-lg hover:shadow-xl">
              Đăng ký
            </button>
          </div>
        </div>
      </section>
      
      {/* Blog section */}
      <section 
        ref={sectionRefs.blog}
        className={`section py-14 bg-white ${visibleSections.blog ? 'scroll-fade-in visible' : 'scroll-fade-in'}`}
      >
        <div className="container">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold relative inline-block">
              <span className="relative z-10">Tin tức thể thao</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-green-300 opacity-40 -z-10"></span>
            </h2>
            <Link to="/blog" className="text-blue-600 hover:text-blue-700 flex items-center text-sm sm:text-base font-medium group">
              Xem tất cả 
              <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`} 
                className="card overflow-hidden hover:shadow-lg group"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="ratio-container-16x9 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="text-white text-sm bg-blue-600 px-2 py-1 rounded">{post.date}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                  <div className="flex items-center text-blue-600 font-medium text-sm">
                    Đọc tiếp
                    <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Brand display */}
      <section className="py-10 bg-gray-50">
        <div className="container">
          <p className="text-center text-gray-500 mb-6">Đối tác của chúng tôi</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['Nike', 'Adidas', 'Puma', 'Under Armour', 'New Balance'].map((brand, index) => (
              <div key={index} className="opacity-60 hover:opacity-100 transition-opacity">
                <span className="font-bold text-xl">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
