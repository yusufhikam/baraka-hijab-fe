import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import ModalFormAddress from "./ModalFormAddress";
import AddressList from "./AddressList";

/**
 * A TabsContent component for address settings.
 *
 * This component displays a list of addresses and
 * allows users to make changes to their addresses.
 *
 * It also includes a button to create a new address.
 *
 */
export default function TabsContentAddress() {
  return (
    <TabsContent value="address" className="w-full">
      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle>Address Setting</CardTitle>
          <CardDescription>
            List of your address and you can make changes to your addresses
            here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* MODAL FORM TRIGGER FOR CREATE NEW ADDRESS */}
          <ModalFormAddress mode="create" />

          <AddressList />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
