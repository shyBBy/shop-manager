import React from "react";
import {Card, Text} from "react-native-paper";


export const WpLoginDescription = () => {
    return(
        <>
            <Card>
                <Text style={{textAlign: 'justify', padding: 5}}>
                    Autoryzacja za pomocą danych z WordPress jest niezbędna, aby potwierdzić Twoją tożsamość jako właściciela sklepu. To proces, który umożliwia bezpieczne korzystanie z aplikacji, zapewniając jednocześnie pełen dostęp do funkcji sklepu oraz ochronę Twoich danych.
                </Text>
            </Card>
        </>
    )
}