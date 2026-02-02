import { ProductType } from "../../../types/productType";
import Api from "../Auth/Api";

export type ProductResponseType = {
    data: ProductType[];
    meta:{
        current_page: number;
        last_page:number;
        total:number;
        // links: {
        //     active: boolean;
        // }
    };
    links:{
        next: string | null;
        prev: string | null;
    }
}
export const getProducts = async (page = 1, category = '', subCategory = '', search = ''):Promise<ProductResponseType> => {


    try{
        const res = await Api.get(`/products`, {
            params:{
                page,
                category,
                subCategory,
                search,
            }
        });

        // console.log('Products: ',res.data);
        return res.data;
    }catch(error){
        console.error(error);

        return {data:[], meta:{current_page:0, last_page:0, total:0}, links: {next: null, prev: null} }
    }
}
