import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import deleteFavourite from "@/component/deleteFavourite";
import { useNavigate } from "react-router-dom";


const Wishlist = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { favouriteItems } = useSelector((state) => {
        return state.products
    })
    if (favouriteItems.length > 0) {
        return (
            <div className="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 xl:gap-5 grid-cols-2 2xl:container 2xl:mx-auto mx-3 sm:mx-5">
                {
                    favouriteItems?.map((currFavourite, index) => {
                        return (
                            <div key={currFavourite.id}>
                                <div className="cursor-pointer"><img src={currFavourite.images[0]}  onClick={()=>{navigate(`/products/${currFavourite.id}`)}} /></div>
                                <div className="border-1 border-black mt-4 font-a text-xl sm:text-2xl text-center hover:text-white hover:bg-black transition duration-1000">
                                    <div className="cursor-pointer" onClick={() => { deleteFavourite(index, dispatch) }}>REMOVE</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    } else {
        return (
            <div className="2xl:container 2xl:mx-auto mx-3 sm:mx-5">
                <div className="text-xl md:text-3xl text-center text-bold font-bold">MY WHISHLIST</div>
                <div className="mt-5 text-sm sm:text-lg">There is no product in your wishlist!</div>
            </div>
        )
    }


}
export default Wishlist;