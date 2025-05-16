import { useEffect } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  .swiper-container {
    width: 100%;
    padding: 50px 0;
  }
`;

export default function ScreenshotSlider() {
  useEffect(() => {
    // Load Swiper only on client side
    const Swiper = require('swiper');
    new Swiper('.screenshots-slider.style-4 .swiper-container', {
      slidesPerView: 5,
      spaceBetween: 0,
      centeredSlides: true,
      speed: 1000,
      pagination: false,
      navigation: false,
      mousewheel: false,
      keyboard: true,
      autoplay: {
        delay: 4000,
      },
      loop: true,
      breakpoints: {
        0: { slidesPerView: 2 },
        480: { slidesPerView: 2 },
        787: { slidesPerView: 3 },
        991: { slidesPerView: 3 },
        1200: { slidesPerView: 5 }
      }
    });
  }, []);

  return (
    <SliderContainer className="screenshots-slider style-4">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {/* Add your slides here */}
          <div className="swiper-slide">Slide 1</div>
          <div className="swiper-slide">Slide 2</div>
          {/* ... */}
        </div>
      </div>
    </SliderContainer>
  );
}