import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { addCartItems } from "@/Slices/productsSlice";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import PakistanCurrency from "./PakistanCurrency";
import { useNavigate } from "react-router-dom";

const Cart = ({ open, setIsOpen }) => {

    const navigate = useNavigate();


    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => {
        return state.products;
    })

    const [data, setData] = useState([])
    useEffect(() => {
        const saved = localStorage.getItem("Carts");
        const cartdata = saved ? JSON.parse(saved) : []
        setData(cartdata)
    }, [open])

    const incr = (cart) => {
        if (cart.qty === cart.stk) {
            alert(`Just ${cart.stk} in the stock are available in the stock`)
            return;
        }
        const addedQty = cart?.qty + 1;
        const newQty = Math.min(addedQty, cart.stk)
        const existingIndex = data?.findIndex((currCart) => {
            return currCart?.id === cart?.id && currCart?.sz === cart?.sz
        })
        const newCartData = data.map((currCart, index) => {
            if (index === existingIndex) {
                return { ...currCart, qty: newQty }
            } else {
                return currCart
            }
        })
        setData([...newCartData])
        localStorage.setItem("Carts", JSON.stringify([...newCartData]))
        dispatch(addCartItems(cartItems + 1));
        localStorage.setItem("CartItems", JSON.stringify(cartItems + 1))
    }


    const decr = (cart) => {
        const newQty = cart?.qty - 1;
        const existingIndex = data?.findIndex((currCart) => {
            return currCart?.id === cart?.id && currCart?.sz === cart?.sz
        })
        const newCartData = data.map((currCart, index) => {
            if (index === existingIndex) {
                return { ...currCart, qty: newQty }
            } else {
                return currCart
            }
        })
        setData([...newCartData])
        localStorage.setItem("Carts", JSON.stringify([...newCartData]))
        dispatch(addCartItems(cartItems - 1))
        localStorage.setItem("CartItems", JSON.stringify(cartItems - 1))
    }


    const deleted = (id) => {
        const newData = data?.filter((currCart, index) => {
            return id !== index
        })
        setData([...newData]);
        localStorage.setItem("Carts", JSON.stringify([...newData]))
        dispatch(addCartItems(cartItems - data[id].qty))
        localStorage.setItem("CartItems", JSON.stringify(cartItems - data[id].qty))

    }

    const subtotal = data?.reduce((accum, currCart) => {
        return accum = accum + (currCart.price * currCart.qty)
    }, 0)




    return (
        <>
            <Sheet open={open} onOpenChange={setIsOpen}>
                {/* <SheetTrigger>Open</SheetTrigger> */}
                <SheetContent className="">
                    <SheetHeader className="overflow-y-auto">
                        <SheetTitle><div><span className="font-a text-2xl">SHOPPING BAG</span> <span className="">{cartItems ? (<span>{cartItems} items</span>) : ""}</span></div></SheetTitle>
                        <SheetDescription className="">
                            {
                                !(data.length > 0) && <h1 className="text-center">No Cart Item</h1>

                            }
                            <div className="flex flex-col gap-y-2 bg-gray-50">
                                {data?.map((currCart, index) => {
                                    return (
                                        <div className="flex  gap-x-3 border-b-1 border-black">
                                            <div className="w-20 cursor-pointer sm:w-25"><img src={currCart?.images[0]}  onClick={()=>{navigate( `/products/${currCart.id}`), setIsOpen(false)}}/></div>

                                            <div className="w-auto sm:text-sm text-[10px]">
                                                <div className="font-bold text-black font-b sm:text-sm break-normal">{currCart?.title}</div>
                                                <div className=" text-black font-b">Size: {currCart?.sz}</div>
                                                <div className=" text-black font-b">Color: {currCart?.color}</div>
                                                <div className="flex flex-wrap gap-x-5 text-gray-500 items-center justify-between">
                                                    <div className="text-black">Qty: {currCart?.qty}</div>
                                                    <div className="flex flex-wrap items-center place-center gap-x-2 text-xl align-bottom">
                                                        <div onClick={() => incr(currCart)}><button><CiCirclePlus /></button></div>
                                                        <div onClick={() => decr(currCart)}><button disabled={currCart.qty <= 1}><CiCircleMinus /></button></div>
                                                    </div>
                                                    <div className="text-black"><PakistanCurrency amount={currCart.qty * currCart.price} /></div>
                                                </div>
                                                <div className="text-black text-xl flex justify-end w-full"><MdDelete onClick={() => { deleted(index) }}/></div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className={`${cartItems<=0 ? "hidden" : "block"}`}>
                                    <div className="text-black flex flex-wrap justify-between text-lg font-bold mb-2">
                                        <div>SUBTOTAL</div>
                                        <div><PakistanCurrency amount={subtotal} /></div>
                                    </div>
                                    <div className="text-center text-[12px]">Shipping, taxes, and discount codes calculated at checkout</div>
                                    <div className="text-black text-2xl border border-black flex items-center justify-center leading-none text-center font-a h-10 hover:text-white hover:bg-black mt-3 transition duration-700">
                                        CHECK OUT
                                    </div>

                                </div>
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default Cart;