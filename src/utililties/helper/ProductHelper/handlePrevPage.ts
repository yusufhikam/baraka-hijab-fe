import { handlePaginationButtonType } from "../../../types/handlePaginationButtonType";
import UpdateParams from "../updateParams";


export const handlePrevPage = ({ searchParams, page, category, subCategory, setSearchParams}: handlePaginationButtonType) => {
        UpdateParams({
            searchParams: searchParams,
            newParams: {
                page: page ? String(page - 1) : '1',
                category: category,
                subCategory: subCategory
            },
            setSearchParams: setSearchParams
        })
    };