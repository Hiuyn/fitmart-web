import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';
import { useCart } from "../contexts/CartContext";
import { FiFilter } from 'react-icons/fi';

const ProductList = ({ title, searchTerm, setSearchTerm, filters, setFilters, sort, setSort, initialProducts = [] }) => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialProducts.length === 0) {
      fetchProducts();
    }
  }, [searchTerm, filters, sort]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        search: searchTerm,
        category: filters.category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        brand: filters.brand,
        sortBy: sort.field,
        sortOrder: sort.order
      }).toString();

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products?${query}`);
      setProducts(response.data);
    } catch (error) {
      toast.error('Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSortChange = (field) => {
    const order = sort.field === field && sort.order === 'asc' ? 'desc' : 'asc';
    setSort({ field, order });
  };

  if (loading) return <div>Loading...</div>;

  const handleAddToCart = (product) => {
    addToCart(product);
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  };

  const demoProducts = [
    {
      _id: '1',
      title: 'Tạ Tay Hex 5kg',
      description: 'Tạ tay lục giác cao cấp, 5kg mỗi bên',
      thumbnail: 'https://example.com/images/dumbbell-1.jpg',
      status: 'active',
      type: 'equipment',
      category_id: 'dumbell',
      collection_id: 'fitness',
      metadata: {
        weight: '5kg',
        material: 'cast iron',
        handle: 'knurled grip'
      },
      variants: [
        {
          id: 'v1',
          sku: 'HEX5KG-BLK',
          barcode: '123456789',
          weight: 5,
          price: 450000,
          inventory_quantity: 50
        }
      ]
    },
    // Thêm sản phẩm khác...
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>

      {/* Filter Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FiFilter className="mr-2" /> Bộ lọc
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Giá tối thiểu"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Giá tối đa"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Thương hiệu (VD: Nike, Adidas)"
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Sort Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          {sort.order === 'asc' ? <FaSortAmountUp className="mr-2" /> : <FaSortAmountDown className="mr-2" />}
          Sắp xếp
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => handleSortChange('name')}
            className={`px-4 py-2 rounded ${sort.field === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Tên {sort.field === 'name' && (sort.order === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSortChange('price')}
            className={`px-4 py-2 rounded ${sort.field === 'price' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Giá {sort.field === 'price' && (sort.order === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
            <Link to={`/products/${product._id}`} className="block">
              <div className="relative pb-[133%]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="font-bold text-xl mb-2 text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-600 mb-2">Thương hiệu: {product.brand}</p>
                <p className="text-lg font-bold text-blue-600">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </p>
              </div>
            </Link>
            <div className="px-4 pb-4">
              <button 
                onClick={() => handleAddToCart(product)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors w-full flex items-center justify-center"
              >
                <FaShoppingCart className="mr-2" />
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ProductList.defaultProps = {
  searchTerm: '',
  filters: {
    category_id: '',
    collection_id: '',
    type: '',
    status: '',
    minPrice: '',
    maxPrice: '',
    'metadata.weight': '',
    'metadata.material': ''
  },
  sort: {
    field: 'createdAt',
    order: 'desc'
  }
};

export default React.memo(ProductList);