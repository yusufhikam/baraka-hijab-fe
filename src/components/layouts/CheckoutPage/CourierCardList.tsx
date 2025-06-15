import { memo } from 'react'
import { calculateCostType } from '../../../utililties/api/CekOngkir/cekOngkir'
import useFormatCurrency from '../../../utililties/customHook/useFormatCurrency'
import Card from '../../elements/Card/Card'
import H1 from '../../elements/Title Header/H1'

type courierListProps = {
    courier: calculateCostType
    courierLogo: string
    isSelected: boolean
    onSelect: () => void
}
const CourierCardList = memo(
    ({ courier, courierLogo, isSelected, onSelect }: courierListProps) => {
        const { formatCurrency } = useFormatCurrency()
        return (
            <Card
                onClick={onSelect}
                variant={`text-sm w-full lg:w-[48%] rounded-md px-2 py-1  bg-white text-black  transition-all duration-300 
                ${
                    isSelected
                        ? 'shadow-green-500/30 border-green-500 ring ring-green-500 -translate-y-2 shadow-lg'
                        : 'hover:shadow-zinc-500/50 hover:cursor-pointer hover:shadow-lg shadow-md hover:-translate-y-1'
                }`}
            >
                <div className="flex items-center gap-2">
                    <img
                        src={`/src/assets/images/logo/${courierLogo}`}
                        alt={`${courier.code}_logo`}
                    />
                    <h1>{courier.name}</h1>
                </div>
                <hr className="my-2" />

                <div className="item-center flex flex-col">
                    <div className="flex items-center justify-between border-b-2 border-dashed border-black/30 bg-gray-200 px-1">
                        <H1 fontSize="text-xs">Service Name : </H1>
                        <H1 fontWeight="font-normal" fontSize="text-xs">
                            {courier.service}
                        </H1>
                    </div>
                    <div className="flex items-center justify-between border-b-2 border-dashed border-black/30 px-1">
                        <H1 fontSize="text-xs">Description : </H1>
                        <H1 fontWeight="font-normal" fontSize="text-xs">
                            {courier.description}
                        </H1>
                    </div>
                    <div className="flex items-center justify-between border-b-2 border-dashed border-black/30 bg-gray-200 px-1">
                        <H1 fontSize="text-xs">Estimated : </H1>
                        <H1 fontWeight="font-normal" fontSize="text-xs">
                            {courier.etd}
                        </H1>
                    </div>

                    <div className="mt-2 text-right">
                        <H1 fontSize="text-lg">
                            {formatCurrency(courier.cost)}
                        </H1>
                    </div>
                </div>
            </Card>
        )
    }
)

export default CourierCardList
