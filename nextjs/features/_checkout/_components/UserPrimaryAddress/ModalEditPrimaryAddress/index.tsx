import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddressList from "@/features/_protected/_settingsPage/_components/TabsSettingPage/TabsContents/TabsContentAddress/AddressList";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const ModalEditPrimaryAddress = () => {
  return (
    <Dialog>
      <VisuallyHidden>
        <DialogDescription />
      </VisuallyHidden>

      <DialogTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          className="text-baraka-primary-300 hover:border-baraka-lightgreen-200 hover:text-baraka-lightgreen-200 border-baraka-primary-300"
        >
          EDIT
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-y-auto lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>EDIT MAIN ADDRESS</DialogTitle>
        </DialogHeader>
        <AddressList display="flex" />
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditPrimaryAddress;
