import { useCallback, useEffect, useState } from 'react'
import ProductList from '../components/fragments/ProductsPage/ProductList/ProductList'
import Button from '../components/elements/Button/Button'
import useDarkMode from '../utililties/customHook/useDarkMode'
import SearchInput from '../components/elements/SearchInput/SearchInput'
import useWindowResize from '../utililties/customHook/useWindowResize'
import SideBarCategory from '../components/fragments/ProductsPage/SideBarCategory/SideBarCategory'
import Breadcrumb from '../components/fragments/Breadcrumb/BreadcrumbForProductPage'
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { getProducts, ProductResponseType } from "../utililties/api/products/getProducts";
import useMySearchParams from '../utililties/customHook/useMySearchParams'

export default function ProductsPage() {
    const { isDarkMode } = useDarkMode()
    const [showSideBar, setShowSideBar] = useState<boolean>(false)
    const { searchParams, setSearchParams } = useMySearchParams()
    const [terms, setTerms] = useState('') //state search product

    const handleResize = useCallback(() => {
        if (window.innerWidth > 768) {
            setShowSideBar(true)
        }
    }, [])

    useWindowResize(handleResize)

    // searching data
    useEffect(() => {
        const timeout = setTimeout(() => {
            const newParams = new URLSearchParams(searchParams)
            const currentSearch = newParams.get('search')

            if (terms && terms !== currentSearch) {
                newParams.set('search', terms)
                newParams.set('page', '1')
                setSearchParams(newParams)
            } else if (!terms && currentSearch) {
                newParams.delete('search')
                setSearchParams(newParams)
            }
        }, 500)

        return () => clearTimeout(timeout)
    }, [terms, searchParams, setSearchParams])

    // monitoring render performance
    useEffect(() => {
        // monitoring render performance
        const startTime = performance.now()
        return () => {
            const renderTime = performance.now() - startTime
            if (renderTime > 100) {
                console.warn('Slow render detected:', renderTime, 'ms')
            }
        }
    }, [])

    return (
        <div className="relative flex flex-col py-10">
            <div className="mx-5 flex flex-col items-center sm:flex-row">
                <Breadcrumb variant="order-1 sm:order-0" />
                {/* SEARCH */}
                <SearchInput
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    isDarkMode={isDarkMode}
                    variant=" w-full sm:w-1/2 sm:ms-auto mx-5 mb-5 border"
                    variant_input="h-10"
                />
            </div>

            {/* BUTTON SIDE BAR */}
            <Button
                type="button"
                title="Product List"
                variant={`p-3 w-fit md:hidden mb-5 transition-all duration-300
                ${showSideBar && '-translate-x-full opacity-0 pointer-events-none'}
                ${isDarkMode ? 'bg-barakaprimary-madder text-barakaprimary-snow' : 'bg-barakaprimary-madder text-barakaprimary-snow'}`}
                onClick={() => setShowSideBar(!showSideBar)}
            >
                <i className={`pi pi-align-left text-2xl`}></i>
            </Button>

            {/* Main Content */}
            <div className="flex h-full">
                {/* SIDE BAR PRODUCT NAV */}

                <SideBarCategory
                    isDarkMode={isDarkMode}
                    showSideBar={showSideBar}
                    setShowSideBar={setShowSideBar}
                />

                {/* Main Content */}

                <ProductList />
            </div>
        </div>
    )
}
