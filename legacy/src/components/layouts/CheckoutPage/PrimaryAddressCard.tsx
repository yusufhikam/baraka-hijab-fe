import { AddressType } from '../../../types/AddressType'
import { useAuth } from '../../../utililties/customHook/useAuth'
import H1 from '../../elements/Title Header/H1'

type primaryAddressProps = {
    primaryAddress: AddressType | undefined
}
export default function PrimaryAddressCard({
    primaryAddress,
}: primaryAddressProps) {
    const { user } = useAuth()
    return (
        <>
            <div>
                <H1 fontSize="text-sm" fontWeight="font-normal">
                    Name :
                    <span className="ms-2 font-semibold">{user?.name}</span>
                </H1>
                <H1 fontSize="text-sm" fontWeight="font-normal">
                    Email :
                    <span className="ms-2 font-semibold">{user?.email}</span>
                </H1>
                <H1 fontSize="text-sm" fontWeight="font-normal">
                    Phone :
                    <span className="ms-2 font-semibold">
                        (+62){' '}
                        {user?.phone_number
                            ?.toString()
                            .replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1-$2-$3') ||
                            ''}
                    </span>
                </H1>
            </div>

            <hr className="my-1" />
            <div>
                {primaryAddress && (
                    <>
                        <H1 fontSize="text-sm">
                            Provinsi :{' '}
                            <span className="font-normal">
                                {primaryAddress.provinsi_name}
                            </span>
                        </H1>
                        <H1 fontSize="text-sm">
                            Kabupaten :{' '}
                            <span className="font-normal">
                                {primaryAddress.kabupaten_name}
                            </span>
                        </H1>
                        <H1 fontSize="text-sm">
                            Kecamatan :{' '}
                            <span className="font-normal">
                                {primaryAddress.kecamatan_name}
                            </span>
                        </H1>
                        <H1 fontSize="text-sm">
                            Kelurahan :{' '}
                            <span className="font-normal">
                                {primaryAddress.kelurahan_name}
                            </span>
                        </H1>
                        <H1 fontSize="text-sm">
                            Postal Code :{' '}
                            <span className="bg-barakaprimary-dessert/25 rounded px-1 font-normal">
                                {primaryAddress.postal_code}
                            </span>
                        </H1>
                        <hr className="my-1" />
                        <div className="">
                            <H1 fontSize="text-sm">Detail Address : </H1>
                            <p className="text-sm">{primaryAddress.detail}</p>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
