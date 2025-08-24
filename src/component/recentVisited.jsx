import { addRecentItems } from "@/Slices/productsSlice";

const recentVisited = (product , dispatch) => {
    

    const saved = localStorage.getItem("RecentItems");
    const data = saved ? JSON.parse(saved) : [];
    const existingIndex = data?.findIndex((currRecent) => {
        return currRecent.id === product.id
    });
    if (existingIndex !== -1) {
        data.splice(existingIndex, 1);
    }
    data.unshift(product);
    if (data.length > 5) {
        data.length = 5
    }

    localStorage.setItem("RecentItems", JSON.stringify(data))
    dispatch(addRecentItems(data));

}
export default recentVisited;