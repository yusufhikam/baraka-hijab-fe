import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import createAddress from '../api/addresses/createAddress'
import { AddressType, AddressTypePayload } from '../../types/AddressType'
import ToastSweetAlert from '../../components/elements/Alert/Toast/ToastSweetAlert'
import deleteAddress from '../api/addresses/deleteAddress'
import { useMemo, useState } from 'react'
import getAddress from '../api/addresses/getAddress'
import setPrimaryAddress from '../api/addresses/setPrimaryAddress'
import updateAddress from '../api/addresses/updateAddress'
import { useForm } from 'react-hook-form'
import { calculateCostType, cekOngkir } from '../api/CekOngkir/cekOngkir'
import { useCart } from './useCart'
import { useSearchParams } from 'react-router-dom'

// GET DATA ADDRESS

export const useGetAddress = () => {
    const { data: addresses, isLoading: isLoadingAddresses } = useQuery({
        queryKey: ['addresses'],
        queryFn: () => getAddress(),
        staleTime: 1000 * 60 * 5, // for 5 minutes
    })

    return { addresses, isLoadingAddresses }
}

// POST DATA ADDRESS
export const useCreateAddress = () => {
    const queryClient = useQueryClient()
    const { reset } = useForm()

    const {
        mutate: storeAddress,
        isPending: isLoadingStoreAddress,
        isSuccess: isSuccessAddAddress,
    } = useMutation({
        mutationFn: (data: AddressTypePayload) => createAddress(data),
        onSuccess: () => {
            ToastSweetAlert({
                iconToast: 'success',
                titleToast: 'Address has been added',
            })
            queryClient.invalidateQueries({ queryKey: ['addresses'] })
            reset() // resetting form input
        },
        onError: () => {
            ToastSweetAlert({
                iconToast: 'error',
                titleToast: 'Failed to add an address',
            })
        },
    })
    return { storeAddress, isLoadingStoreAddress, isSuccessAddAddress }
}
// END POST DATA ADDRESS

// DELETE DATA ADDRESS
export const useDeleteAddress = () => {
    const queryClient = useQueryClient()

    const { mutate, isPending: loadingDeleteAddress } = useMutation({
        mutationFn: (addressId: number) => deleteAddress(addressId),
        onSuccess: () => {
            ToastSweetAlert({
                iconToast: 'success',
                titleToast: 'Address successfully deleted',
            })
            queryClient.invalidateQueries({ queryKey: ['addresses'] })
        },
        onError: () => {
            ToastSweetAlert({
                iconToast: 'error',
                titleToast: 'Failed to delete address',
            })
        },
    })

    return { mutate, loadingDeleteAddress }
}

// END DELETE DATA ADDRESS

// SET MAIN ADDRESS
export const useSetPrimaryAddress = () => {
    // untuk open menu button action [delete, edit, modal detail, set main address]
    const [openMenuAction, setOpenMenuAction] = useState<{
        isOpen: boolean
        addressId: number | null
    }>({
        isOpen: false,
        addressId: null,
    })

    const queryClient = useQueryClient() // for invalidate cache
    // update main address
    const { mutate: setMainAddress, isPending } = useMutation({
        mutationFn: (addressId: number) => setPrimaryAddress(addressId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] })
            ToastSweetAlert({
                iconToast: 'success',
                titleToast: 'Success set main address',
            })
        },
        onError: () => {
            ToastSweetAlert({
                iconToast: 'error',
                titleToast: 'Failed set main address',
            })
        },
    })

    return {
        setMainAddress,
        isPending,
        openMenuAction,
        setOpenMenuAction,
    }
}
// END SET MAIN ADDRESS

// ♻️ UPDATE ADDRESS
export const useUpdateAddress = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient()

    const { mutate: updateAddressData, isPending: isLoadingUpdate } =
        useMutation({
            mutationFn: ({
                addressId,
                data,
            }: {
                addressId: number | undefined
                data: AddressTypePayload
            }) => updateAddress({ addressId, data }),
            onSuccess: () => {
                ToastSweetAlert({
                    iconToast: 'success',
                    titleToast: 'Address successfully updated',
                })
                queryClient.invalidateQueries({ queryKey: ['addresses'] })

                // close modal edit
                if (onSuccessCallback) {
                    onSuccessCallback()
                }
            },
            onError: () => {
                ToastSweetAlert({
                    iconToast: 'error',
                    titleToast: 'Address failed to update',
                })
            },
        })

    return {
        updateAddressData,
        isLoadingUpdate,
    }
}

type useCalculatingShippingProps = {
    address: AddressType | undefined
    courier: string
}

export const useCalculateShipping = ({
    address,
    courier,
}: useCalculatingShippingProps) => {
    const [, setSearchParams] = useSearchParams()
    const { carts } = useCart()
    const [courierShipping, setCourierShipping] = useState<
        calculateCostType[] | null
    >(null)

    const itemsWeight = useMemo(() => {
        return carts?.reduce(
            (acc, item) => acc + item.productVariant.weight * item.quantity,
            0
        )
    }, [carts])

    const { mutate, isPending } = useMutation({
        mutationFn: () =>
            cekOngkir({
                origin: '52965', // hard code for origin shipping postal code from Sale Rembang
                destination: address?.postal_code,
                weight: itemsWeight,
                courier,
            }),
        onError: () => {
            ToastSweetAlert({
                iconToast: 'error',
                titleToast: 'Failed to calculate shipping',
            })
        },
        onSuccess: (data) => {
            if (data) {
                setCourierShipping(data)
                setSearchParams({ courier })
            }
        },
    })

    return { mutate, isPending, courierShipping }
}
