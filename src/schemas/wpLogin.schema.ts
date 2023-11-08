import * as yup from "yup";

export const wpLoginSchema = yup.object().shape({
    username: yup.string().required('Nazwa użytkownika jest wymagana.'),
    password: yup.string().min(2, `Hasło musi być dłuższe niż '8' znaków.`).required('Hasło jest wymagane.'),
})