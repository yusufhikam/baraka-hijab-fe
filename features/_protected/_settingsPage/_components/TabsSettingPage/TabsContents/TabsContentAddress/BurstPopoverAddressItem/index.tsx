"use client";

import {
  CheckCircle2Icon,
  EllipsisIcon,
  Loader2,
  TriangleIcon,
} from "lucide-react";
import ModalFormAddress from "../ModalFormAddress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useAddressQuery from "@/entities/address/hooks/useAddressQuery";
import ButtonDeleteAddress from "../ButtonDeleteAddress";
import { AddressResponseType } from "@/entities/address/types/AddressResponse.type";
import { useState } from "react";

type BurstPopoverAddressItemProps = {
  address: AddressResponseType;
};

/**
 * BurstPopoverAddressItem component is used to display a popover menu
 * that contains three buttons: Set to Primary, Update, and Delete.
 * The Set to Primary button will set the address as the primary address.
 * The Update button will trigger the ModalFormAddress component in update mode.
 * The Delete button will trigger the handleDeleteAddress function to delete the address.
 * The component will also display a loading indicator if either the set to primary
 * or delete address mutation is pending.
 * @param {AddressResponseType} address - The address data to be displayed in the popover menu.
 */
export default function BurstPopoverAddressItem({
  address,
}: BurstPopoverAddressItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    mutateSetPrimaryAddress,
    mutateDeleteAddress,
    mutateUpdateAddress: { isPending: isLoadingUpdate },
  } = useAddressQuery();

  const handleSetPrimaryAddress = (id: number) => {
    mutateSetPrimaryAddress.mutate(id, { onSuccess: () => setIsOpen(false) });
  };

  const handleDeleteAddress = (id: number) => {
    mutateDeleteAddress.mutate(id, { onSuccess: () => setIsOpen(false) });
  };

  const isLoadingSetPrimary = mutateSetPrimaryAddress.isPending;
  const isLoadingDeleteAddress = mutateDeleteAddress.isPending;

  const isLoading = !!(
    isLoadingSetPrimary ||
    isLoadingDeleteAddress ||
    isLoadingUpdate
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <EllipsisIcon />
      </PopoverTrigger>

      <PopoverContent
        align="center"
        side="top"
        sideOffset={20}
        className={cn(
          "relative flex max-w-[200px] items-center justify-evenly border-none bg-zinc-900 text-white shadow-md shadow-black/30",
        )}
      >
        <TriangleIcon
          fill="#18181b"
          stroke="#18181b"
          className="absolute inset-x-1/2 -bottom-[25%] -translate-x-1/2 rotate-180"
        />

        {/* BUTTON TO HANDLE SET TO PRIMARY ADDRESS */}
        <Button
          title="Set To Primary"
          onClick={() => handleSetPrimaryAddress(address.id)}
          disabled={isLoading}
          className="inline-flex aspect-square h-auto items-center justify-start rounded-full bg-white text-xs text-black uppercase hover:bg-blue-500 hover:text-white"
        >
          {isLoadingSetPrimary ? (
            <Loader2 className="mx-auto animate-spin" />
          ) : (
            <>
              <CheckCircle2Icon />
              {/* Set to primary */}
            </>
          )}
        </Button>

        {/* BUTTON TO TRIGGER MODAL FORM ADDRESS MODE "UPDATE" */}
        <ModalFormAddress
          disabled={isLoading}
          mode="update"
          className="hover:bg-baraka-primary-300 inline-flex aspect-square h-auto items-center justify-start rounded-full bg-white p-0 text-xs text-black hover:text-white"
          displayIcon
          initialData={address}
        />

        {/* BUTTON TO HANDLE DELETE ADDRESS */}
        <ButtonDeleteAddress
          isLoadingDelete={isLoadingDeleteAddress}
          isLoadingUpdate={isLoadingUpdate}
          isLoadingSetPrimary={isLoadingSetPrimary}
          handleDelete={() => handleDeleteAddress(address.id)}
          className="aspect-square h-auto rounded-full"
        />
      </PopoverContent>
    </Popover>
  );
}
