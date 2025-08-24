import { addFavouriteItems } from "@/Slices/productsSlice";

const deleteFavourite = (id , dispatch)=>{
    const saved = localStorage.getItem("FavouriteItems");
    const favouiteItems = saved ? JSON.parse(saved) : [];
    favouiteItems.splice(id , 1);
    localStorage.setItem("FavouriteItems",JSON.stringify(favouiteItems))
    dispatch(addFavouriteItems(favouiteItems))
}
export default deleteFavourite;