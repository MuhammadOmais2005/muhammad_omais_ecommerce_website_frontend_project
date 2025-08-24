import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "@/Slices/productsSlice";
import { useEffect } from "react"
import recentVisited from "./recentVisited";
import { FaHeart } from "react-icons/fa";
import favourites from "./favourites";
import checkFavourite from "./checkFavourite";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import PakistanCurrency from "./PakistanCurrency";

const ProductsList = () => {
  const navigte = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => {
    return state.products
  })

  const getProducts = async () => {
    const res = await axios.get("http://localhost:3001/products");
    return res.data
  }


  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(addProducts(data))
    }
  }, [data, isSuccess])


  const handleClick = (event , currProduct)=>{
    recentVisited(currProduct, dispatch);
    navigte(`/products/${currProduct.id}`)
  }

  const handleFavourites = (event , currProduct)=>{
    favourites(currProduct, dispatch);
    event.stopPropagation();
  }

  const [hoveredData , setHoveredData] = useState("")
  const handleMouseEnter = (currProduct)=>{
    setHoveredData(currProduct.id)
  }
  const handleMouseLeave = (currProduct)=>{
    setHoveredData("")
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }


  return (
    <>
      <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-3 lg:gap-5 xl:gap-5 2xl:gap-5 2xl:container mx-2 sm:mx-5`}>
        {
          products?.map((currProduct, index) => (
            <div key={index} className="flex flex-col">
              <div className="relative overflow-hidden">
                <img src={`${hoveredData === currProduct.id ? currProduct.images[1] : currProduct.images[0]}`} alt="" className={`${currProduct.id === hoveredData ? "scale-105" : "scale:100"} transition duration-700`} />
                <div className="absolute top-0 left-0 bg-red h-full w-full flex flex-col justify-between py-2 sm:py-5" onClick={(event) => { handleClick(event , currProduct) }} onMouseEnter={()=>{handleMouseEnter(currProduct)}} onMouseLeave={()=>{handleMouseLeave(currProduct)}} >
                  <div className="">
                    <div className={`px-2 sm:px-3 text-xl sm:text-2xl ${checkFavourite(currProduct.id) ? "text-red-500" : ""}`} onClick={(event) => { handleFavourites(event , currProduct) }}><FaHeart /></div>
                  </div>
                  <div className={`py-1 text-center bg-white/60 transition duration-700 ${hoveredData === currProduct.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>QUICK VIEW</div>
                </div>
              </div>
              <div className="md:text-xl text-[13px] font-bold">{currProduct.title}</div>
              <div></div>
              <div className="flex gap-x-2 gap-y-0 flex-wrap">
                {
                  Object.entries(currProduct?.size).map(([key , value],index)=>{
                    return (
                      <div className="my-2 border-1 border-gray-500 text-center rounded-6 aspect-square flex justify-center items-center w-7 md:w-8 xl:w-9 font-bold text-gray-900
                      ">{key}</div>
                    )
                  })
                }
              </div>
              <div className="font-a text:lg md:text-xl mt-auto text-end"><PakistanCurrency amount={currProduct.price}/></div>

            </div>

          ))
        }

      </div>

    </>
  );
};

export default ProductsList;
