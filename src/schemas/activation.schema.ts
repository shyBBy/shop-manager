import * as yup from "yup";

export const activationSchema = yup.object().shape({
    activationCode: yup.string().required('Kod Aktywacyjny jest wymagany!'),
    email: yup.string().email('E-mail jest niepoprawny').required('Adres e-mail jest wymagany')
});