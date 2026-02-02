import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPinXIcon } from "lucide-react";
import Link from "next/link";

const EmptyUserPrimaryAddress = () => {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>
          <h2>You don&apos;t have any primary address</h2>
        </CardTitle>

        <CardDescription>
          <p>Please Add New Addres Below</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="my-10">
          <MapPinXIcon className="mx-auto size-20" />
        </div>

        <Button
          asChild
          className="bg-baraka-primary-300 hover:bg-baraka-lightgreen-200"
        >
          <Link href={"/user/settings"}>Create New Address</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyUserPrimaryAddress;
