import React, { useState } from "react"
import SideBar from "../../../layouts/SideBar/SideBar"
import { CategoryType } from "../../../../types/categoryType"
import Button from "../../../elements/Button/Button"
import { ChevronDown, ChevronRight, Loader } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import getCategories from "../../../../utililties/api/categories/getCategories"
import getSubCategories from "../../../../utililties/api/categories/getSubCategories"
import { SubCategoryType } from "../../../../types/subCategoryType"
import { useSearchParams } from "react-router-dom"
import UpdateParams from "../../../../utililties/helper/updateParams"

type SideBarCategoryProps = {
    showSideBar: boolean,
    setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>,
    isDarkMode: boolean,
}

const SideBarCategory: React.FC<SideBarCategoryProps> = ({ showSideBar, setShowSideBar, isDarkMode }: SideBarCategoryProps) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [showSubCategoriesId, setShowSubCategoriesId] = useState<number[]>([]);

    const handleToggleDropDownCategory = (id: number) => {
        if (showSubCategoriesId.includes(id)) {
            setShowSubCategoriesId(showSubCategoriesId.filter((item) => item !== id))
        } else {
            setShowSubCategoriesId([...showSubCategoriesId, id])
        }
    }

    const handleSelectCategory = (categoryName: string) => {
        UpdateParams({
            searchParams: searchParams,
            newParams: {
                category: categoryName,
                subCategory: '',
                page: '1'
            },
            setSearchParams: setSearchParams
        })
    }

    const handleSelectSubCategory = (subCategoryName: string, categoryName: string) => {
        UpdateParams({
            searchParams: searchParams,
            newParams: {
                category: categoryName,
                subCategory: subCategoryName,
                page: '1'
            },
            setSearchParams: setSearchParams
        })
    }

    // fetch categories
    const { data, isLoading, isError } = useQuery<CategoryType[]>({
        queryKey: ['categories'],
        queryFn: getCategories,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5
    });

    // fetch sub categories
    const { data: subCategories } = useQuery<SubCategoryType[]>({
        queryKey: ['subcategories'],
        queryFn: getSubCategories,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5
    });


    return (
        // data && data?.length !== 0 && (

        <div className="relative  md:w-1/4 z-1 font-krub-regular">

            {showSideBar && <Button type="button" variant={`fixed md:hidden top-[240px] left-1/2 transition-all duration-500 z-1 w-10 h-10 rounded-full hover:bg-barakaprimary-dessert hover:text-white ${isDarkMode ? 'bg-gray-300 text-barakaprimary-madder' : 'bg-barakaprimary-madder text-barakaprimary-snow'} ${showSideBar
                ? 'opacity-100 translate-x-[-50%] pointer-events-auto'
                : 'opacity-0 translate-x-[-150%] pointer-events-none'}`} onClick={() => setShowSideBar(!showSideBar)}>
                <i className="pi pi-times"></i></Button>}

            <SideBar variant={`fixed max-h-[300px] overflow-y-scroll scrollbar-hide md:max-h-full md:static w-1/2 md:w-full md:rounded-none transition-all duration-300 py-5 rounded-tr-lg rounded-br-lg ease-in-out ${isDarkMode ? 'bg-barakaprimary-madder md:bg-inherit' : 'md:bg-inherit bg-gray-300 text-black'} ${showSideBar ? 'opacity-100 translate-x-0 pointer-events-auto ' : ' opacity-0 -translate-x-full pointer-events-none'} px-3`}>


                {isError && <p className='text-red-500'>Something went wrong</p>}

                {isLoading ? (
                    <Loader className="animate-spin m-auto w-10 h-10" />
                ) : (
                    data && data.map((category) => {
                        return (
                            <div className={`relative  pb-2 ${!showSubCategoriesId.includes(category.id) && `border-b-2 ${isDarkMode ? 'border-white' : 'border-black'}`} `} key={category.id}>
                                <div className="">
                                    {/* CATEGORY */}
                                    <Button type="button" variant={`mb-1 ${isDarkMode ? 'hover:text-yellow-500' : 'hover:text-barakaprimary-madder '}`} onClick={() => handleSelectCategory(category.name)}>{category.name}</Button>

                                    {showSubCategoriesId.includes(category.id) && subCategories && (
                                        subCategories.map((subCategory) => {
                                            if (subCategory.category.id === category.id) {
                                                return (
                                                    <div className="relative ms-4 transition-all duration-300" key={subCategory.id}>

                                                        <div className={`absolute border h-6 left-0 ${isDarkMode ? 'border-white' : 'border-black'}`}></div>

                                                        <Button type="button" key={subCategory.id} variant={`ms-2 ${isDarkMode ? 'hover:text-yellow-500' : 'hover:text-barakaprimary-madder text-black'}`} onClick={() => handleSelectSubCategory(subCategory.name, category.name)}>{subCategory.name}</Button>
                                                    </div>
                                                )
                                            }
                                        })
                                    )}
                                </div>

                                <Button type="button" variant="absolute right-0 top-0 hover:text-barakaprimary-dessert" onClick={() => handleToggleDropDownCategory(category.id)}>
                                    {showSubCategoriesId.includes(category.id) ? <ChevronDown /> : <ChevronRight />}
                                </Button>
                            </div>
                        )
                    })
                )}
            </SideBar>
        </div>
        // )
    )
}

export default SideBarCategory;