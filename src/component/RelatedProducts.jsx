import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import styles from "../recentProducts.module.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import recentVisited from './recentVisited';


import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const RelatedProducts = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const b = async () => {
        const a = await fetch("https://api.instantwebtools.net/v1/passenger?page=0&size=10");
        const c = await a.json();
    }
    b();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["related"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3001/products");
            return res.data;
        }
    })
    if (isLoading) { return <h1>Loading...</h1> }
    if (isError) { return <h1>{error.message}</h1> }
    const category = product.category;
    // const tags = product.tags;
    const id = product.id
    const relatedProductsData = data?.filter((currProduct) => {
        const categoryMatch = currProduct.category === category;
        // const tagMatch = currProduct.tags.some((currTag)=>{
        //     return tags.includes(currTag);
        // })
        // const isRelated = currProduct.id !== id && categoryMatch && tagMatch
        const isRelated = currProduct.id !== id && categoryMatch;
        return isRelated
    })
    if (relatedProductsData.length > 5) {
        relatedProductsData.length = 5
    }
    const handleClick = (event, currRelated) => {
        recentVisited(currRelated, dispatch)
        navigate(`/products/${currRelated.id}`);
    }
    return (
        <>
            <div className='2xl:container 2xl:mx-auto mx-3 sm:mx-5'>

                {
                    relatedProductsData?.length > 0 ? (
                        <Swiper
                            pagination={{ clickable: true }}
                            navigation={true}
                            modules={[Navigation]}
                            slidesPerView={2}
                            spaceBetween={2}
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

                            {relatedProductsData.map((currRelated) => {

                                return (
                                    <SwiperSlide className="overflow-hidden" key={currRelated.id} onClick={(event) => { handleClick(event, currRelated) }} >
                                            <img src={currRelated.images[0]} alt="Product" width="100%"className='hover:scale-110 transition duration-700' />
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    ) : (<div className="text-xl">No related products</div>)
                }
            </div>

        </>

    )
}
export default RelatedProducts;