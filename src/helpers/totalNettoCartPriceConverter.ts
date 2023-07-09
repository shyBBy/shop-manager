export const totalNettoCartPriceConverter = (shipping_total: any, shipping_tax: any, cart_tax: any, total: any) => {
    //("shipping_total" - "shipping_tax") - "cart_tax" - "total"

    const value = parseFloat(total) - parseFloat(shipping_tax) - parseFloat(cart_tax) - parseFloat(shipping_total)
    return parseFloat(value.toFixed(2))
}