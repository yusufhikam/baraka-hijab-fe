/**
 * * HOOK FOR HANDLE USER ADDRESS FETCHING & MUTATION USING TANSTACK QUERY
 *
 *
 * @requires addressApi
 *
 *
 * @return {
 *
 * data,
 * isLoadingAddresses,
 * userPrimaryAddress,
 * mutateCreateAddress,
 * mutateUpdateAddress,
 * mutateDeleteAddress,
 * mutateSetPrimaryAddress
 *
 * }
 *
 *
 *
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import addressApi from "../api/addressApi.service";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";
import { AddressSchemaPayloadType } from "../types/AddressSchema";
import { AxiosError } from "axios";

export default function useAddressQuery() {
  const QUERY_KEY = {
    addresses: ["addresses"] as const,
    primaryAddress: ["primary-address"] as const,
  };

  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // todo : get Addresses
  const { data, isLoading: isLoadingAddresses } = useQuery({
    queryKey: QUERY_KEY["addresses"],
    queryFn: () => addressApi.get(),
    staleTime: 60 * 1000 * 10, // for 10 minutes
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
    gcTime: 60 * 1000 * 20, // for 20 minutes
    retry: (failureCount, error) => {
      const err = error as AxiosError;

      // kalau bukan 401 skip & hanya retry 1 kali
      return err.response?.status === 401 && failureCount < 1;
    },
    retryDelay: 1000,
  });

  // todo : get user primary address

  const userPrimaryAddress = useQuery({
    queryKey: QUERY_KEY["primaryAddress"],
    queryFn: () => addressApi.getPrimaryAddress(),
    staleTime: 60 * 1000 * 60, // for 1 hour
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
    gcTime: 60 * 1000 * 120, // for 2 hours
  });

  // todo : create address
  const mutateCreateAddress = useMutation({
    mutationFn: (data: AddressSchemaPayloadType) => addressApi.create(data),
    onSuccess: () => {
      toast.success("Successfully added new address", {
        duration: 3000,
        position: "top-right",
        onAutoClose: () => {
          queryClient.invalidateQueries({ queryKey: QUERY_KEY.addresses });
        },
      });
    },
  });

  // todo : update address
  const mutateUpdateAddress = useMutation({
    mutationFn: ({
      addressId,
      data,
    }: {
      addressId: number;
      data: AddressSchemaPayloadType;
    }) => addressApi.update(data, addressId),
    onSuccess: () => {
      toast.success("Address updated successfully", {
        duration: 3000,
        position: "top-right",
        onAutoClose: () => {
          queryClient.invalidateQueries({ queryKey: QUERY_KEY.addresses });
          queryClient.invalidateQueries({ queryKey: QUERY_KEY.primaryAddress });
        },
      });
    },

    onError: (error) => {
      toast.error("Failed to update address", {
        description: error.message,
        duration: 3000,
        position: "top-right",
      });
    },
  });

  // todo : delete address
  const mutateDeleteAddress = useMutation({
    mutationFn: (addressId: number) => addressApi.delete(addressId),
    onSuccess: () => {
      toast.success("Address deleted successfully", {
        duration: 3000,
        position: "top-right",
        onAutoClose: () => {
          queryClient.invalidateQueries({ queryKey: QUERY_KEY.addresses });
        },
      });
    },

    onError: (error) => {
      toast.error("Failed to delete address", {
        description: error.message,
        duration: 3000,
        position: "top-right",
      });
    },
  });

  //   todo : set to primary address

  const mutateSetPrimaryAddress = useMutation({
    mutationFn: (addressId: number) => addressApi.setPrimary(addressId),
    onSuccess: () => {
      toast.success("Address setted to primary is successfully", {
        duration: 3000,
        position: "top-right",
        onAutoClose: () => {
          queryClient.invalidateQueries({
            queryKey: QUERY_KEY.addresses,
          });
          queryClient.invalidateQueries({
            queryKey: QUERY_KEY.primaryAddress,
          });
        },
      });
    },
    onError: (error) => {
      toast.error("Failed to set address to primary", {
        description: error.message,
        duration: 3000,
        position: "top-right",
      });
    },
  });

  return {
    data,
    isLoadingAddresses,
    userPrimaryAddress,
    mutateCreateAddress,
    mutateUpdateAddress,
    mutateSetPrimaryAddress,
    mutateDeleteAddress,
  };
}
