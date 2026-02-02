"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ModalEditPrimaryAddress from "./ModalEditPrimaryAddress";
import { cn, phoneFormatter } from "@/lib/utils";
import AddressBadge from "@/features/_protected/_settingsPage/_components/TabsSettingPage/TabsContents/TabsContentAddress/AddressList/AddressBadge";
import UserPrimaryAddressSkeleton from "./UserPrimaryAddressSkeleton";
import EmptyUserPrimaryAddress from "./EmptyUserPrimaryAddress";
import { AddressResponseType } from "@/entities/address/types/AddressResponse.type";

type UserPrimaryAddressProps = {
  address: AddressResponseType | undefined;
  isPreview?: boolean;
  isLoading?: boolean;
  className?: string;
};

const UserPrimaryAddress: React.FC<UserPrimaryAddressProps> = ({
  address,
  isLoading,
  isPreview = false,
  className,
}) => {
  if (isLoading) return <UserPrimaryAddressSkeleton />;
  if (!address) return <EmptyUserPrimaryAddress />;
  return (
    <Card className={cn("", className)}>
      <CardHeader
        className={cn(
          "relative flex items-center justify-end",
          isPreview && "mb-5",
        )}
      >
        <AddressBadge address={address} className="top-0 left-5" />
        {!isPreview && <ModalEditPrimaryAddress />}
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="border-b pb-2">
          <p>
            Recipient Name: <b>{address?.recipient_name}</b>
          </p>
          <p>
            Phone Number: (+62) <b>{phoneFormatter(address?.phone_number)}</b>
          </p>
        </div>
      </CardContent>

      <CardFooter>
        {" "}
        <p>{address?.label}</p>
      </CardFooter>
    </Card>
  );
};

export default UserPrimaryAddress;
