import { useAuth0 } from "@auth0/auth0-react"
import { ClipLoader } from "react-spinners"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { CgProfile } from "react-icons/cg";
import {useState} from "react";

const AuthButtons = ()=>{
    const {
        loginWithRedirect,
        logout,
        isAuthenticated,
        user,
        isLoading,
    } = useAuth0()

    const [isOpen , setIsOpen] = useState(false);

    if (isLoading) return <ClipLoader color="black" size={30} />

    return (
        <div>
            {!isAuthenticated ? (
                <>
                    <div  onClick={() => loginWithRedirect()} className="text-4xl md:text-3xl"><CgProfile/></div>
                </>
            ) : (
                <>

                    <HoverCard open={isOpen} onOpenChange={setIsOpen}>
                        <HoverCardTrigger>
                            <div onClick={()=>setIsOpen(true)}>
                                <Avatar>
                                    <AvatarImage src={user.picture} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent side="bottom" align="end" className="!w-auto">
                            <div className="flex">
                            </div>
                            <div>
                                <div>{user.name}</div>
                                <div>{user.email}</div>
                                <div className="bg-black text-white font-a px-2 text-xl text-center mt-3" onClick={() => logout({ returnTo: window.location.origin })}> <button>
                                    Log Out
                                </button></div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </>
            )}
        </div>
    )
}

export default AuthButtons




