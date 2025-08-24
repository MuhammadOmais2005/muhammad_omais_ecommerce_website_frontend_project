import Filter_Sorting from "@/component/Filter_Sorting";
import ProductsList from "@/component/ProductsList";
const products = () => {
    return (
        <>
            <div className="sm:mt-5 mt-3 flex flex-col sm:gap-y-5 gap-y-3">
                <Filter_Sorting />
                <ProductsList />
            </div>
        </>
    )
}
export default products;