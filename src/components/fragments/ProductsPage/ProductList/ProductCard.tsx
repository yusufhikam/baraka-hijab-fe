import { memo, useCallback } from "react";
import { ProductResponseType } from "../../../../utililties/api/products/getProducts";
import { Link } from "react-router-dom";
import { baseImageUrl } from "../../../../utililties/api/urlBase";
import Button from "../../../elements/Button/Button";
import useDarkMode from "../../../../utililties/customHook/useDarkMode";
import { handleModalQuickView } from "../../../../utililties/helper/ProductHelper/handleModalQuickView";
import { ProductType } from "../../../../types/productType";

type ProductCardProps = {
    data: ProductResponseType | undefined;
    setModalQuickView: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedProductQuickView: (p: ProductType | null) => void;
}

const ProductCard = memo(({ data, setModalQuickView, setSelectedProductQuickView }: ProductCardProps) => {
    const { isDarkMode } = useDarkMode();

    const handleModalQuick = useCallback((productId: number) => {
        handleModalQuickView(productId, { data, setModalQuickView, setSelectedProductQuickView })
    }, [data, setModalQuickView, setSelectedProductQuickView]);

    return (
        data?.data.map((product) => {
            return (
                <div key={product.id} className={`${data.data.length === 1 && 'col-start-4'} overflow-hidden col-span-6 border-none md:col-span-4 lg:col-span-3 p-2 font-poppins-regular text-center mb-4`}>
                    <div className="overflow-hidden relative group">
                        <Link to={`/shop/product/${product.slug}`} >
                            <div className=" overflow-hidden m-0 p-0">
                                <img src={`${baseImageUrl}/${product.thumbnail}`} alt={product.name} className="w-full h-56 sm:h-72  md:h-56 lg:h-64 bg-no-repeat object-cover object-center hover:scale-110 transition-all duration-300" />
                            </div>
                        </Link>
                        <div className="absolute bottom-0 w-full text-white  group-hover:opacity-100 opacity-0 transition-all duration-300">
                            <Button type="button" variant={`absolute -bottom-10 group-hover:bottom-0 left-0 w-full py-2 bg-barakaprimary-madder transition-all duration-300 ${isDarkMode ? 'hover:bg-white hover:text-barakaprimary-madder' : 'hover:bg-gray-900 hover:text-white'}`} title="Quick View" onClick={() => handleModalQuick(product.id)}>
                                <h1 className="font-poppins-semibold">QUICK VIEW</h1>
                            </Button>
                        </div>
                    </div>
                    <p className="opacity-40 mt-5 text-sm font-krub-regular">{product.subCategory.name}</p>
                    <p className="font-semibold">{product.name.toUpperCase()}</p>
                    <p className="font-semibold">{Intl.NumberFormat('en-EN', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price)}</p>
                </div>
            )
        })
    )
})

export default ProductCard;