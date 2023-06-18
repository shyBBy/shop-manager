import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email('Login musi być poprawnym adresem e-mail').required('E-mail jest wymagany'),
    password: yup.string().min(6, 'Hasło musi być dłuższe niż 6 znaków').required('Hasło jest wymagane'),
});