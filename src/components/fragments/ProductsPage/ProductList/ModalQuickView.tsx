import { X } from 'lucide-react'
import Button from '../../../elements/Button/Button'
import React, { memo, useState } from 'react'
import { ProductType } from '../../../../types/productType'
import CarouselProductPhotos from '../DetailProduct/CarouselProductPhotos'
import { Link } from 'react-router-dom'
import { Quantity } from '../../../elements/Quantity/Quantity'
import { handleAddToCart } from '../../../../utililties/helper/ProductHelper/handleAddToCart'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { QuantityErrorMessage } from '../../../elements/Quantity/QuantityErrorMessage'
import { useAuth } from '../../../../utililties/customHook/useAuth'
import { useCart } from '../../../../utililties/customHook/useCart'
import Modal from '../../../elements/Modal/Modal'

export type ModalQuickViewProps = {
    setModalQuickView: React.Dispatch<React.SetStateAction<boolean>>
    modalQuickView: boolean
    selectedProductQuickView: ProductType | null
}

export const ModalQuickView = memo(
    ({
        setModalQuickView,
        modalQuickView,
        selectedProductQuickView,
    }: ModalQuickViewProps) => {
        // console.count('ModalQuickView rendered')
        const { isAuthenticated } = useAuth()
        const { refreshCartData } = useCart()

        const [quantity, setQuantity] = useState<Record<number, number>>({})
        const [quantityError, setQuantityError] = useState<string | null>(null)

        if (!selectedProductQuickView) return null

        const SweetAlert = withReactContent(Swal)

        return (
            <Modal
                isOpen={modalQuickView}
                onClose={() => setModalQuickView(false)}
                animationType="scale"
                variant={`fixed top-1/2 z-2 right-1/2 sm:backdrop-blur-sm sm:bg-black/50 -translate-y-1/2 translate-x-1/2 w-full h-full flex justify-center transition-all duration-300 `}
            >
                <Button
                    type="button"
                    variant="absolute top-2 z-2 text-black hover:text-white sm:text-white right-2 rounded-full hover:bg-barakaprimary-madder transition-all duration-200"
                    onClick={() => setModalQuickView?.(false)}
                >
                    <X size={40} />
                </Button>

                <div className="scrollbar-hide my-auto grid h-full max-h-full w-full grid-cols-12 gap-y-10 overflow-y-scroll bg-gray-100 sm:h-[80%] sm:w-[90%] md:h-[90%]">
                    <div className="carousel-product-images col-span-12 my-auto place-items-center pt-10 lg:col-span-7 lg:overflow-hidden">
                        <CarouselProductPhotos
                            data={selectedProductQuickView}
                            variant="w-[80%]  md:w-[80%]"
                        />
                    </div>

                    <div className="product-info scrollbar-hide col-span-12 p-3 lg:col-span-5 lg:max-h-full lg:overflow-y-scroll">
                        <div className="mb-2">
                            <p className="flex gap-1 text-xs text-black/30">
                                Categories:
                                <Link
                                    to={`/shop/products?page=1&category=${selectedProductQuickView.sub_category.category.name}`}
                                    className="hover:text-black"
                                >
                                    {
                                        selectedProductQuickView.sub_category
                                            .category.name
                                    }
                                </Link>
                                /
                                <Link
                                    to={`/shop/products?page=1&subCategory=${selectedProductQuickView.sub_category.name}`}
                                    className="hover:text-black"
                                >
                                    {selectedProductQuickView.sub_category.name}
                                </Link>
                            </p>
                        </div>
                        <h1 className="mb-2 text-2xl font-bold text-black">
                            {selectedProductQuickView.name}
                        </h1>

                        <p className="font-krub-regular text-3xl text-black">
                            {Intl.NumberFormat('en-EN', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0,
                            }).format(selectedProductQuickView.price)}
                        </p>

                        <div className="my-5 w-full border-b border-black/50" />

                        <p className="font-poppins-bold mb-2 text-black">
                            Description
                        </p>
                        <div className="scrollbar-hide mb-5 overflow-y-scroll md:h-[260px] md:max-h-72">
                            <p className="text-black">
                                {selectedProductQuickView.description}
                            </p>
                        </div>

                        <div className="font-krub-regular mb-2" style={{}}>
                            <p className="font-poppins-bold mb-2 text-black">
                                Variants
                            </p>

                            <div
                                className={`flex flex-col gap-y-5 ${modalQuickView ? 'block' : 'hidden'}`}
                            >
                                {selectedProductQuickView.product_variants.map(
                                    (variant) => (
                                        <div
                                            key={variant.id}
                                            className={`relative flex flex-col justify-between gap-5 rounded-lg p-3 sm:flex-row`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <p className="text-black">
                                                    Color
                                                </p>
                                                <div
                                                    className="h-6 w-6 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            variant.color,
                                                    }}
                                                ></div>
                                                <p className="text-black">
                                                    Size
                                                </p>
                                                <p
                                                    className={`w-fit bg-black px-2 py-1 text-white`}
                                                >
                                                    {variant.size}
                                                </p>
                                            </div>

                                            <Quantity
                                                variant="sm:w-fit w-full"
                                                quantity={quantity}
                                                setQuantity={setQuantity}
                                                productVariant={variant}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {quantityError && (
                            <QuantityErrorMessage
                                quantityError={quantityError}
                            />
                        )}

                        {/* button add to cart */}
                        <Button
                            type="button"
                            variant={`w-full py-2 mt-5  transition-all duration-300 hover:bg-barakaprimary-madder bg-gray-900 text-white`}
                            onClick={() =>
                                handleAddToCart(SweetAlert, {
                                    selectedProductQuickView,
                                    quantity,
                                    setQuantity,
                                    setQuantityError,
                                    isAuthenticated,
                                    refreshCartData,
                                })
                            }
                        >
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
)
