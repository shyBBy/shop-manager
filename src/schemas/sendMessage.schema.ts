import * as yup from "yup";

export const sendMessageSchema = yup.object().shape({
    emailContent: yup.string().required('Treść wiadomości nie może być pusta'),
});