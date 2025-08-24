import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const DropDown = ({ data , side , align}) => {
    return (
        <>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger><div className="md:text-md xl:text-lg 2xl:text-xl font- uppercase cursor-pointer hover:font-bold transition hover:underline duration-700">{data?.title}</div></DropdownMenuTrigger>
                    <DropdownMenuContent side={side} align={align} className="cursor-pointer rounded-none dropshadow-6xl bg-white/60 mt-5 backdrop-blur-xl filter">
                        <div className="flex flex-wrap p-3">
                            <div className="w-60"><img src={data?.image} /></div>
                            <div className="flex flex-col">
                                <div className="flex flex-col justify-between ps-5">
                                    {
                                        data?.labels?.map((currLabel, index) => {
                                            return (
                                                <div key={index} className="grid grid-cols-2 text-lg w-90 py-3 border-b-1 border-gray-500 font-b">
                                                    <div className="hover:font-bold">{currLabel[0]}</div>
                                                    <div className="hover:font-bold">{currLabel[1]}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}
export default DropDown;