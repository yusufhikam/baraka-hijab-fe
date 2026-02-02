import { baseApiURL } from "@/lib/utils";
import { ApiResponse } from "@/types/apiResponse.type";
import { SubCategoryCarouselType } from "../types/subCategory.type";
import { CategoryType } from "../types/category.type";

const categoryApi = {
  /**
   * *GET CATEGORIES
   */
  async getCategories() {
    const res = await fetch(`${baseApiURL}/categories`, {
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return res.json() as Promise<ApiResponse<CategoryType[]>>;
  },

  /**
   *
   * * Get latest Sub Categories for carousel
   */
  async getCarouselCategories() {
    const res = await fetch(`${baseApiURL}/sub-categories/carousel`, {
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!res.ok) {
      throw new Error("Failed to fetch arrival products");
    }

    return res.json() as Promise<ApiResponse<SubCategoryCarouselType[]>>;
  },
};

export default categoryApi;
