import {  ProductThumbnailType } from "../../../types/productType";
import Api from "../Auth/Api";



export const getNewArrivals = async ():Promise<ProductThumbnailType[]> => {
    try{
        const res = await Api.get(`/products/new-arrivals`);
    
        // console.log('New Arrivals: ',res.data.data);
        return res.data.data;

    } catch(error){
        console.error(error);
        return [];
    }
}

