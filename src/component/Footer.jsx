import LargeScreenFooter from "./LargeScreenFooter";
import SmallScreenFooter from "./SmallScreenFooter";

const Footer = () => {
    return (
        <>
            <div className="2xl:container 2xl:mx-auto mx-3 sm:mx-5 mt-5">
                <LargeScreenFooter />
                <SmallScreenFooter/>
            </div>

        </>
    )
}
export default Footer;