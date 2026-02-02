import { memo, useCallback } from 'react'
import { ProductResponseType } from '../../../../utililties/api/products/getProducts'
import { Link } from 'react-router-dom'
import { baseImageUrl } from '../../../../utililties/api/urlBase'
import Button from '../../../elements/Button/Button'
import useDarkMode from '../../../../utililties/customHook/useDarkMode'
import { handleModalQuickView } from '../../../../utililties/helper/ProductHelper/handleModalQuickView'
import { ProductType } from '../../../../types/productType'

type ProductCardProps = {
    data: ProductResponseType | undefined
    setModalQuickView: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedProductQuickView: (p: ProductType | null) => void
}

const ProductCard = memo(
    ({
        data,
        setModalQuickView,
        setSelectedProductQuickView,
    }: ProductCardProps) => {
        const { isDarkMode } = useDarkMode()

        const handleModalQuick = useCallback(
            (productId: number) => {
                handleModalQuickView(productId, {
                    data,
                    setModalQuickView,
                    setSelectedProductQuickView,
                })
            },
            [data, setModalQuickView, setSelectedProductQuickView]
        )

        return data?.data.map((product) => {
            return (
                <div
                    key={product.id}
                    className={`${data.data.length === 1 && 'col-start-4'} font-poppins-regular col-span-6 mb-4 overflow-hidden border-none p-2 text-center md:col-span-4 lg:col-span-3`}
                >
                    <div className="group relative overflow-hidden">
                        <Link to={`/shop/product/${product.slug}`}>
                            <div className="m-0 overflow-hidden p-0">
                                <img
                                    src={`${baseImageUrl}/${product.thumbnail}`}
                                    alt={product.name}
                                    className="h-56 w-full bg-no-repeat object-cover object-center transition-all duration-300 hover:scale-110 sm:h-72 md:h-56 lg:h-64"
                                />
                            </div>
                        </Link>
                        <div className="absolute bottom-0 w-full text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                            <Button
                                type="button"
                                variant={`absolute -bottom-10 group-hover:bottom-0 left-0 w-full py-2 bg-barakaprimary-madder transition-all duration-300 ${isDarkMode ? 'hover:bg-white hover:text-barakaprimary-madder' : 'hover:bg-gray-900 hover:text-white'}`}
                                title="Quick View"
                                onClick={() => handleModalQuick(product.id)}
                            >
                                <h1 className="font-poppins-semibold">
                                    QUICK VIEW
                                </h1>
                            </Button>
                        </div>
                    </div>
                    <p className="font-krub-regular mt-5 text-sm opacity-40">
                        {product.sub_category.name}
                    </p>
                    <p className="font-semibold">
                        {product.name.toUpperCase()}
                    </p>
                    <p className="font-semibold">
                        {Intl.NumberFormat('en-EN', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                        }).format(product.price)}
                    </p>
                </div>
            )
        })
    }
)

export default ProductCard
