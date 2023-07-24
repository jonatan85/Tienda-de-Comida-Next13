'use client'

import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './carrusel.module.css';

import imagen1 from '../../public/img/bueno.jpeg';
import imagen2 from '../../public/img/bodegon.jpeg';
import imagen3 from '../../public/img/pizza.jpeg';


export default function Carrusel() {  
  const carouselRef = useRef(null);
  const carouselImages = [imagen1, imagen2, imagen3];

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.slickNext();
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings} ref={carouselRef}>
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
      </Slider>
    </div>
  );
}