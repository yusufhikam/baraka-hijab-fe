import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { CartType } from "../../../types/CartType";
import Api from "../../api/Auth/Api";
import React from "react";

type deleteItemCartPropsType = {
    isAuthenticated: boolean,
    refreshCartData: (options?: RefetchOptions) => Promise<QueryObserverResult<CartType[], Error>>
    productVariantId: number
    setIsLoadingDelete: React.Dispatch<React.SetStateAction<boolean>>
}

const handleDeleteItemCart = async ({ isAuthenticated, refreshCartData, productVariantId, setIsLoadingDelete }: deleteItemCartPropsType) => {
    if (isAuthenticated) {
        try {
            setIsLoadingDelete(true);
            await Api.delete(`/carts/${productVariantId}`);
            refreshCartData();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingDelete(false);
        }
    } else {
        // jika user belum login
        setIsLoadingDelete(true);
        // mencari data cart di localstorage
        const storedCart = JSON.parse(localStorage.getItem('carts') || '[]');
        // menghapus / filter data cart yang tidak sama dengan id
        const updatedCart = storedCart.filter((cart: CartType) => cart.productVariant.id !== productVariantId);

        if (updatedCart.length > 0) {
            localStorage.setItem('carts', JSON.stringify(updatedCart));
        } else {
            localStorage.removeItem('carts');
        }


        setIsLoadingDelete(false);
        await refreshCartData();

    }
}

export default handleDeleteItemCart;