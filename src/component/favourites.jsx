import { addFavouriteItems } from "@/Slices/productsSlice";

const favourites = (product , dispatch)=>{

    
    const saved = localStorage.getItem("FavouriteItems");
    const data = saved ? JSON.parse(saved) : [];
    const existingIndex = data?.findIndex((currFavourite)=>{
        return product.id === currFavourite.id
    })
    if(existingIndex !== -1){
        data.splice(existingIndex , 1)
        localStorage.setItem("FavouriteItems", JSON.stringify(data))
        dispatch(addFavouriteItems(data))  
    }else{
        data.unshift(product);
        localStorage.setItem("FavouriteItems", JSON.stringify(data))
        dispatch(addFavouriteItems(data))  
    }  
}
export default favourites;