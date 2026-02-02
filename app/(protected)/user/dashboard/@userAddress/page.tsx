"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useAddressQuery from "@/entities/address/hooks/useAddressQuery";
import UserPrimaryAddress from "@/features/_checkout/_components/UserPrimaryAddress";
import Link from "next/link";

export default function UserAddressSlot() {
  const {
    userPrimaryAddress: { data, isLoading },
  } = useAddressQuery();

  const address = data?.data;
  return (
    <Card className="col-span-2">
      <CardContent>
        <CardHeader>Your Primary Address</CardHeader>

        <UserPrimaryAddress
          address={address}
          isLoading={isLoading}
          isPreview
          className="border-none shadow-none"
        />

        <CardFooter>
          <Button asChild className="bg-baraka-lightgreen-200 ms-auto mt-10">
            <Link href="/user/settings?tab=address">Edit Your Address</Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
