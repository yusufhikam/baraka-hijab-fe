export default function useFormatCurrency() {
    // number formater for price
    const formatCurrency = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    return { formatCurrency }
}
