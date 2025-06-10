export type handlePaginationButtonType = {
    searchParams: URLSearchParams,
    page?: number,
    category:string;
    subCategory: string;
    setSearchParams: (params: URLSearchParams) => void
}