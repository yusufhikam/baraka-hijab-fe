import { useQuery } from "@tanstack/react-query";
import getPrimaryAddress from "../api/CekOngkir/getPrimaryAddress";

export default function usePrimaryAddress() {
    const { data: primaryAddress, isLoading: isLoadingAddress } = useQuery({
        queryKey: ['primaryaddress'],
        queryFn: () => getPrimaryAddress(),
        staleTime: 1000 * 60 * 5,
    })


    return { primaryAddress, isLoadingAddress }
}