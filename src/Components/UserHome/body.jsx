import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import arrow icons
import backgroundImage1 from '../../Assets/Images/1.jpg';
import backgroundImage2 from '../../Assets/Images/1.jpg';
import backgroundImage3 from '../../Assets/Images/1.jpg';
import backgroundImage4 from '../../Assets/Images/1.jpg';
import backgroundImage5 from '../../Assets/Images/1.jpg';

const ImageSlider = () => {
  const images = [backgroundImage1, backgroundImage2, backgroundImage3, backgroundImage4, backgroundImage5]; // Array of images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  return (
    <div style={{ width: '100%', height: '60vh', position: 'relative', overflow: 'hidden' }}>
      <div 
        style={{
          width: `${images.length * 100}%`,
          height: '100%', 
          display: 'flex',
          transition: 'transform 2s',
          transform: `translateX(-${currentImageIndex * (100 / images.length)}%)`
        }}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            style={{
              width: `${100 / images.length}%`,
              height: '100%', 
              backgroundImage:  `url(${image})`,
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }} 
          />
        ))}
      </div>
      {/* Navigation arrows */}
      <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'space-between', width: '100%', zIndex: 1 }}>
        <FaChevronLeft size={32} style={{ cursor: 'pointer', marginLeft: '20px', color:'grey' }} onClick={goToPrevious} />
        <FaChevronRight size={32} style={{ cursor: 'pointer', marginRight: '20px', color:'grey' }} onClick={goToNext} />
      </div>
    </div>
  );
};

export default ImageSlider;