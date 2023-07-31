import React from "react";
import {Text, Card} from "react-native-paper";

export const RegisterDescribe = () => {
    return(
        <>
            <Card>
                <Text style={{textAlign: 'justify'}}>
                    Proces tworzenia konta w naszej aplikacji jest prosty. Użytkownik po prostu podaje niezbędne dane, takie jak adres e-mail i hasło, a następnie może zalogować się używając tych danych. Jeśli to nowe konto, użytkownik zostanie poproszony o skonfigurowanie swojego sklepu. Po pomyślnym zalogowaniu i konfiguracji sklepu, użytkownik może swobodnie korzystać z aplikacji, zarządzając sklepem, przeglądając produkty, obsługując zamówienia i generując raporty. Warto podkreślić, że nasza aplikacja dba o bezpieczeństwo danych. Hasła użytkowników są zahaszowane i przechowywane w formie zaszyfrowanej.
                </Text>
            </Card>
        </>
    )
}