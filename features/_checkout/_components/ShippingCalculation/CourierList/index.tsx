import { RajaOngkirCostCheckResponseType } from "@/entities/rajaOngkir/types/RajaOngkirCostCheckSchema";
import CourierCardItem from "./CourierCardItem";
import EmptyCourier from "./EmptyCourier";
import { CheckoutSetShippingPayloadType } from "@/entities/checkout/types/checkout-setShipping.type";
import { memo } from "react";

type CourierListProps = {
  data: RajaOngkirCostCheckResponseType[] | undefined;
  selectedCourier: { code: string; service: string } | null | undefined;
  onSelectedCourier: (payload: CheckoutSetShippingPayloadType) => void;
};

const CourierList: React.FC<CourierListProps> = ({
  data,
  selectedCourier,
  onSelectedCourier,
}) => {
  if (data === undefined) return null;
  if (!data?.length) return <EmptyCourier />;

  const handleOnClick = (courier: RajaOngkirCostCheckResponseType) => {
    onSelectedCourier({
      courier: courier.code as CheckoutSetShippingPayloadType["courier"],
      service: courier.service,
      cost: courier.cost,
      etd: courier.etd,
    });
  };

  return (
    <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {data.map((courier, idx) => (
        <CourierCardItem
          courier={courier}
          key={idx}
          selectedCourier={selectedCourier}
          onClick={() => handleOnClick(courier)}
        />
      ))}
    </section>
  );
};

export default memo(CourierList);
