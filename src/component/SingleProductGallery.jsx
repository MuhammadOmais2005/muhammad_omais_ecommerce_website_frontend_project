import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import '../SingleProductGallery.css';
// import styles from "../SingleProductGallery.module.css"

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';





const SingleProductGallery = ({ images }) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            
            
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                // className={"mySwiper2"}
                // className={styles.mySwiper2}
            >

                {
                    images?.map((currImage)=>{
                        return (
                            <SwiperSlide>
                               <img src={currImage}/> 
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                // className={"mySwiper"}
                // className={styles.mySwiper}
            >
                {
                    images?.map((currImage)=>{
                        return (
                            <SwiperSlide>
                               <img src={currImage} /> 
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </>
    )
}
export default SingleProductGallery;



