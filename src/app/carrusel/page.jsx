'use client'

import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './carrusel.module.css';

import pizzaImage from '../../public/img/ricota.jpg';
// import imagen3 from './img/imagen3.jpg';
// import imagen4 from './img/imagen4.jpg';
// import imagen5 from './img/imagen5.jpg';

export default function Carrusel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [pizzaImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [carouselImages.length]);

  return (
    <div className={styles.carouselContainer}>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        selectedItem={currentSlide}
        onChange={(slide) => setCurrentSlide(slide)}
      >
        {carouselImages.map((image, index) => (
          <div key={index} className={styles.carouselItem}>
            <img
              className={styles.carouselImg}
              src={image.src}
              alt={`Imagen${index + 1}`}
              width={image.width}
              height={image.height}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

