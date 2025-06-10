type UpdateParamsProps = {
    searchParams: URLSearchParams;
    setSearchParams: (params: URLSearchParams) => void;
    newParams: Record<string, string>;
}

const UpdateParams = ({searchParams, newParams, setSearchParams}: UpdateParamsProps) => {

    const params = new URLSearchParams(searchParams);
    
    Object.entries(newParams).forEach(([key, value])=>{
        if(value === ''){
            params.delete(key);
        } else {
            params.set(key, value);
        }
    })

    setSearchParams(params)
    
}

export default UpdateParams;