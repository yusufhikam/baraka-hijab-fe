import ApiClient from "@/lib/axios/apiClient";
import { baseApiURL } from "@/lib/utils";
import { ApiResponse } from "@/types/apiResponse.type";
import {
  TransactionApiResponse,
  TransactionType,
} from "../types/transaction.type";
import { AxiosResponse } from "axios";
import buildQueryString from "@/utils/QueryBuilder";
import { TransactionsQueryParams } from "../types/transactionQueryParam.type";

const transactionApi = {
  async getTransactions(params: TransactionsQueryParams) {
    try {
      const res: AxiosResponse<TransactionApiResponse<TransactionType[]>> =
        await ApiClient.get(
          `${baseApiURL}/user/transactions?${buildQueryString(params)}`,
        );

      return res.data;
    } catch (err) {
      console.error("🚀 ~ err:", err);
      throw err;
    }
  },
  async validateTransactionOwnership(
    order_id: string,
  ): Promise<ApiResponse<null>> {
    const res = await ApiClient.get(
      `${baseApiURL}/user/transaction/validate/${order_id}`,
    );

    return res.data;
  },
};

export default transactionApi;
