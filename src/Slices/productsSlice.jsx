import { createSlice } from "@reduxjs/toolkit";

const savedCartItems = localStorage.getItem("CartItems");
const cartdata = savedCartItems ? Number(savedCartItems) : 0;
const savedRecentItems = localStorage.getItem("RecentItems");
const recentdata = savedRecentItems ? JSON.parse(savedRecentItems) : [];
const savedFavouriteItems = localStorage.getItem("FavouriteItems");
const favouriteData = savedFavouriteItems ? JSON.parse(savedFavouriteItems) : []
const savedStarItems = localStorage.getItem("Stars");
const starData = savedStarItems ? JSON.parse(savedStarItems) : [];
const savedStarsItemsData = localStorage.getItem("starItemsData");
const starsData = savedStarsItemsData ? JSON.parse(savedStarsItemsData) : [];

const productsSlice = createSlice({
    name: "products",
    initialState: {
        originalProducts: [],
        products: [],
        cartItems: cartdata,
        recentItems: recentdata,
        favouriteItems : favouriteData,
        starItems: starData,
        numbersOfStarItems: 0,
        starItemsData: starsData,
    },
    reducers:{
        addProducts : (state , action)=>{
            state.products = [...action.payload];
            state.originalProducts = [...action.payload]
        },
        addFilteredProducts : (state , action)=>{
            state.products = [...action.payload];
        },
        addCartItems: (state , action)=>{
            state.cartItems = action.payload
        },
        addRecentItems: (state , action)=>{
            state.recentItems = [...action.payload]
        },  
        addFavouriteItems: (state , action)=>{
            state.favouriteItems = [...action.payload]
        },
        addStarItems: (state , action)=>{
            state.starItems = [...action.payload]
        },
        addStarItemsData: (state , action)=>{
            state.starItemsData = [...action.payload]
        },

        
    }
})
export default productsSlice.reducer;
export const {addProducts , addFilteredProducts , addCartItems , addRecentItems , addFavouriteItems , addStarItems , addStarItemsData} = productsSlice.actions;