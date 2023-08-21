export const checkCouponIsExpired = (date_expires: string | Date) => {
    const targetDate = new Date(date_expires);
    const today = new Date();

    const isExpired =  today > targetDate;

    switch (isExpired) {
        case true:
            return "Przeterminowany";
        default:
            return "Ważny";
    }
}

