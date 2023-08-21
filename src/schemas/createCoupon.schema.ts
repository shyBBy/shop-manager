import * as yup from "yup";

export const createCouponSchema = yup.object().shape({
    code: yup.string().required('Nazwa kuponu jest wymagana'),
    discount_type: yup.string().required('Typ kuponu jest wymagany'),
    date_expires: yup.string().required('Data ważności jest wymagana'),
    individual_use: yup.boolean().required('To pole jest wymagane'),
    usage_limit_per_user: yup.number().required('To pole jest wymagane'),
    amount: yup.string().required('Wartość kuponu jest wymagana'),
    exclude_sale_items: yup.boolean().required('To pole jest wymagane'),
});