import { CiLocationOn } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const LargeScreenFooter = () => {

    const info = {
        address: "5.5 KM, Raiwind Road (Near Fatehbad Village) Lahore, Pakistan.",
        phone1: "+923111162742",
        phone2: "+923211224333",
        email: "help@mariab.ae",
    }
    return (
        <>
            <div className="hidden md:grid md:grid-cols-[1fr_1fr] lg:grid-cols-[2fr_1fr_1fr_2fr] gap-5">
                <div className="flex flex-col gap-3 mb-4">

                    <div className="font-bold">Contact</div>
                    <div className="flex items-baseline gap-x-2">
                        <span className="text-xl align-baseline inline-block"><CiLocationOn/></span>
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
                <div className="flex flex-col gap-y-1">
                    <div className="font-bold mb-4">Information</div>
                    <div className="">Return and Exchange</div>
                    <div className="">Privacy Policy</div>
                    <div className="">FAQs</div>
                    <div className="">Store locator</div>
                    <div className="">Track you order</div>
                    <div className="">Blogs</div>
                </div>
                <div className="flex flex-col gap-y-1">
                    <div className="font-bold mb-4">Customer Care</div>
                    <div className="">About Us</div>
                    <div className="">Contact Us</div>
                    <div className="">Careers</div>
                    <div className="">Terms & Condition</div>
                    <div className="">Track you order</div>
                </div>
                <div className="flex flex-col">
                    <div className="font-bold">Sign Up For Our NewsLetter</div>
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

            </div>
        </>
    )
}
export default LargeScreenFooter;