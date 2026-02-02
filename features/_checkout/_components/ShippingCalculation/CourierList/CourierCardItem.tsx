import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RajaOngkirCostCheckResponseType } from "@/entities/rajaOngkir/types/RajaOngkirCostCheckSchema";
import { cn, moneyFormatter } from "@/lib/utils";
import { memo } from "react";

type CourierCardItemProps = {
  courier: RajaOngkirCostCheckResponseType;
  selectedCourier: { code: string; service: string } | null | undefined;
  onClick: () => void;
};

const CourierCardItem: React.FC<CourierCardItemProps> = ({
  courier,
  selectedCourier,
  onClick,
}) => {
  const isSelected =
    selectedCourier?.code === courier.code &&
    selectedCourier?.service === courier.service;
  console.log("🚀 ~ CourierCardItem ~ isSelected:", isSelected);

  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-sm p-0 text-sm",
        isSelected && "border-baraka-primary-300 border",
      )}
    >
      <CardContent className="w-full p-2">
        <CardHeader className="mb-2 h-fit border-b px-0 [.border-b]:pb-2">
          <CardTitle className="">
            <h3 className="font-medium">{courier.name}</h3>
          </CardTitle>
        </CardHeader>

        <div className="inline-flex w-full items-center justify-between">
          <p className="font-medium text-zinc-500">Service : </p>
          <p className="font-bold">{courier.service}</p>
        </div>

        <div className="inline-flex w-full items-center justify-between">
          <p className="font-medium text-zinc-500">Description : </p>
          <p className="font-bold">{courier.description}</p>
        </div>

        <div className="inline-flex w-full items-center justify-between">
          <p className="font-medium text-zinc-500">Estimated Time : </p>
          <p className="font-bold">{courier.etd}</p>
        </div>

        <CardFooter className="mt-5 inline-flex w-full items-center justify-between border-t px-2 [.border-t]:pt-2">
          <p className="font-medium text-zinc-400">COST</p>

          <p className="font-bold">{moneyFormatter(courier.cost)}</p>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default memo(CourierCardItem);
