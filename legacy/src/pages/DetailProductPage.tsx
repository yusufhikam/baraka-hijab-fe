import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getDetailProduct } from '../utililties/api/products/getDetailProduct'
import Button from '../components/elements/Button/Button'
import useDarkMode from '../utililties/customHook/useDarkMode'
import { baseImageUrl } from '../utililties/api/urlBase'
import CarouselProductPhotos from '../components/fragments/ProductsPage/DetailProduct/CarouselProductPhotos'
import { useState } from 'react'
import { PhotosType } from '../types/productPhoto'
import NotFound from './404'
import LoaderDetailProduct from '../components/fragments/ProductsPage/DetailProduct/LoaderDetailProduct'
import { Quantity } from '../components/elements/Quantity/Quantity'
import { handleAddToCart } from '../utililties/helper/ProductHelper/handleAddToCart'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { QuantityErrorMessage } from '../components/elements/Quantity/QuantityErrorMessage'
import { useAuth } from '../utililties/customHook/useAuth'
import { useCart } from '../utililties/customHook/useCart'
import { Loader2 } from 'lucide-react'
import Breadcrumb from '../components/fragments/Breadcrumb/BreadcrumbForProductPage'

const DetailProductPage = () => {
    const { isAuthenticated } = useAuth()
    const { slug } = useParams()
    const { refreshCartData } = useCart()

    const { isDarkMode } = useDarkMode()
    const [selectedPhoto, setSelectedPhoto] = useState<PhotosType | null>(null)
    const [quantity, setQuantity] = useState<Record<number, number>>({})
    const [quantityError, setQuantityError] = useState<string | null>(null)
    const [isLoadingQuantity, setIsLoadingQuantity] = useState<boolean>(false)
    const SweetAlert = withReactContent(Swal)

    const { data, isLoading, isError } = useQuery({
        queryKey: ['detailProduct', slug],
        queryFn: () => getDetailProduct(slug),
        enabled: !!slug, // query hanya jalan jika slug ada (bukan undefined/null)
    })

    const handleSelectedPhoto = (id: number) => {
        const photo = data?.photos.find((item) => item.id === id)
        if (photo) {
            setSelectedPhoto(photo)
        }
    }

    if (isError) return <NotFound />

    return (
        <div className="relative mt-10">
            <Breadcrumb
                dinamicParams={data?.name.toLocaleUpperCase()}
                variant="my-5"
            />
            <div className="detail-container flex flex-wrap justify-evenly gap-5">
                {isLoading && <LoaderDetailProduct />}
                {data && (
                    <>
                        {/* product images @media screen max-width: 768px */}
                        <div className="product-images hidden h-[80vh] gap-3 lg:flex lg:basis-3/5">
                            <div className="active-photo basis-10/12">
                                {selectedPhoto ? (
                                    <img
                                        src={`${baseImageUrl}/${selectedPhoto.photo}`}
                                        className="h-[80vh] w-full object-cover object-center"
                                        alt={data.name}
                                    />
                                ) : (
                                    <img
                                        src={`${baseImageUrl}/${data.photos[0].photo}`}
                                        className="h-[80vh] w-full object-cover object-center"
                                        alt={data.name}
                                    />
                                )}
                            </div>

                            <div className="nav-photo scrollbar-hide flex max-h-[40vh] basis-1/5 flex-col gap-y-3 md:max-h-[80vh] md:overflow-y-scroll">
                                {data.photos.map((photo) => (
                                    <img
                                        key={photo.id}
                                        src={`${baseImageUrl}/${photo.photo}`}
                                        className="hover:cursor-pointer"
                                        alt={data.name}
                                        onClick={() =>
                                            handleSelectedPhoto(photo.id)
                                        }
                                    />
                                ))}
                            </div>
                        </div>

                        {/* product images @media-screen max-width: 642px */}
                        <CarouselProductPhotos
                            data={data}
                            variant="block w-full lg:hidden px-10 sm:px-20 md:px-40"
                        />

                        <div className="product-info font-krona-one-regular w-full p-5 lg:basis-1/3 lg:p-0">
                            <h1 className="mb-2 text-2xl">{data.name}</h1>
                            <p className="font-krub-regular text-xl">
                                {Intl.NumberFormat('en-EN', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,
                                }).format(data.price)}
                            </p>
                            <hr className="my-5" />

                            <p className="font-krub-bold mb-2">Description</p>

                            <div
                                className="scrollbar-hide font-krub-regular mb-2 overflow-y-scroll md:h-[150px] md:max-h-72"
                                style={{}}
                            >
                                <p>{data.description}</p>
                            </div>

                            <div className="mt-5">
                                <p className="font-krub-bold mb-2">
                                    Product Variants
                                </p>
                                {data.product_variants.map((variant) => (
                                    <div
                                        key={variant.id}
                                        className="my-8 flex flex-wrap items-center justify-between gap-8 border border-gray-400 p-3 sm:border-none"
                                    >
                                        <div className="font-poppins-regular flex items-center gap-2 sm:text-xs">
                                            <p>Color</p>
                                            <div
                                                className="h-6 w-6 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        variant.color,
                                                }}
                                            ></div>
                                            <p>Size</p>
                                            <p
                                                className={`w-fit px-1 py-1 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
                                            >
                                                {variant.size}
                                            </p>
                                        </div>
                                        <Quantity
                                            quantity={quantity}
                                            setQuantity={setQuantity}
                                            variant="sm:w-fit w-full "
                                            productVariant={variant}
                                        />
                                    </div>
                                ))}
                            </div>

                            {quantityError && (
                                <QuantityErrorMessage
                                    quantityError={quantityError}
                                />
                            )}

                            <Button
                                type="button"
                                disabled={isLoadingQuantity && true}
                                variant={`w-full py-2 mt-5 flex items-center justify-center  transition-all duration-300 ${isLoadingQuantity && 'cursor-wait opacity-50 hover:bg-black'} ${isDarkMode ? 'bg-barakaprimary-snow text-black hover:text-white hover:bg-barakaprimary-madder' : 'hover:bg-barakaprimary-madder bg-gray-900 text-white'}`}
                                onClick={() =>
                                    handleAddToCart(SweetAlert, {
                                        quantity,
                                        setQuantity,
                                        selectedProductQuickView: data,
                                        // quantityError,
                                        setQuantityError,
                                        isAuthenticated,
                                        refreshCartData,
                                        setIsLoadingQuantity,
                                    })
                                }
                            >
                                {isLoadingQuantity ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    'Add To Cart'
                                )}
                            </Button>
                        </div>
                    </>
                )}
            </div>

            <div className="font-poppins-regular m-10 flex flex-wrap items-center justify-center gap-y-5 py-5 md:justify-between">
                <h1 className="text-3xl md:basis-3/5">
                    Explore Similar Styles
                </h1>
                <div className="flex flex-col gap-y-5 py-2 md:basis-1/3 md:justify-start">
                    <p className="text-xs">
                        ELEGANT{' '}
                        {data?.sub_category.category.name.toLocaleUpperCase()}{' '}
                        {data?.sub_category.name.toLocaleUpperCase()} AND
                        DRESSES - COMFORT, QUALITY, AND TIMELESS STYLE, FIND
                        YOUR FAVORITE TODAY!
                    </p>
                    <Button
                        type="button"
                        variant={`w-fit mx-auto md:mx-0 outline outline-1 outline-offset-0 hover:outline-0 py-4 px-6  transition-all duration-200 ${isDarkMode ? 'hover:bg-barakaprimary-madder outline-gray-200' : 'hover:bg-gray-900 hover:text-white outline-gray-900'}`}
                    >
                        See More Product
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DetailProductPage
