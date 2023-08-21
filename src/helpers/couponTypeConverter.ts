export const  couponTypeConverter = (type: string) => {
    switch (type) {
        case "percent":
            return "Procentowy rabat";
        case "fixed_cart":
            return "Kwotowy rabat na koszyk";
        case "fixed_product":
            return "Kwotowy rabat na produkt";
        default:
            return type;
    }
}


export const couponTypeIndicator = (type: string) => {
    switch (type) {
        case "percent":
            return "%";
        case "fixed_cart":
            return "zł";
        case "fixed_product":
            return "zł";
        default:
            return type;
    }
}