import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addFilteredProducts } from "@/Slices/productsSlice";
import { FaSquare } from "react-icons/fa";
import { IoIosRadioButtonOn } from "react-icons/io";
import PakistanCurrency from "./PakistanCurrency";
import { FaFilter } from "react-icons/fa6";


const Filter = () => {
    const dispatch = useDispatch();
    const { originalProducts, products } = useSelector((state) => {
        return state.products
    });

    // Sizes

    const sizes = ["XS", "S", "M", "L", "XL"]

    const sizes_qty = sizes.map((currSize) => {
        const c = originalProducts.reduce((accum, currProduct) => {
            if (currProduct.size.hasOwnProperty(currSize)) {
                return accum = accum + currProduct.size[currSize]
            } else {
                return accum = accum
            }
        }, 0)
        return c
    });

    // Colors

    let size_qty = {}
    sizes.map((currSize, index) => {
        size_qty = { ...size_qty, [currSize]: sizes_qty[index] }
    })


    const colors = originalProducts.map((currProduct) => {
        return (
            currProduct.color
        )
    })

    const unique_color = [...new Set([...colors])]

    const colors_qty = unique_color.map((currColor) => {
        const d = colors.reduce((accum, clr) => {
            if (clr === currColor) {
                return accum = accum + 1
            } else {
                return accum
            }
        }, 0)
        return d;
    })


    let color_qty = {};
    unique_color.map((currColor, index) => {
        color_qty = { ...color_qty, [currColor]: colors_qty[index] }
    })

    let size_selection = {};
    sizes.map((currSize) => {
        size_selection = { ...size_selection, [currSize]: false }
    })



    const [sizeSelection, setSizeSelection] = useState(size_selection)

    const changeSizeSelection = (size) => {
        const newSizeSelection = { ...sizeSelection, [size]: !sizeSelection[size] }
        size_selection = newSizeSelection
        setSizeSelection(newSizeSelection)
        console.log(size_selection)
    }



    let color_selection = unique_color.reduce((accum, currColor) => {
        return accum = { ...accum, [currColor]: false }
    }, {})

    const [colorSelection, setColorSelection] = useState(color_selection)




    const changeColorSelection = (color) => {
        const newColorSelection = { ...colorSelection, [color]: !colorSelection[color] }
        setColorSelection(newColorSelection)
        color_selection = newColorSelection
        console.log(color_selection)
    }


    const prices = originalProducts?.map(product => product.price) || [];

    const [priceFilter, setPriceFilter] = useState(false)

    const maxPrice = prices.length ? Math.max(...prices) : 1000;
    const minPrice = prices.length ? Math.min(...prices) : 0;

    const [price, setPrice] = useState(minPrice);


    useEffect(() => {
        if (prices.length) {
            setPrice(maxPrice);
        }
    }, [originalProducts]);




    const priceChange = (event) => {
        setPrice(Number(event.target.value))
    }

    const [filters, setFilters] = useState(false);

    const filter = () => {
        const unfilteredData = originalProducts && [...originalProducts]

        let filteredData = [];

        const priceFilteredData = unfilteredData.filter((currProduct) => {
            if (currProduct.price <= price) {
                return true
            }
        })
        filteredData = priceFilteredData;

        const isColorSelected = Object.entries(colorSelection).every(([key, value]) => {
            return value === false
        })

        if (!isColorSelected) {
            const colorFilteredData = filteredData?.filter((currProduct) => {

                return unique_color.some((currColor) => {
                    return colorSelection[currColor] && currProduct.color === currColor
                })
            })
            filteredData = [...colorFilteredData]

        }

        const isSizeSelected = Object.entries(sizeSelection).every(([key, value]) => {
            return value === false
        })

        if (!isSizeSelected) {
            const sizeFilteredData = filteredData?.filter((currProduct) => {
                return sizes.some((currSize) => {
                    return sizeSelection[currSize] && currProduct.size.hasOwnProperty(currSize)
                })
            })
            filteredData = [...sizeFilteredData]

        }

        const uniqueSizeColorFilteredData = filteredData.reduce((accum, currProduct) => {
            const a = accum?.some((currP) => {
                return (currP.id === currProduct.id)
            })
            if (!a) {
                return accum = [...accum, currProduct]
            } else {
                return accum
            }
        }, []);


        dispatch(addFilteredProducts(uniqueSizeColorFilteredData))

    }
    useEffect(() => {
        // const isSizeSelected = Object.entries(sizeSelection).every(([key,value])=>{
        //     return value === false
        // })
        // const isColorSelected = Object.entries(colorSelection).every(([key,value])=>{
        //     return value === false
        // })
        // const isPriceSelected = price === maxPrice
        // if(isSizeSelected && isColorSelected && isPriceSelected){
        //     return;
        // }
        if (originalProducts && filters) {
            filter();

        }

    }, [colorSelection, sizeSelection, price, filters]);


    // useEffect(()=>{
    //     if(products.length <= 0){
    //         const priceFilteredData = [...originalProducts].filter((currProduct) => {
    //             if (currProduct.price <= price) {
    //                 return true
    //             }
    //         }) 
    //         dispatch(addFilteredProducts(priceFilteredData))
    //     }else{
    //         const priceFilteredData = [...].filter((currProduct) => {
    //             if (currProduct.price <= price) {
    //                 return true
    //             }
    //         }) 
    //         dispatch(addFilteredProducts(priceFilteredData))
    //     }
    // },[price]);

    const clearFilter = () => {

        const color_selection = unique_color.reduce((accum, currColor) => {
            return accum = { ...accum, [currColor]: false }
        }, {});

        
        const size_selection =  sizes.reduce((accum , currSize) => {
            return {...accum , [currSize] : false}
            
        },{})

        setSizeSelection(size_selection);
        setColorSelection(color_selection);
        setPrice(maxPrice);

    };



    return (
        <>
            <Sheet onOpenChange={(open) => setFilters(
                open)}>
                <SheetTrigger><div className="flex place-items-center text-sm sm:text-xl gap-x-3"><span>Filters</span> <FaFilter /></div></SheetTrigger>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle><div className="border-b-1 border-black py-3 font-a text-2xl">Filters</div></SheetTitle>
                        <SheetDescription>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger><div className="text-xl text-black font-a decoration-black">Price</div></AccordionTrigger>
                                    <AccordionContent>
                                        <div>
                                            <div className="text-black font-bold text-right"><PakistanCurrency amount={price} /></div>
                                            <input type="range" max={maxPrice} min={minPrice} className="w-full range-slider" value={Number(price)} onChange={(event) => { priceChange(event) }} />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger><div className="text-xl text-black font-a">Size</div></AccordionTrigger>
                                    <AccordionContent>
                                        {
                                            Object.entries(size_qty).map(([key, value], index) => (
                                                <div key={index} className={`font-b items-center flex-wrap flex text-black ${sizeSelection[key] ? "font-bold" : ""}`} onClick={() => { changeSizeSelection(key) }}>
                                                    <span className={`me-2 ${sizeSelection[key] ? "visible" : "invisible"}`}><IoIosRadioButtonOn /></span> <span>{key} ({value})</span>
                                                </div>
                                            ))
                                        }
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-xl text-black font-a">Color</AccordionTrigger>
                                    <AccordionContent>
                                        {
                                            Object.entries(color_qty).map(([key, value], index) => (
                                                <div key={index} className={`hover:underline text-black flex flex-wrap items-center font-b ${colorSelection[key] ? "font-bold" : ""}`} onClick={() => { changeColorSelection(key) }}>
                                                    <span className={`me-2 ${colorSelection[key] ? "visible" : "invisible"}`}><IoIosRadioButtonOn /></span> <span>{key} ({value})</span>
                                                </div>
                                            ))

                                        }
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>


                            <div onClick={clearFilter} className="text-xl sm:text-3xl font-a  text-black border-1 border-black hover:bg-black hover:text-white  flex place-content-center">
                                CLEAR FILTER
                            </div>

                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    )
}
export default Filter;