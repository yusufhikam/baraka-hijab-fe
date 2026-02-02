import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Map } from "lucide-react";

/**
 * AddressListEmpty component
 *
 * This component is used to display a message when no addresses are found.
 *
 * It displays a card with a map icon and a message saying "NO ADDRESS FOUND"
 *
 * @returns {JSX.Element} A JSX element representing the AddressListEmpty component
 */
export default function AddressListEmpty() {
  return (
    <Card className="font-geist mt-10 bg-zinc-200">
      <CardContent className="flex w-full flex-col items-center justify-center">
        <CardHeader className="mx-auto w-1/2 text-center">
          <CardTitle className="mx-auto">
            <Map size={80} />
          </CardTitle>
          <CardDescription className="text-2xl font-bold">
            NO ADDRESS FOUND
          </CardDescription>
        </CardHeader>
      </CardContent>
    </Card>
  );
}
