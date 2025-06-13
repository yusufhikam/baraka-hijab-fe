export type AddressType = {
    id: number
    provinsi: string
    kabupaten: string
    kecamatan: string
    kelurahan: string
    postal_code: string
    detail: string
    is_primary: boolean
}

export type AddressTypePayload = Pick<
    AddressType,
    | 'provinsi'
    | 'kabupaten'
    | 'kecamatan'
    | 'kelurahan'
    | 'postal_code'
    | 'detail'
>
