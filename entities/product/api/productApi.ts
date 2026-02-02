import { ApiResponse } from "@/types/apiResponse.type";
import { ProductType } from "../types/product.type";
import { baseApiURL } from "@/lib/utils";
import buildQueryString from "@/utils/QueryBuilder";
import { ProductParamsQuery } from "../types/productParamQuery.type";

const productApi = {
  /* Get all products */
  async getProducts(params: ProductParamsQuery) {
    const res = await fetch(
      `${baseApiURL}/products?${buildQueryString(params)}`,
      {
        cache: "no-cache",
      },
    );

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = (await res.json()) as ApiResponse<ProductType[]>;

    return data;
  },

  /* Get detail product */

  async getDetailProduct(
    slug: string,
  ): Promise<ApiResponse<ProductType> | null> {
    const res = await fetch(`${baseApiURL}/product/${slug}`, {
      cache: "no-cache",
    });

    // for return 404 page
    if (res.status === 404) return null;

    if (!res.ok) {
      throw new Error("Failed to fetch detail product");
    }

    return res.json();
  },

  /* Get new arrival products */
  async getArrivalProducts() {
    const res = await fetch(`${baseApiURL}/products/new-arrivals`, {
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!res.ok) {
      throw new Error("Failed to fetch arrival products");
    }

    return res.json() as Promise<ApiResponse<ProductType[]>>;
  },

  /* Get similar products by category slug */
  async getSimilarProducts(
    product_id: number,
    category_slug: string,
  ): Promise<ApiResponse<ProductType[]>> {
    const query = `?category=${category_slug}`;
    const res = await fetch(
      `${baseApiURL}/products/similar-product/${product_id}${query}`,
      {
        next: { revalidate: 3600 }, // cache for 1 hour
      },
    );

    if (!res.ok) throw new Error("Failed to fetch similar products");

    return res.json();
  },
};

export default productApi;
