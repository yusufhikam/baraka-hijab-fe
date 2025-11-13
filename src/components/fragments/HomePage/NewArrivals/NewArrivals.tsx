import { ArrowBigRight } from 'lucide-react'
import useDarkMode from '../../../../utililties/customHook/useDarkMode'
import NavLinks from '../../../layouts/Navbars/NavLinks'
import Card from '../../../elements/Card/Card'
import { useQuery } from '@tanstack/react-query'
import { getNewArrivals } from '../../../../utililties/api/products/newArrivals'
import { ProductThumbnailType } from '../../../../types/productType'
import { baseImageUrl } from '../../../../utililties/api/urlBase'
import { Link } from 'react-router-dom'

const NewArrivals = () => {
    const { isDarkMode } = useDarkMode()

    const { data, isLoading, isError } = useQuery<ProductThumbnailType[]>({
        queryKey: ['new-arrivals'],
        queryFn: getNewArrivals,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
    })

    return (
        <div className={`${isDarkMode && 'py-20'} new-arrival-container`}>
            {/* <h1 className="font-poppins-semibold">NEW ARRIVALS</h1> */}
            <div
                id="main-content"
                className={`bg- py-10 ${isDarkMode && 'relative bg-[url(assets/images/bg/bg-newArrival.jpg)]'}`}
            >
                <div
                    className={`${isDarkMode && 'absolute right-0 bottom-0 left-0 h-full backdrop-blur-sm'}`}
                ></div>

                <div className="title mx-5 flex flex-col items-center justify-between gap-y-2 sm:flex-row">
                    <h1
                        className={`font-poppins-semibold z-1 text-center text-3xl sm:text-lg`}
                    >
                        New Arrival Products
                    </h1>

                    <NavLinks
                        to="/shop/products"
                        variant={` flex items-center justify-center gap-1 border rounded-lg p-2  ${isDarkMode && 'hover:text-yellow-400 backdrop-blur bg-white/20 '}`}
                        withPseudoAfter={false}
                    >
                        Show Now{' '}
                        <span>
                            <ArrowBigRight
                                size={20}
                                fill="limegreen"
                                strokeWidth={0}
                            />
                        </span>
                    </NavLinks>
                </div>

                <div className="m-5 flex flex-col gap-5 sm:flex-row">
                    {isError && data?.length === 0 ? (
                        <p className="text-red-500">Something went wrong</p>
                    ) : isLoading ? (
                        [...Array(3)].map((_, i) => {
                            return (
                                <Card
                                    key={i}
                                    variant="relative animate-pulse w-full"
                                >
                                    <div className="h-96 w-full bg-gray-300 sm:h-60 md:h-72"></div>

                                    <div className="absolute bottom-2 left-1/2 h-5 w-11/12 -translate-x-1/2 bg-gray-400 p-3"></div>
                                </Card>
                            )
                        })
                    ) : (
                        data &&
                        data.map((product) => {
                            return (
                                <Link
                                    to={`/shop/product/${product.slug}`}
                                    key={product.id}
                                    className="w-full"
                                >
                                    <Card
                                        variant={`relative  overflow-auto group `}
                                    >
                                        <div
                                            className={`bg- h-96 w-full bg-cover bg-center bg-no-repeat transition-all duration-300 group-hover:scale-110 sm:h-60 md:h-72`}
                                            style={{
                                                backgroundImage: `url(${baseImageUrl}/${product.thumbnail})`,
                                            }}
                                        ></div>
                                        <h1 className="font-krona-one-regular group-hover:bg-barakadark-primary_darker absolute bottom-2 left-1/2 w-11/12 -translate-x-1/2 bg-white p-3 text-center text-black transition-all duration-300 group-hover:text-white">
                                            {product.name}
                                        </h1>
                                    </Card>
                                </Link>
                            )
                        })
                    )}
                </div>

                <div
                    className={`${isDarkMode && 'rounded-lg bg-white/20 backdrop-blur-sm'} mx-5 mt-20 mb-10 border p-3 md:border-none`}
                >
                    <div className={`flex flex-wrap gap-y-20`}>
                        <div className="w-full text-lg md:w-3/4 md:border-t-2 md:border-r-2 md:border-b-2 md:p-5">
                            <p>
                                <b>BARAKA</b> blends tradition, modesty, and
                                modern style in high-quality Muslim clothing.
                                Our collection, from hijab to thobes, empowers
                                individuals with elegant fashion for everyday
                                wear and special occasions
                            </p>
                        </div>

                        <hr className="mx-auto block w-1/2 border-2 md:hidden" />

                        <div className="flex w-full items-center justify-between gap-4 md:w-1/5 md:flex-col md:items-start md:border-t-2 md:border-b-2 md:p-5">
                            <div className="">
                                <h1 className="font-krona-one-regular text-4xl font-bold md:text-xl">
                                    10,000+
                                </h1>
                                <p>Happy Customer Worldwide</p>
                            </div>
                            <NavLinks
                                to="/contact"
                                withPseudoAfter={false}
                                variant="hover:text-barakadark-primary_darker rounded border-2 p-1"
                            >
                                Contact Us
                            </NavLinks>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewArrivals
