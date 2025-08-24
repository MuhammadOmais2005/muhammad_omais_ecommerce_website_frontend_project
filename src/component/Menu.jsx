import AuthButtons from "./AuthButtons";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { CiMenuFries } from "react-icons/ci";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"



const data = [
    {
        title: "Unstitched",
        image: "https://www.mariab.pk/cdn/shop/collections/Unstitched_500x.webp?v=1747305335",
        labels: [["Sale", "Lawn"], ["Chiffen", "Linen"], ["Sateen", "Winter Luxe"], ["Luxury Formats", "Pre-falls"]]
    },
    {
        title: "ready to wear",
        image: "https://www.mariab.pk/cdn/shop/collections/RTW_THUMBNAIL_500X500_ce464d65-a334-41af-bc32-9b38985da92d_500x.jpg?v=1752478708",
        labels: [["Sale", "Lawn"], ["Chiffen", "Linen"], ["Sateen", "Winter Luxe"], ["Luxury Formats", "Pre-falls"]]
    },
    {
        title: "kids",
        image: "https://www.mariab.pk/cdn/shop/collections/Kids_500x.jpg?v=1755500226",
        labels: [["Sale", "Lawn"], ["Chiffen", "Linen"], ["Sateen", "Winter Luxe"], ["Luxury Formats", "Pre-falls"]]
    },
    {
        title: "stitched",
        image: "https://www.mariab.pk/cdn/shop/collections/Drop-down_ee2ba4a0-ac35-4987-9bc5-2c324ff62e44_500x.jpg?v=1748341799",
        labels: [["Sale", "Lawn"], ["Chiffen", "Linen"], ["Sateen", "Winter Luxe"], ["Luxury Formats", "Pre-falls"]]
    },
    {
        title: "accessories",
        image: "https://www.mariab.pk/cdn/shop/collections/ACCESSORIES_THUMBNAIL_500X500_a78d4085-b374-420c-acd8-0ec721d92ec4_500x.jpg?v=1746256867",
        labels: [["Sale", "Lawn"], ["Chiffen", "Linen"], ["Sateen", "Winter Luxe"], ["Luxury Formats", "Pre-falls"]]
    },
]



const Menu = () => {

    const [isOpen , setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger><CiMenuFries className="rotate-180" /></SheetTrigger>
                    <SheetContent className="overflow-y-scroll">
                        <SheetHeader>
                            <SheetTitle>
                                <div className="block sm:hidden"><AuthButtons/></div>
                            </SheetTitle>
                            <SheetDescription >
                                <Accordion type="single" collapsible className="sm:mt-0 mt-3">
                                    {
                                        data?.map((currData , index) => {
                                            return (
                                                <AccordionItem value={`item-${index}`}>
                                                    <AccordionTrigger className="font-bold text-md text-black uppercase">{currData.title}</AccordionTrigger>
                                                    <AccordionContent>
                                                        {
                                                            currData.labels.flat().map((currLabel , index)=>{
                                                                return (
                                                                    <div key={index} className="text-black hover:underline hover:font-bold" onClick={()=>{navigate("/products"); setIsOpen(false);}}>{currLabel}</div>
                                                                )
                                                            })
                                                        }
                                                    </AccordionContent>
                                                </AccordionItem>
                                            )
                                        })
                                    }
                                </Accordion>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}
export default Menu;