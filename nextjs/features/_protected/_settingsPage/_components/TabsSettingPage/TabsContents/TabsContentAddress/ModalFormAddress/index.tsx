"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { MapPinPlusIcon, SquarePenIcon } from "lucide-react";
import FormAddress from "./FormAddress";
import { AddressResponseType } from "@/entities/address/types/AddressResponse.type";
import { useState } from "react";

type ModalFormAddressProps = React.ComponentProps<typeof Button> & {
  mode?: "create" | "update";
  displayIcon?: boolean;
  initialData?: AddressResponseType;
};

/**
 * A modal form component for creating or updating an address.
 *
 * @param {ModalFormAddressProps} - props for the component
 * @param {string} mode - the mode of the form, either "create" or "update"
 * @param {boolean} displayIcon - whether to display the icon or not
 * @param {AddressResponseType} initialData - the initial data of the form when the mode is UPDATE
 * @param {React.ComponentProps<typeof Button>} props - props for the Button component
 *
 * @returns {JSX.Element} - a JSX element of the modal form component
 */
export default function ModalFormAddress({
  mode = "create",
  displayIcon = false,
  initialData,
  ...props
}: ModalFormAddressProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dialogTitle =
    mode === "create" ? "Create New Address" : displayIcon ? "" : "Update";
  const dialogSubTitle =
    mode === "create"
      ? "Please fill the form below to create a new address. When you're done, click save."
      : "Update your address. When you&apos;re done, click save.";

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger {...props} asChild>
        <Button
          title={mode === "create" ? "Create New Address" : "Update Address"}
          type="button"
          className={cn(
            "bg-baraka-primary-300 hover:bg-baraka-lightgreen-200 uppercase",
            props.className,
          )}
        >
          {displayIcon && mode === "create" ? (
            <MapPinPlusIcon />
          ) : (
            <SquarePenIcon />
          )}
          {dialogTitle}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogSubTitle}</DialogDescription>
        </DialogHeader>

        <FormAddress
          initialData={initialData}
          mode={mode}
          onOpenChange={setIsModalOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
