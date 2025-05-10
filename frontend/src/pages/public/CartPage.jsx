import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống. <Link to="/" className="text-blue-500 hover:underline">Tiếp tục mua sắm</Link></p>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.price.toLocaleString()} VND</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input 
                        type="number" 
                        min="1" 
                        value={item.quantity} 
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-16 px-2 py-1 border rounded bg-white" // Thêm bg-white
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{(item.price * item.quantity).toLocaleString()} VND</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex justify-end">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Tổng cộng</h2>
              <p className="text-2xl font-bold">{cartTotal.toLocaleString()} VND</p>
              <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
                Thanh toán
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
