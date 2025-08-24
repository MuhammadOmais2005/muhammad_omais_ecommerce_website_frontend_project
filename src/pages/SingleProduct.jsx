import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Cart from "@/component/Cart";
import { useDispatch, useSelector } from "react-redux"
import { addCartItems } from "@/Slices/productsSlice";
import RelatedProducts from "@/component/RelatedProducts";
import SingleProductGallery from "@/component/SingleProductGallery";
import PakistanCurrency from "@/component/PakistanCurrency";
import Description from "@/component/Description";
import RecentProducts from "@/component/RecentProducts";
import Stars from "@/component/Stars";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

const SinlgeProduct = () => {

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => {
        return state.products;
    })
    const [sizeSelection, setSizeSelection] = useState({})
    const { id } = useParams();
    const NumId = Number(id)
    const getSingleProduct = async () => {
        const res = await axios.get(`http://localhost:3001/products/${NumId}`)
        return res.data
    }
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products", NumId],
        queryFn: getSingleProduct
    })

    const size_selection = data && Object.entries(data?.size).reduce((accum, [key, value]) => {
        return accum = { ...accum, [key]: false }
    }, {})

    const [selectedSize, setSelectedSize] = useState("")
    const [selectedStock, setSelectedStock] = useState(10)

    useEffect(() => {
        setSizeSelection(sizeSelection)
    }, [size_selection])


    const selectSize = (size, stock) => {
        setSizeSelection({ ...size_selection })
        setSizeSelection({ ...size_selection, [size]: true })
        setSelectedSize(size)
        setSelectedStock(stock)
    }


    const [currQty, setCurrQty] = useState(1);

    const incr = () => {
        if (selectedSize) {
            setCurrQty((prev) => prev + 1)
        } else {
            alert("Select Size first")
        }
    }
    const decr = () => {
        if (selectedSize) {
            setCurrQty((prev) => prev - 1)
        } else {
            alert("Select Size first")
        }
    }

    const [isOpen, setIsOpen] = useState(false);

    const addToCart = () => {
        // Prepare the item to be added to the cart
        const cartData = {
            ...data,
            sz: selectedSize,
            qty: currQty,
            stk: selectedStock,
        };

        // Don't proceed if no size is selected
        if (!selectedSize) {
            alert("Select Size first");
            return;
        }

        // Get existing cart data from localStorage
        const saved = localStorage.getItem("Carts");
        const storedData = saved ? JSON.parse(saved) : [];

        // Find the index of the existing item (if it exists)
        const existIndex = storedData.findIndex(
            (item) => item.id === cartData.id && item.sz === cartData.sz
        );

        if (existIndex !== -1) {

            if (storedData[existIndex].qty === storedData[existIndex].stk) {
                alert("You have already selected all stock items of the size");
                setIsOpen(true)
                return;
            }

            // If item already exists, update its quantity (respecting stock limit)
            const existingItem = storedData[existIndex];
            const newQty = Math.min(existingItem.qty + cartData.qty, cartData.stk);

            // Replace the existing item with updated quantity
            storedData[existIndex] = { ...existingItem, qty: newQty };

            // Save updated cart to localStorage
            localStorage.setItem("Carts", JSON.stringify(storedData));
            dispatch(addCartItems(cartItems + newQty - existingItem.qty));
            localStorage.setItem("CartItems", JSON.stringify(cartItems + newQty - existingItem.qty))

            if ((existingItem.qty + cartData.qty) > cartData.stk) {
                alert(`you have alreday selected ${existingItem.qty} only ${cartData.stk - existingItem.qty} are added to reach stock limit ${cartData.stk}`);
                setIsOpen(true);
                return;
            } else {
                alert("Cart updated!");
                setIsOpen(true);
            }
        } else {
            // If it's a new item, add it to the cart
            localStorage.setItem("Carts", JSON.stringify([...storedData, cartData]));
            dispatch(addCartItems(cartItems + cartData.qty));
            localStorage.setItem("CartItems", JSON.stringify(cartItems + cartData.qty));
            alert("Added to cart!");
            setIsOpen(true)
        }

    };

    const sizeFullForm = () => {
        switch (selectedSize) {
            case "XS":
                return "Extra Small";

            case "S":
                return "Small";

            case "M":
                return "Medium";

            case "L":
                return "Large";

            case "XL":
                return "Extra Large";

            default:
                return ""
        }
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <>
            <div className="grid md:grid-cols-[2fr_3fr] 2xl:container 2xl:mx-auto mx-3 sm:mx-5 gap-5 mt-5">
                <div className="md:px-0 overflow-hidden  px-5 sm:px-30">
                    <SingleProductGallery images={data?.images} />
                </div>
                <div className="flex flex-col gap-y-2">
                    <div>
                        <div className="text-lg xl:text-2xl xl:text-2xl xl:text-2xl xl:text-2xl xl:text-2xl font-bold">{data?.title} | {data?.productId}
                        </div>
                        <div className="font-bold text-gray-500 lh-none text-sm capatilize">{selectedSize && (<span>{data?.productId} | {sizeFullForm()} | <span className="capitalize">{data?.color}</span> | {selectedStock > 0 ? "In Stock" : "Out of Stock"}</span>)}</div>
                    </div>

                    <div className="text-lg xl:text-2xl font-bold"><PakistanCurrency amount={data?.price} /></div>
                    <div><span className="text-lg xl:text-2xl font-bold">Size:</span> <span className="text-[10px]">VIEW SIZE GUIDE</span></div>
                    <div className="flex flex-wrap gap-x-4">
                        {
                            Object.entries(data?.size).map(([key, value], index) => {
                                return (
                                    <div key={index} className={`${sizeSelection[key] ? "border-2 font-bold" : ""} border-1 border-black flex place-items-center justify-center  w-10 xl:w-12 aspect-square text-sm xl:text-lg cursor-pointer`} onClick={() => { selectSize(key, value); setCurrQty(1) }}>
                                        {key}
                                        <span className="text-sm">({value})</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="text-xl  flex flex-wrap  text-center gap-x-2  mt-5">
                        <div className="aspect-square place-items-center flex place-content-center text-4xl text-gray-900 cursor-pointer" onClick={decr}><button disabled={currQty <= 1} className="cursor-pointer"><CiCircleMinus /></button></div>
                        <div className="aspect-square place-items-center flex place-content-center text-xl text-gray-900">{currQty}</div>
                        <div className="aspect-square place-items-center flex place-content-center text-4xl text-gray-900 " onClick={incr}><button className="cursor-pointer" disabled={currQty >= selectedStock}><CiCirclePlus /></button></div>

                        <div className={`ms-4 font-a font-bold w-40 xl:w-55 flex place-content-center py-2 hover:bg-black hover:text-white border-1 border-black  text-2xl transition duration-700 cursor-pointer`} onClick={() => { addToCart() }} ><button>ADD TO CART</button></div>
                    </div>




                    <div><Description description={data?.description} /></div>

                    <div><span className="font-bold">Note: </span><span>Actual product color may vary slightly from the image.</span></div>


                </div>
            </div>

            <Stars id={NumId} />
            <div className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl  md:text-5xl font-bold font-a my-3 md:my-5 xl:my-7">SIMILAR PRODUCTS</div>
            <div><RelatedProducts product={data} /></div>
            <Cart open={isOpen} setIsOpen={setIsOpen} />
            <div className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl  md:text-5xl font-bold font-a my-3 md:my-5 xl:my-7">RECENTLY VIEWED PRODUCTS</div>
            <div className="2xl:container 2xl:mx-auto mx-3 sm:mx-5"><RecentProducts /></div>
        </>
    )
}
export default SinlgeProduct;