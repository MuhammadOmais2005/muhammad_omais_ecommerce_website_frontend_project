import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "@/Slices/productsSlice";
const store = configureStore({
  reducer: {
    products : productsSlice
  }  
})
export default store