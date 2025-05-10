import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Đảm bảo có đầy đủ các trường bắt buộc
    if (!formData.fullName) {
      toast.error('Vui lòng nhập họ tên');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        toast.success('Đăng ký thành công');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form elements go here */}
    </form>
  );
};

export default SignupForm; 