// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './swiper.css';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

export default function HomeCarousel() {
  const images = [
    "/carouselImage1.jpg",
    "/carouselImage2.jpg",
    "/carouselImage3.jpg",
    "/carouselImage4.jpg",
    "/carouselImage5.jpg"
  ];

  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        loop={true}
        autoplay={{
          delay: 2000, // 2000ms = 2 seconds
          disableOnInteraction: false,
        }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img style={{ objectFit: 'cover', objectPosition: 'top' }} src={img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}