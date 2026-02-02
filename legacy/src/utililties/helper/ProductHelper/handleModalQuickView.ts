import React from "react"
import { ProductResponseType } from "../../api/products/getProducts"
import { ProductType } from "../../../types/productType"


type ModalQuickTypeProps = {
    setModalQuickView: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedProductQuickView: (p: ProductType | null) => void,
    data: ProductResponseType | undefined
}
export const handleModalQuickView = (id: number, props: ModalQuickTypeProps) => {
    const { data, setModalQuickView, setSelectedProductQuickView } = props;
    const product = data?.data.find((item) => item.id === id);

    if (product) {
        setModalQuickView(true)
        setSelectedProductQuickView(product)
    } else {
        console.log('Product Not Found')
    }
}