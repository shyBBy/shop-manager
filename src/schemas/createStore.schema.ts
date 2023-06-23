import * as yup from "yup";

export const createStoreSchema = yup.object().shape({
    name: yup.string().required('Nazwa sklepu jest wymagana.'),
    url: yup.string().url().required('Adres url jest wymagany'),
    consumer_key: yup.string().required('Klucz klienta wymagany'),
    consumer_secret: yup.string().required('Klucz sekretny wymagany')
});