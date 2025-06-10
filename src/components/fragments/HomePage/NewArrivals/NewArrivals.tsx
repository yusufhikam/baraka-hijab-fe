import { ArrowBigRight } from "lucide-react";
import useDarkMode from "../../../../utililties/customHook/useDarkMode";
import NavLinks from "../../../layouts/Navbars/NavLinks";
import Card from "../../../elements/Card/Card";
import { useQuery } from "@tanstack/react-query";
import { getNewArrivals } from "../../../../utililties/api/products/newArrivals";
import { ProductThumbnailType } from "../../../../types/productType";
import { baseImageUrl } from "../../../../utililties/api/urlBase";
import { Link } from "react-router-dom";

const NewArrivals = () => {
    const { isDarkMode } = useDarkMode();

    const { data, isLoading, isError } = useQuery<ProductThumbnailType[]>({
        queryKey: ['new-arrivals'],
        queryFn: getNewArrivals,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
    });



    return (
        <div className={`${isDarkMode && 'py-20'} new-arrival-container`} >
            {/* <h1 className="font-poppins-semibold">NEW ARRIVALS</h1> */}
            <div id="main-content" className={` py-10 bg- ${isDarkMode && 'relative bg-[url(assets/images/bg/bg-newArrival.jpg)]'}`} >
                <div className={`${isDarkMode && 'absolute bottom-0 left-0 right-0 backdrop-blur-sm h-full '}`}></div>

                <div className="title flex flex-col sm:flex-row justify-between mx-5 gap-y-2 items-center ">
                    <h1 className={`font-poppins-semibold text-center text-3xl sm:text-lg z-1`}>New Arrival Products</h1>

                    <NavLinks to="/shop/products" isDarkMode={isDarkMode} variant={` flex items-center justify-center gap-1 border rounded-lg p-2  ${isDarkMode && 'hover:text-yellow-400 backdrop-blur bg-white/20 '}`} withPseudoAfter={false}>
                        Show Now <span><ArrowBigRight size={20} fill="limegreen" strokeWidth={0} /></span>
                    </NavLinks>
                </div>

                <div className="grid grid-cols-3 gap-5 m-5">

                    {isError && data?.length === 0 ? <p className="text-red-500">Something went wrong</p> : isLoading ? (
                        [...Array(3)].map((_, i) => {
                            return (
                                <Card key={i} variant="relative animate-pulse flex">
                                    <div className="w-full bg-gray-300 h-64">

                                    </div>

                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 p-3 bg-gray-400 w-11/12"></div>
                                </Card>
                            )
                        })
                    ) : (
                        data && (
                            data.map((product) => {
                                return (
                                    <Link to={`/shop/product/${product.slug}`} key={product.id} className="col-span-3 sm:col-span-1">
                                        <Card variant={`relative  overflow-auto group `}>
                                            <div className={`bg-cover bg-no-repeat bg-center bg- group-hover:scale-110 transition-all duration-300 h-96 sm:h-60 md:h-96 w-full`} style={{ backgroundImage: `url(${baseImageUrl}/${product.thumbnail})` }}>


                                            </div>
                                            <h1 className="absolute bottom-2 left-1/2 -translate-x-1/2 p-3 bg-white w-11/12 text-black text-center font-krona-one-regular group-hover:bg-barakadark-primary_darker group-hover:text-white transition-all duration-300">
                                                {product.name}
                                            </h1>
                                        </Card>
                                    </Link>
                                )
                            })
                        )
                    )}
                </div>

                <div className={`${isDarkMode && 'bg-white/20 backdrop-blur-sm rounded-lg'} mb-10 mt-20 mx-5 p-3 border md:border-none`}>
                    <div className={`flex flex-wrap gap-y-20`}>
                        <div className="w-full md:w-3/4 md:border-r-2 md:border-t-2 md:border-b-2  md:p-5 text-lg">
                            <p><b>BARAKA</b> blends tradition, modesty, and modern style in high-quality Muslim clothing. Our collection, from hijab to thobes, empowers individuals with elegant fashion for everyday wear and special occasions</p>
                        </div>

                        <hr className="block md:hidden w-1/2 border-2 mx-auto" />

                        <div className="w-full  md:border-t-2 md:border-b-2 md:p-5  md:w-1/5  flex md:flex-col justify-between items-center md:items-start gap-4 ">
                            <div className="">
                                <h1 className="text-4xl md:text-xl font-krona-one-regular font-bold">10,000+</h1>
                                <p>Happy Customer Worldwide</p>
                            </div>
                            <NavLinks to="/contact" isDarkMode={isDarkMode} withPseudoAfter={false} variant="hover:text-barakadark-primary_darker rounded border-2 p-1">Contact Us</NavLinks>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewArrivals;