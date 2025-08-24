import RecentProducts from "@/component/RecentProducts";
import HeroSection from "@/component/HeroSection";
import Collection from "@/component/Collection";
import New from "@/component/New";
const Home = () => {

    return (
        <>
            <div className="2xl:container 2xl:mx-auto mx-3 sm:mx-5">
                <HeroSection />
                <div className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl  md:text-5xl font-bold font-a my-3 md:my-5 xl:my-7">SHOP BY COLLECTION</div>
                <Collection />
                <div className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl  md:text-5xl font-bold font-a my-3 md:my-5 xl:my-7">WHAT'S NEW</div>
                <New />
                <div className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl  md:text-5xl font-bold font-a my-3 md:my-5 xl:my-7">RECENTLY VIEWED PRODUCTS</div>
                <RecentProducts />
            </div>
        </>

    )
}
export default Home;