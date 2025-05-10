import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Thêm interceptor để tự động thêm token vào header
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const registerUser = async (userData) => {
  try {
    console.log('Sending registration data:', {
      ...userData,
      password: '****'
    });

    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error.response?.data || new Error('Registration failed');
  }
};

export const loginUser = async (credentials) => {
  try {
    console.log('Attempting login with:', { email: credentials.email, password: '****' });
    console.log('Sending login request to:', '/auth/login');
    
    const response = await api.post('/auth/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    
    return response.data;
  } catch (error) {
    console.error('Login API error:', error.response || error);
    throw error.response?.data || {
      success: false,
      message: 'Không thể kết nối đến server'
    };
  }
};

const mockCourses = [
  {
    id: 'eng1',
    name: 'English guide 8',
    level: 'Beginner',
    price: 200000,
    image: '/assets/images/guide2.png',
    description: 'A comprehensive guide for beginners'
  },
  {
    id: 'eng2',
    name: 'English guide 9',
    level: 'Intermediate',
    price: 499000,
    image: '/assets/images/guide3.png',
    description: 'Advanced lessons for intermediate learners'
  },
  {
    id: 'eng3',
    name: 'English guide 7',
    level: 'Advanced',
    price: 699000,
    image: '/assets/images/guide4.png',
    description: 'Expert-level English course'
  },
  {
    id: 'vn1',
    name: 'Tiếng Việt cho người mới bắt đầu',
    level: 'Sơ cấp',
    price: 299000,
    image: '/assets/images/vietnamese-beginners.jpg',
    description: 'Khóa học tiếng Việt cơ bản cho người mới bắt đầu'
  },
  {
    id: 'vn2',
    name: 'Tiếng Việt 6',
    level: 'Trung cấp',
    price: 399000,
    image: '/assets/images/GTv6.pdf',
    description: 'Khóa học tiếng Việt cho người đã có kiến thức cơ bản'
  },
  {
    id: 'vn3',
    name: 'Tiếng Việt nâng cao',
    level: 'Nâng cao',
    price: 599000,
    image: '/assets/images/advanced-vietnamese.jpg',
    description: 'Khóa học tiếng Việt chuyên sâu cho người muốn đạt trình độ cao'
  },
  {
    id: 'vn4',
    name: 'Văn hóa và ngôn ngữ Việt Nam',
    level: 'Đa cấp',
    price: 499000,
    image: '/assets/images/vietnamese-culture.jpg',
    description: 'Khám phá văn hóa Việt Nam thông qua ngôn ngữ'
  },
  {
    id: 'vn5',
    name: 'Tiếng Việt thương mại',
    level: 'Chuyên ngành',
    price: 699000,
    image: '/assets/images/business-vietnamese.jpg',
    description: 'Tiếng Việt chuyên ngành cho môi trường kinh doanh'
  }
];

export const getCourses = async (language = 'all') => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  if (language === 'english') {
    return mockCourses.filter(course => course.id.startsWith('eng'));
  } else if (language === 'vietnamese') {
    return mockCourses.filter(course => course.id.startsWith('vn'));
  }
  return mockCourses;
};

export const addToCart = async (courseId) => {
  const response = await api.post('/cart/add', { courseId });
  return response.data;
};

export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const getCourseById = async (id) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  const course = mockCourses.find(course => course.id === id);
  if (course) {
    return course;
  } else {
    throw new Error('Course not found');
  }
};

export default api;
