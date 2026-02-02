import {
    getProducts,
    ProductResponseType,
} from '../../../../utililties/api/products/getProducts'
import { HeartCrack, Loader } from 'lucide-react'
import useDarkMode from '../../../../utililties/customHook/useDarkMode'
import UpdateParams from '../../../../utililties/helper/updateParams'
import PaginationButton from './paginationButton'
import { handleNextPage } from '../../../../utililties/helper/ProductHelper/handleNextPage'
import { handlePrevPage } from '../../../../utililties/helper/ProductHelper/handlePrevPage'
import { memo, useCallback, useState } from 'react'
import { ModalQuickView } from './ModalQuickView'
import { ProductType } from '../../../../types/productType'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useMySearchParams from '../../../../utililties/customHook/useMySearchParams'
import ProductCard from './ProductCard'

const ProductList = () => {
    // console.time('render')
    // console.count('Product List rendered');

    const { isDarkMode } = useDarkMode()
    const [modalQuickView, setModalQuickView] = useState<boolean>(false)
    const [selectedProductQuickView, setSelectedProductQuickView] =
        useState<ProductType | null>(null)
    const {
        page,
        category,
        subCategory,
        onSearch,
        searchParams,
        setSearchParams,
    } = useMySearchParams()

    // fetching data using react query
    const { data, isLoading, isError } = useQuery<ProductResponseType>({
        queryKey: ['products', page, category, subCategory, onSearch],
        queryFn: () => getProducts(page, category, subCategory, onSearch),
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
        gcTime: 1000 * 60 * 5,
    })

    const pageNumber = Array.from(
        { length: data?.meta.last_page || 1 },
        (_, index) => index + 1
    )
    // handle number nav page
    const handleNumberPage = useCallback(
        (page: number) => {
            UpdateParams({
                searchParams: searchParams,
                newParams: {
                    page: page.toString(),
                    category: category,
                    subCategory: subCategory,
                },
                setSearchParams: setSearchParams,
            })
        },
        [searchParams, category, subCategory, setSearchParams]
    )

    const handleNext = useCallback(() => {
        handleNextPage({
            searchParams,
            page,
            category,
            subCategory,
            setSearchParams,
        })
    }, [searchParams, page, category, subCategory, setSearchParams])

    const handlePrev = useCallback(() => {
        handlePrevPage({
            searchParams,
            page,
            category,
            subCategory,
            setSearchParams,
        })
    }, [searchParams, page, category, subCategory, setSearchParams])

    // console.timeEnd('render')

    return (
        <div className="flex w-full flex-col px-2">
            <div className={`mx-2 mb-20 flex sm:mb-48 md:mb-0`}>
                {isError && (
                    <div className="m-auto rounded bg-red-100 p-3 text-red-800">
                        <p>Failed to load products</p>
                    </div>
                )}
                {isLoading ? (
                    <div className="m-auto">
                        <h1 className="bg-barakaprimary-madder font-krona-one-regular flex items-center gap-2 rounded p-3 text-white">
                            <Loader className="h-10 w-10 animate-spin" />{' '}
                            Loading...
                        </h1>
                    </div>
                ) : (
                    <div className="grid h-fit w-full grid-cols-12">
                        {data?.data.length === 0 ? (
                            <div className="col-span-12">
                                <div
                                    className={`font-poppins-semibold mx-auto mt-28 w-fit rounded-lg p-5 text-center ${isDarkMode ? 'bg-barakaprimary-snow text-barakaprimary-madder' : 'bg-barakaprimary-madder text-white'}`}
                                >
                                    <h1 className="mb-8 flex items-center justify-center gap-5 text-4xl sm:text-5xl">
                                        We're Sorry <HeartCrack size={50} />
                                    </h1>
                                    <p className="text-3xl sm:text-4xl">
                                        Data Not Found
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <ProductCard
                                data={data}
                                setModalQuickView={setModalQuickView}
                                setSelectedProductQuickView={
                                    setSelectedProductQuickView
                                }
                            />
                        )}
                    </div>
                )}
            </div>

            {/* MODAL  */}
            {modalQuickView && (
                <ModalQuickView
                    selectedProductQuickView={selectedProductQuickView}
                    modalQuickView={modalQuickView}
                    setModalQuickView={setModalQuickView}
                />
            )}

            {/* pagination */}
            <PaginationButton
                isDarkMode={isDarkMode}
                isLoading={isLoading}
                data={data}
                pageNumber={pageNumber}
                handleNextPage={handleNext}
                handleNumberPage={handleNumberPage}
                handlePrevPage={handlePrev}
            />
        </div>
    )
}

export default memo(ProductList)
