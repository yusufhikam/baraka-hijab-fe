import { useSearchParams } from "react-router-dom";

type useSearchParamsType = {
    searchParams: URLSearchParams,
    setSearchParams: (params: URLSearchParams) => void,
    page: number,
    category: string,
    subCategory: string,
    onSearch: string
}

const useMySearchParams = (): useSearchParamsType => {

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get('page')) || 1;
    const category = searchParams.get('category') || '';
    const subCategory = searchParams.get('subCategory') || '';
    const onSearch = searchParams.get('search') || '';

    

    return { searchParams, setSearchParams, page, category, subCategory, onSearch }
}

export default useMySearchParams;