import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/courses`;

const courseService = {
  // Lấy danh sách khóa học
  getAllCourses: async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Current token:', token); // Debug log
      
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error in getAllCourses:', error);
      throw error;
    }
  },

  // Tạo khóa học mới
  createCourse: async (courseData) => {
    try {
      const formData = new FormData();
      
      // Thêm các trường thông tin cơ bản
      Object.keys(courseData).forEach(key => {
        if (key !== 'images' && key !== 'thumbnail') {
          formData.append(key, courseData[key]);
        }
      });

      // Thêm thumbnail nếu có
      if (courseData.thumbnail) {
        formData.append('thumbnail', courseData.thumbnail);
      }

      // Thêm ảnh mô tả nếu có
      if (courseData.images?.length > 0) {
        courseData.images.forEach(image => {
          formData.append('images', image);
        });
      }

      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cập nhật khóa học
  updateCourse: async (id, courseData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/${id}`, courseData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Xóa khóa học
  deleteCourse: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default courseService; 
