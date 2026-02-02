"use client";

import useAddressQuery from "@/entities/address/hooks/useAddressQuery";
import AddressListItem from "./AddressListItem";
import { cn } from "@/lib/utils";
import AddressListSkeleton from "../AddressListSkeleton";
import AddressListEmpty from "../AddressListEmpty";
// import { useSidebar } from "@/components/ui/sidebar";

/**
 * AddressList component
 * This component renders a list of addresses
 * If the list of addresses is empty, it renders an empty state
 * If the list of addresses is loading, it renders a skeleton
 */

type AddressListProps = {
  display?: "flex" | "grid";
};
export default function AddressList({ display = "grid" }: AddressListProps) {
  const { data: addresses, isLoadingAddresses } = useAddressQuery();
  // const { open } = useSidebar();

  if (addresses?.data.length === 0) {
    return <AddressListEmpty />;
  }

  return (
    <section
      className={cn(
        "mt-10 w-full gap-4 data-[state=open]:bg-red-500",
        display === "grid" && "grid sm:grid-cols-2 lg:grid-cols-3",
        display === "flex" && "flex items-start",
        // open && "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3",
      )}
    >
      {isLoadingAddresses
        ? Array.from({ length: 8 }).map((_, idx) => (
            <AddressListSkeleton key={idx} />
          ))
        : addresses &&
          addresses.data.map((address) => (
            <AddressListItem address={address} key={address.id} />
          ))}
    </section>
  );
}
