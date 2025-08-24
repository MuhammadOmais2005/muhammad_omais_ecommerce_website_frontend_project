import Filter from "./Filter";
import Sort from "./Sort";
import { useSelector } from "react-redux";

const Filter_Sorting = () => {

    const { products } = useSelector((state) => {
        return state.products
    })

    return (
        <>
            <div className="2xl:container 2xl:mx-auto mx-2 sm:mx-5 grid grid-cols-3">
                <div className="flex items-center"><Filter /></div>
                <div className="text-5xl flex place-content-center  place-items-center">{products?.length}</div>
                <div className="flex justify-end place-items-center"><Sort /></div>
                
            </div>
        </>

    )
}
export default Filter_Sorting;