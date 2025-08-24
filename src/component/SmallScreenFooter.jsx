import { CiLocationOn } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const info = {
    address: "5.5 KM, Raiwind Road (Near Fatehbad Village) Lahore, Pakistan.",
    phone1: "+923111162742",
    phone2: "+923211224333",
    email: "help@mariab.ae",
}

const SmallScreenFooter = () => {

    return (
        <>
            <div className="md:hidden block">

                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger><div className="">Contact</div></AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-3">

                                <div className="flex items-baseline gap-x-2">
                                    <span className="text-xl align-baseline inline-block"><CiLocationOn /></span>
                                    <span>{info.address}</span>
                                </div>

                                <div className="flex flex-wrap items-center  gap-x-2">
                                    <div className="text-xl"><FaPhoneAlt /></div>
                                    <div>{info.phone1}</div>
                                    <div>{info.phone2}</div>
                                </div>
                                <div className="flex flex-wrap items-center  gap-x-2">
                                    <span className="text-xl"><MdEmail /></span>
                                    <div>{info.email}</div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger><div>Information</div></AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-y-1">
                                <div className="">Return and Exchange</div>
                                <div className="">Privacy Policy</div>
                                <div className="">FAQs</div>
                                <div className="">Store locator</div>
                                <div className="">Track you order</div>
                                <div className="">Blogs</div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger><div>Customer Care</div></AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-y-1">
                                <div className="">About Us</div>
                                <div className="">Contact Us</div>
                                <div className="">Careers</div>
                                <div className="">Terms & Condition</div>
                                <div className="">Track you order</div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Sign Up For Our NewsLetter</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col">
                                <div className="">
                                    <div className="grid grid-cols-[5fr_2fr]  my-5">
                                        <input type="email" className="py-2 px-2 border-1 border-gray-300 text-black" placeholder="Enter you email" />
                                        <div className="font-bold  bg-black cursor-pointer text-white flex justify-center items-center text-md px-3">SUBSCRIBE</div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap text-2xl gap-x-4">
                                    <div><FaSquareFacebook /></div>
                                    <div><FaInstagramSquare /></div>
                                    <div><FaTiktok /></div>
                                    <div><FaYoutube /></div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    )
}
export default SmallScreenFooter;