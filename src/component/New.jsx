import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PakistanCurrency from './PakistanCurrency';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import recentVisited from './recentVisited';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from "../heroSection.module.css";

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const New = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["new"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3001/products");
            return res.data;
        }
    })

    const newData = data?.filter((currProduct) => {
        return currProduct.isNew === true;
    })

    if (isLoading) {
        return <h1>Loading....</h1>
    }
    if (isError) {
        return <h1>{error.message}</h1>
    }

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
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 25
                    },
                    1536: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    }
                }}
            >
                {
                    newData?.map((currNewImage, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className='flex flex-col overflow-hidden '>
                                    <div className='overflow-hidden'>
                                        <img src={currNewImage?.images[0]} className='hover:scale-110 hover:rotate-3 transform transition duration-700 cursor-pointer' onClick={() => { navigate(`/products/${currNewImage.id}`); recentVisited(currNewImage , dispatch) }} />
                                    </div>
                                    <div className='line-clamp-1 text-sm font-bold text-sm md:text-md px-0  cursor-pointer' onClick={() => { navigate(`/products/${currNewImage.id}`); recentVisited(currNewImage , dispatch) }} >{currNewImage?.title}</div>
                                    <div className='line-clamp-1 text-sm font-bold text-sm md:text-md px-0  cursor-pointer' onClick={() => { navigate(`/products/${currNewImage.id}`); recentVisited(currNewImage , dispatch) }} ><PakistanCurrency amount={currNewImage?.price} /></div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </>


    )
}
export default New;




