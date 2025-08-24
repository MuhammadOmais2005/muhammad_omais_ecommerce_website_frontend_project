import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addFilteredProducts } from "@/Slices/productsSlice";

const Sort = () => {

    const dispatch = useDispatch();

    const { products, originalProducts } = useSelector((state) => {
        return state.products
    })
    
    const [sort, setSort] = useState("");

    const changeSort = (event) => {
        setSort(event.target.value)
    }

    let beforeSort = [...products]

    const sorting = () => {
        if (sort == "a-z") {
            beforeSort.sort((a, b) => {
                return b.category.localeCompare(a.category);
            })
        }

        if (sort === "z-a") {
            beforeSort.sort((a, b) => {
                return a.category.localeCompare(b.category);
            })

        }

        if (sort === "h-l") {
            beforeSort.sort((a, b) => {
                return b.price - a.price;
            })


        }

        if (sort === "l-h") {
            beforeSort.sort((a, b) => {
                return a.price - b.price;
            })
        }
        dispatch(addFilteredProducts(beforeSort))
    }
    useEffect(() => {
        if (sort !== "none") {
            sorting()
        }else{
            dispatch(addFilteredProducts([...originalProducts]))
        }
    }, [sort])
    return (
        <>
            <div>
                <select onChange={(event) => { changeSort(event) }} className="text-[13px] md:text-xl lg:text-xl 2xl:text-xl">
                    <option value={"none"}>Sort</option>
                    <option value={"a-z"}>Alphabatically: A to Z</option>
                    <option value={"z-a"}>Alphabatically: Z to A</option>
                    <option value={"h-l"}>Highest: High to Low</option>
                    <option value={"l-h"}>Lowest: Low to High</option>
                </select>
            </div>
        </>
    )
}

export default Sort;