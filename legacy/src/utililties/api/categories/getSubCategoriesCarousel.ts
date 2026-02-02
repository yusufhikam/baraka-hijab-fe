import { SubCategoryCarouselType } from "../../../types/subCategoryCarouselType";
import Api from "../Auth/Api";

const getSubCategoriesCarousel = async ():Promise<SubCategoryCarouselType[]> => {
    try{
        const res = await Api.get(`/sub-categories/carousel`);

        // console.log('Sub Categories Carousel: ',res.data.data);
        return res.data.data
    }catch(error){
        console.error(error);
        return [];
    }
}

export default getSubCategoriesCarousel;