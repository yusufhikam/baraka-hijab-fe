import Api from "../Auth/Api";

type CategoriesType = {
    id:number;
    name:string;
}

const getCategories = async ():Promise<CategoriesType[]> => {
    try{
        const res = await Api.get(`/categories`);

        // console.log('Categories: ',res.data.data);
        return res.data.data
    }catch(error){
        console.error(error);
        return []
    }
}


export default getCategories;