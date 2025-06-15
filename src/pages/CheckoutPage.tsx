import Breadcrumb from '../components/fragments/Breadcrumb/Breadcrumb'
import useDarkMode from '../utililties/customHook/useDarkMode'
import ShippingDetails from '../components/layouts/CheckoutPage/ShippingDetails'
import BillingDetails from '../components/layouts/CheckoutPage/BillingDetails'
import { useState } from 'react'
import { calculateCostType } from '../utililties/api/CekOngkir/cekOngkir'

export default function CheckoutPage() {
    const { isDarkMode } = useDarkMode()
    const [selectedCourier, setSelectedCourier] =
        useState<calculateCostType | null>(null)

    return (
        <div className={`w-full ${!isDarkMode && 'bg-gray-200'}`}>
            <div className="flex items-center justify-center px-5 py-13">
                <Breadcrumb
                    links_breadcrumb={[
                        {
                            label: 'SHOPPING BAG',
                            link: '/carts',
                            isActive: false,
                            isAllowed: true,
                        },
                        {
                            label: 'CHECKOUT DETAILS',
                            link: '/checkout',
                            isActive: true,
                            isAllowed: true,
                        },
                        {
                            label: 'ORDER COMPLETED',
                            link: '/checkout',
                            isActive: false,
                            isAllowed: false,
                        },
                    ]}
                />
            </div>

            <div
                className={`flex flex-wrap items-start gap-y-10 ${isDarkMode ? 'bg-zinc-700' : 'bg-white'}`}
            >
                {/* LEFT SECTION for billing details courier*/}
                <div className="flex w-full flex-col border-b px-5 py-2 md:w-[60%] md:border-r md:border-b-0">
                    <ShippingDetails
                        selectedCourier={selectedCourier}
                        setSelectedCourier={setSelectedCourier}
                    />
                </div>

                {/* RIGHT SECTION */}
                <div className={`flex w-full flex-col px-5 py-2 md:w-[40%]`}>
                    <BillingDetails selectedCourier={selectedCourier} />
                </div>
            </div>
        </div>
    )
}
