import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import { useDispatch, useSelector } from "react-redux";
// import '../recentProducts.css';
import styles from "../recentProducts.module.css"
import { useNavigate } from 'react-router-dom';
import recentVisited from './recentVisited';



const RecentProducts = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { recentItems } = useSelector((state) => state.products);
    const handleClick = (event , currRecent)=>{
        navigate(`/products/${currRecent.id}`);
        recentVisited(currRecent ,dispatch )
    }
    return (
        <>

            <div className=''>
                {recentItems.length > 0 ? (
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={2}
                        // pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Navigation]}
                        // className="mySwiper"
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
                        {recentItems.map((currRecent) => (
                            <SwiperSlide key={currRecent.id} onClick={(event)=>{handleClick(event , currRecent)}} className='overflow-hidden'>
                                <img src={currRecent.images[0]} alt="Product" className='hover:scale-110 transition duration-700'/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="text-4xl">
                        No recent items
                    </div>
                )}
            </div>
        </>
    );
};

export default RecentProducts;






