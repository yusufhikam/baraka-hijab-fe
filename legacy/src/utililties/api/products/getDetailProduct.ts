import { ProductType } from "../../../types/productType";
import Api from "../Auth/Api";



export const getDetailProduct = async (slug: string | undefined):Promise<ProductType | null> => {
    if(!slug) return null;

    try{
        const res = await Api.get(`/product/${slug}`);

        // console.log('Detail Product: ',res.data.data);
        return res.data.data;
    }catch(error){
        console.error(error);
        return null;
    }
}