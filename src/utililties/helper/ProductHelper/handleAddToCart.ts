import { SweetAlert2 } from "sweetalert2-react-content";
import Api from "../../api/Auth/Api";
import { ProductType } from "../../../types/productType";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { CartType } from "../../../types/CartType";


type handleAddToCartProps = {
    quantity: Record<string, number>;
    setQuantity: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    isAuthenticated: boolean;
    selectedProductQuickView: ProductType | null;
    setQuantityError: React.Dispatch<React.SetStateAction<string | null>>;
    refreshCartData: (options?: RefetchOptions) => Promise<QueryObserverResult<CartType[], Error>>
    setIsLoadingQuantity?: React.Dispatch<React.SetStateAction<boolean>>
}

export const handleAddToCart = async (SweetAlert: SweetAlert2, { selectedProductQuickView, quantity, setQuantity, setQuantityError, isAuthenticated, refreshCartData, setIsLoadingQuantity }: handleAddToCartProps) => {
    
    // mengambil jumlah quantity
    const totalQty = Object.values(quantity).reduce((acc, qty) => acc + (qty || 0), 0);

    // untuk refresh data cart ketika sudah berhasil tambah data cart
    if (totalQty === 0) {
        setQuantityError('Please select at least one quantity');
        return
    }

    setQuantityError(null);

    // jika user sudah login add data to server
    if (isAuthenticated) {
        try {
            for (const variant of selectedProductQuickView?.productVariants ?? []) {
                const qty = quantity[variant.id];

                if (qty > 0) {
                    try {
                        setIsLoadingQuantity?.(true)
                        await Api.post('/carts', {
                            product_variant_id: variant.id,
                            quantity: qty
                        });
                    } catch (error) {
                        console.error(error);
                    }
                    finally {
                        setIsLoadingQuantity?.(false);
                    }
                }
            }

            SweetAlert.fire({
                icon: 'success',
                title: 'Added to Cart',
                showConfirmButton: false,
                timer: 1500,
            });

        } catch (error) {
            console.error(error);
            SweetAlert.fire('Error', 'Failed to Add to Cart', 'error');
        }

    } else { // jika belum login data disimpan di localstorage 'carts'


        // take older cart from localstorage or empty initialate array
        const storedCart = JSON.parse(localStorage.getItem('carts') || '[]');

        // add selected variants to cart

        const newCart = [...storedCart];

        selectedProductQuickView?.productVariants.forEach((variant) => {

            const qty = quantity[variant.id];

            if (qty > 0) {
                setIsLoadingQuantity?.(true);
                const existingItem = newCart.find((item) => item.product_variant_id === variant.id);


                if (existingItem) {
                    existingItem.quantity += qty;
                } else {
                    newCart.push({

                        product_variant_id: variant.id,
                        quantity: qty,
                        productVariant: {
                            id: variant.id,
                            stock: variant.stock,
                            color: variant.color,
                            size: variant.size,
                            product: {
                                id: selectedProductQuickView.id,
                                name: selectedProductQuickView.name,
                                price: selectedProductQuickView.price,
                                thumbnail: selectedProductQuickView.thumbnail,
                                slug: selectedProductQuickView.slug,
                                description: selectedProductQuickView.description,
                                subCategory: {
                                    id: selectedProductQuickView.subCategory.id,
                                    name: selectedProductQuickView.subCategory.name,
                                    category: {
                                        id: selectedProductQuickView.subCategory.category.id,
                                        name: selectedProductQuickView.subCategory.category.name
                                    }
                                }
                            }
                        }
                    });
                }

                setIsLoadingQuantity?.(false);
            }
        })

        localStorage.setItem('carts', JSON.stringify(newCart));

        SweetAlert.fire({
            icon: 'success',
            title: 'Added to Cart',
            showConfirmButton: false,
            timer: 1500,
        });
    }

    await refreshCartData();

    // reset quantity jadi 0
    const resetQuantity = Object.fromEntries(
        (selectedProductQuickView?.productVariants ?? []).map((variant) => [variant.id, 0])
    )

    setQuantity(resetQuantity);
}

