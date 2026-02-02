import { memo } from "react";
import { ProductResponseType } from "../../../../utililties/api/products/getProducts";
import Button from "../../../elements/Button/Button";

type PaginationButtonProps = {
    data?: ProductResponseType,
    isLoading: boolean,
    isDarkMode: boolean,
    handlePrevPage: () => void,
    handleNextPage: () => void,
    handleNumberPage: (page: number) => void,
    pageNumber: number[]
}

const PaginationButton = memo(({data, isLoading, isDarkMode, handleNextPage,handlePrevPage, handleNumberPage, pageNumber}: PaginationButtonProps) => {
    return (
        !isLoading && data?.data.length !== 0 && (

            <div className="flex justify-center items-center w-full gap-2 text-white my-10 font-krona-one-regular ">
                <Button type="button" variant={`py-1 px-2 rounded-lg 
                    ${isDarkMode ? 'bg-barakaprimary-snow text-black' : 'bg-gray-900'}
                    ${data?.meta.current_page === 1 && 'opacity-50 cursor-not-allowed'}`} disabled={data?.meta.current_page === 1} onClick={handlePrevPage}>Prev</Button>

                {pageNumber.map((page) => (

                    <Button key={page} type="button" variant={`py-1 px-2 rounded-lg border-2
                        ${page === data?.meta.current_page ?
                            `${isDarkMode ? 'bg-barakaprimary-snow border-0 text-barakaprimary-madder' : 'bg-barakaprimary-madder border-0'}` :
                            `border-barakaprimary-madder ${isDarkMode ? 'text-barakaprimary-snow' : 'text-black'}`
                        }`} onClick={() => handleNumberPage(page)}>

                        {page}

                    </Button>
                ))}

                <Button type="button" variant={`py-1 px-2 rounded-lg 
                    ${isDarkMode ? 'bg-barakaprimary-snow text-black' : 'bg-gray-900'}
                    ${data?.meta.current_page === data?.meta.last_page && 'opacity-50 cursor-not-allowed'}`} onClick={handleNextPage} disabled={data?.meta.current_page === data?.meta.last_page}>Next</Button>
            </div>
        )

    )
})


export default PaginationButton;