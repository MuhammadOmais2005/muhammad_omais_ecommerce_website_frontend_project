// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from "../heroSection.module.css";

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const heroSectionImages = [
    "https://www.mariab.pk/cdn/shop/files/50-_-off-web-banner.jpg?v=1754636557",

]

const HeroSection = () => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                // spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                className="mySwiper"
            >
                <SwiperSlide><img src={heroSectionImages[0]}/></SwiperSlide>
                <SwiperSlide><img src={heroSectionImages[0]}/></SwiperSlide>
                <SwiperSlide><img src={heroSectionImages[0]}/></SwiperSlide>
                <SwiperSlide><img src={heroSectionImages[0]}/></SwiperSlide>
                <SwiperSlide><img src={heroSectionImages[0]}/></SwiperSlide>
                <SwiperSlide><img src={heroSectionImages[0]}/></SwiperSlide>

            </Swiper>
        </>


    )
}
export default HeroSection;




