export type AddressType = {
    id: number | undefined
    provinsi: string
    provinsi_name: string | undefined
    kabupaten: string
    kabupaten_name: string | undefined
    kecamatan: string
    kecamatan_name: string | undefined
    kelurahan: string
    kelurahan_name: string | undefined
    postal_code: string
    detail: string
    is_primary: boolean
}

export type AddressTypePayload = Pick<
    AddressType,
    | 'provinsi'
    | 'provinsi_name'
    | 'kabupaten'
    | 'kabupaten_name'
    | 'kecamatan'
    | 'kecamatan_name'
    | 'kelurahan'
    | 'kelurahan_name'
    | 'postal_code'
    | 'detail'
>
