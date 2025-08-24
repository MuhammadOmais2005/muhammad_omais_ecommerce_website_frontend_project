import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart";
import Search from "./Search";
import { useSelector } from "react-redux";
import { TbTruckDelivery } from "react-icons/tb";
import DropDown from "./DropDown";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import AuthButtons from "./AuthButtons";

const data = [
    {
        title: "Unstitched",
        image: "https://www.mariab.pk/cdn/shop/collections/Unstitched_500x.webp?v=1747305335",
        labels: [["Sale", "Lawn"], ["Chiffen", "Linen"], ["Sateen", "Winter Luxe"], ["Luxury Formats", "Pre-falls"]]
    },
    {
        title: "ready to wear",
        image: "https://www.mariab.pk/cdn/shop/collections/RTW_THUMBNAIL_500X500_ce464d65-a334-41af-bc32-9b38985da92d_500x.jpg?v=1752478708",
        labels: [["Sale", "Lawn"], ["Chiffen", "Linen"], ["Sateen", "Winter Luxe"], ["Luxury Formats", "Pre-falls"]]
    },
    {
        title: "kids",
        image: "https://www.mariab.pk/cdn/shop/collections/Kids_500x.jpg?v=1755500226",
        labels: [["Sale", "Lawn"], ["Chiffen", "Linen"], ["Sateen", "Winter Luxe"], ["Luxury Formats", "Pre-falls"]]
    },
    {
        title: "stitched",
        image: "https://www.mariab.pk/cdn/shop/collections/Drop-down_ee2ba4a0-ac35-4987-9bc5-2c324ff62e44_500x.jpg?v=1748341799",
        labels: [["Sale", "Lawn"], ["Chiffen", "Linen"], ["Sateen", "Winter Luxe"], ["Luxury Formats", "Pre-falls"]]
    },
    {
        title: "accessories",
        image: "https://www.mariab.pk/cdn/shop/collections/ACCESSORIES_THUMBNAIL_500X500_a78d4085-b374-420c-acd8-0ec721d92ec4_500x.jpg?v=1746256867",
        labels: [["Sale", "Lawn"], ["Chiffen", "Linen"], ["Sateen", "Winter Luxe"], ["Luxury Formats", "Pre-falls"]]
    },
]



const Header = () => {
    const { cartItems } = useSelector((state) => {
        return state.products
    })
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <>

            <div><Cart open={isOpen} setIsOpen={setIsOpen} /></div>
            <div className="grid grid-cols-[3fr_1fr_3fr] md:grid-cols-[2fr_3fr_2fr] lg:grid-cols-[2fr_4fr_2fr] 2xl:container mx-3 md:mx-5 h-15 sm:h-20 sticky top-0 md:left-5 left-3 z-10 bg-white/50 backdrop-blur-lg filter drop-shadow-[0_8px_8px_rgba(168,85,247,0.6)]">
                <div className="md:hidden flex flex-col font-bold text-3xl font-bold justify-center"><Menu/></div>
                <div className="flex justify-center md:justify-start items-center text-4xl sm:text-6xl font-a" onClick={()=>{navigate("/")}}><spna className="cursor-pointer">LOGO</spna></div>
                <div className="flex-wrap justify-center place-items-center md:flex hidden gap-x-3 lg:gap-x-6 xl:gap-x-7">
                    {
                        data?.map((currdata, index) => {
                            return (
                                <div onClick={()=>{navigate("/products")}} key={index}><DropDown side={"bottom"} align={(index + 1) <= Math.floor(data?.length/2) ? "start" : (index + 1) === Math.floor(data?.length/2 + 1)  ? "center" : "end"} data={currdata}/></div>
                            )
                        })
                    }
                </div>
                <div className="flex flex-wrap justify-end place-items-center md:gap-x-2 lg:gap-x-5 md:text-2xl lg:text-3xl 2xl:text-4xl md:text-3xl md:gap-x-5 sm:text-2xl sm:gap-x-3 text-xl gap-x-3">
                    <div className="text-black cursor-pointer" onClick={()=>{navigate("/wishlist")}}><FaHeart /></div>
                    <div className="text-black"><Search className="cursor-search" /></div>
                    <div className="text-black sm:block hidden cursor-pointer"><AuthButtons/></div>
                    <div className="text-black pr-5" onClick={() => { setIsOpen(true) }}>
                        <span className="relative cursor-pointer">
                            <FaShoppingCart />
                            <div className="text-sm absolute -right-3 bg-black aspect-square w-5 rounded-full flex flex-wrap place-content-center px-auto -top-2 text-white"><span>{cartItems}</span></div>
                        </span>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Header;