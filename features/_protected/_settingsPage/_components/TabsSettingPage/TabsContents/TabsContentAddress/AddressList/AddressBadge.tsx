import { Badge } from "@/components/ui/badge";
import { AddressResponseType } from "@/entities/address/types/AddressResponse.type";
import { cn } from "@/lib/utils";

type AddressBadgeProps = {
  address: AddressResponseType;
  className?: string;
};

const AddressBadge: React.FC<AddressBadgeProps> = ({ address, className }) => {
  const isPrimary = address.is_primary;

  return (
    <div className={cn("absolute top-1 left-2 space-x-3", className)}>
      {isPrimary && (
        <Badge className="rounded-sm bg-emerald-500 text-xs">
          MAIN ADDRESS
        </Badge>
      )}

      <Badge className="rounded-sm bg-blue-500 uppercase">
        {address.mark_as}
      </Badge>
    </div>
  );
};

export default AddressBadge;
