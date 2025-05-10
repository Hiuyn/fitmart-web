/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      height: {
        'screen': '100vh',
        'screen-80': '80vh',
        'screen-90': '90vh',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      // Thêm các utilities cho scroll snapping
      scrollSnapType: {
        y: 'y mandatory',
      },
      scrollSnapAlign: {
        start: 'start',
        end: 'end',
        center: 'center',
      },
      scrollSnapStop: {
        normal: 'normal',
        always: 'always',
      },
      // Thêm các utilities cho scroll behavior
      scrollBehavior: {
        smooth: 'smooth',
        auto: 'auto',
        instant: 'instant',
      }
    },
  },
  plugins: [],
}