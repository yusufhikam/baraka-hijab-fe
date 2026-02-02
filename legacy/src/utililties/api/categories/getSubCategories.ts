import { SubCategoryType } from "../../../types/subCategoryType";
import Api from "../Auth/Api";

const getSubCategories = async ():Promise<SubCategoryType[]> => {
    try{
        const res = await Api.get(`/sub-categories`);

        // console.log('Sub Categories: ',res.data.data);
        return res.data.data
    }catch(error){
        console.error(error);
        return []
    }
}

export default getSubCategories;