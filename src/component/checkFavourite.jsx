const checkFavourite = (id)=>{
    const saved = localStorage.getItem("FavouriteItems");
    const favouriteItems = saved ? JSON.parse(saved) : [];
    if(favouriteItems.length > 0){
        const exist = favouriteItems.some((currFavourite)=>{
            return currFavourite.id === id
        })
        return exist
    }else {
        return false
    }
}
export default checkFavourite