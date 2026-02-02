import { useSearchParams } from "react-router-dom"
import NavLinks from "../../layouts/Navbars/NavLinks";
import Button from "../../elements/Button/Button";
import { memo } from "react";

type breadcrumbProps = {
    variant?: string
    dinamicParams?: string | undefined
}
const Breadcrumb = ({ variant, dinamicParams }: breadcrumbProps) => {
    const [searchParams, setSearchParams] = useSearchParams();


    const handleParamsBreeadcrumb = (key: string) => {
        const newParams = new URLSearchParams();

        for (const [k, v] of searchParams.entries()) {
            // if(k === 'page' ) continue;

            newParams.set(k, v)

            if (k === key) break;
        }


        setSearchParams(newParams);
    }

    const paramsEntries = Array.from(searchParams.entries()).filter(([key]) => key !== 'page' && key !== 'search');

    return (
        <div className={`flex ms-5 gap-1 ${variant} font-poppins-regular`}>
            <NavLinks to="/" withPseudoAfter={false} variant=" opacity-30 hover:opacity-100">HOME</NavLinks>
            <span>/</span>
            {/* jika paramsEntries kosong */}
            {paramsEntries.length === 0 && (
                <NavLinks to="/shop/products" variant={`${dinamicParams ? 'opacity-30 hover:opacity-100' : 'pointer-events-none font-bold'} `} withPseudoAfter={false}>PRODUCTS</NavLinks>
            )} 
            
            {dinamicParams && (
                <>
                    <span>/</span>
                    <span className="font-bold pointer-events-none">{dinamicParams}</span>
                </>
            ) }

            {/* jika paramsEntries ada */}
            {paramsEntries && paramsEntries.map(([key, value], index) => {
                return (

                    <div key={key}>
                        {/* <span>{index !== paramsEntries.length + 1 && '/ '}</span> */}

                        <Button type="button" variant={` ${index === paramsEntries.length - 1 && 'font-bold' || index !== paramsEntries.length + 1 && 'opacity-30 hover:opacity-100'}`} key={key} onClick={() => handleParamsBreeadcrumb(key)}>
                            {value.toUpperCase()}
                        </Button>
                        <span>{index !== paramsEntries.length - 1 && ' /'}</span>
                    </div>
                )
            })}
        </div>
    )
}


export default memo(Breadcrumb);