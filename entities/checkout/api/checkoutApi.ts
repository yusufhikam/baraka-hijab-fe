import ApiClient from "@/lib/axios/apiClient";
import { baseURL } from "@/lib/utils";
import { ApiResponse } from "@/types/apiResponse.type";
import { CheckoutTransactionResponseType } from "../types/checkout-transaction.type";
import { CheckoutPreparePayloadType } from "../types/checkout-prepare.type";
import { CheckoutSummaryType } from "../types/checkout-summary.type";
import { CheckoutSetShippingPayloadType } from "../types/checkout-setShipping.type";

const checkoutApi = {
  checkoutPrepare: async (payload: CheckoutPreparePayloadType) => {
    try {
      const res = await ApiClient.post(`${baseURL}/checkout/prepare`, payload);

      return res.data;
    } catch (err) {
      console.error("🚀 ~ err:", err);
      throw err;
    }
  },
  checkoutSetShipping: async (payload: CheckoutSetShippingPayloadType) => {
    const res = await ApiClient.post(`${baseURL}/checkout/shipping`, payload);

    return res.data;
  },
  checkoutSummary: async (): Promise<CheckoutSummaryType> => {
    try {
      const res = await ApiClient.get(`${baseURL}/checkout`);

      return res.data;
    } catch (err) {
      console.error("🚀 ~ err:", err);
      throw err;
    }
  },
  checkout: async (payload: {
    address_id: number;
  }): Promise<ApiResponse<CheckoutTransactionResponseType>> => {
    const res = await ApiClient.post(`${baseURL}/checkout`, payload);

    return res.data;
  },

  clearCheckoutActiveSession: async () => {
    const res = await ApiClient.post(
      `${baseURL}/checkout/clear-active-session`,
    );

    return res.data;
  },
};

export default checkoutApi;
