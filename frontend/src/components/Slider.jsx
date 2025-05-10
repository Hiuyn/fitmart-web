// src/components/Slider.jsx
import React, { useState } from 'react';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Slider = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section className="mb-12">
      <div className="relative h-96 overflow-hidden rounded-lg">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-xl">{product.price}</p>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        >
          <BsArrowLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        >
          <BsArrowRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default Slider;
