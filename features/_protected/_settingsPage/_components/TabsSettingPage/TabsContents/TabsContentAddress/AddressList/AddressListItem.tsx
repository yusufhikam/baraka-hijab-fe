"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AddressResponseType } from "@/entities/address/types/AddressResponse.type";
import { cn, phoneFormatter } from "@/lib/utils";
import BurstPopoverAddressItem from "../BurstPopoverAddressItem";
import AddressBadge from "./AddressBadge";

type AddressListItemProps = {
  address: AddressResponseType;
};

/**
 * AddressListItem component
 *
 * This component renders a single address item in the address list page.
 * It displays the recipient name, phone number, detail address, and label.
 * If the address is set as primary, it will display a badge to indicate it.
 * It also includes a button to delete the address.
 *
 * @param {AddressResponseType} address - The address data to be rendered.
 */
export default function AddressListItem({ address }: AddressListItemProps) {
  const isPrimary = !!address.is_primary;

  return (
    <Card
      className={cn(
        "border-baraka-lightgreen-200 font-geist hover:bg-baraka-lightgreen-200/5 relative aspect-auto h-56 max-h-60 w-full overflow-hidden p-2 transition-all duration-300",
        isPrimary && "border-3",
      )}
    >
      <AddressBadge address={address} />

      <div className="absolute top-1 right-2">
        <BurstPopoverAddressItem address={address} />
      </div>

      <CardContent className="flex h-full flex-col items-start justify-between gap-4 px-0 pt-10 text-sm">
        <div className="flex items-center gap-2">
          <p className="max-w-20 truncate font-bold">
            {address.recipient_name}
          </p>
          <hr className="h-3 w-0.5 bg-black/20" />
          <p>(+62) {phoneFormatter(address.phone_number)}</p>
        </div>

        <div className="">
          <p className="text-xs font-semibold text-zinc-400">
            (Detail Address, block, apartment etc.)
          </p>
          <p className="line-clamp-2">{address.detail}</p>
        </div>
      </CardContent>

      <CardFooter className="w-full p-0">
        <p className="text-sm uppercase">{address.label}</p>
      </CardFooter>
    </Card>
  );
}
