import { Navigate, useNavigate } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import  styles from "../heroSection.module.css";

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const collectionImages = [
    {
        link: "https://www.mariab.pk/cdn/shop/files/Luxury_Formal_693929a4-d8de-4746-ac92-f41aa865fa6b_180x.jpg?v=1751543129",
        label: "LUXURY FORMALS"
    },
    {
        link: "https://www.mariab.pk/cdn/shop/files/PRET_180x.jpg?v=1751543129",
        label: "LUXURY PRET",
    },
    {
        link: "https://www.mariab.pk/cdn/shop/files/STITCHED_LAWN_180x.jpg?v=1751543129",
        label: "STITCHED",
    },
    {
        link: "https://www.mariab.pk/cdn/shop/files/Bridals_Featured_design_180x.jpg?v=1754980773",
        label: "BRIDALS",
    },
    {
        link: "https://www.mariab.pk/cdn/shop/files/UNSTICHED_180x.jpg?v=1751543129",
        label: "UNSTITCHED",
    },
    {
        link: "https://www.mariab.pk/cdn/shop/files/Menswear_daaa4fd0-9995-494c-a428-2970de45e6cd_180x.jpg?v=1751543129",
        label: "MENS'S WEAR",
    },
    {
        link: "https://www.mariab.pk/cdn/shop/files/KIDS_550b534f-9e96-4c54-9d5a-0fa4d5e8d573_180x.jpg?v=1751543129",
        label: "KIDS",
    },
    {
        link: "https://www.mariab.pk/cdn/shop/files/Jewlary_180x.jpg?v=1751543129",
        label: "JEWLERY",
    },
    {
        link: "https://www.mariab.pk/cdn/shop/files/RTW_thumbnail_a2532152-f30c-44c0-8e5a-c358a2e213ea_180x.jpg?v=1751543088",
        label: "MONOCHROME",
    },
    {
        link: "https://www.mariab.pk/cdn/shop/files/pre-fall_feature_tiles_180x.jpg?v=1752562228",
        label: "PRE-FALL",
    },
    {
        link: "https://www.mariab.pk/cdn/shop/files/mlux_FAbric_180x.jpg?v=1751543129",
        label: "MLUXE FABRICS",
    },

]

const Collection = () => {

    const navigate = useNavigate();

    return (
        <>
            <Swiper
                slidesPerView={2}
                spaceBetween={10}
                loop={true}
                // pagination={{
                //     clickable: true,
                // }}
                navigation={true}
                modules={[Autoplay, Navigation]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
                breakpoints={{
                    // Responsive breakpoints
                    320: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 15
                    },
                    768: {
                        slidesPerView: 5,
                        spaceBetween: 15
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 20
                    },
                    1280: {
                        slidesPerView: 6,
                        spaceBetween: 25
                    },
                    1536: {
                        slidesPerView: 6,
                        spaceBetween: 30
                    }
                }}
            >
                {
                    collectionImages?.map((currNewImage, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className='flex flex-col overflow-hidden'>
                                    <div className='overflow-hidden'>
                                        <img src={currNewImage?.link} className='aspect-square rounded-full hover:scale-110 hover:rotate-3 transform transition duration-700 cursor-pointer' onClick={() => { navigate("/products") }} />
                                    </div>
                                    <div className='font-a text-sm md:text-xl cursor-pointer text-center' onClick={() => { navigate("/products") }} >{currNewImage?.label}</div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </>


    )
}
export default Collection;




