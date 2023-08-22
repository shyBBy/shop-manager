import React from "react";
import {checkDeviceFontSize} from "../../../../helpers/checkDeviceFontSize";
import {CreateStoreForm} from "../../../../components/Forms/CreateStoreForm";
import {Card, Text} from "react-native-paper";
import {theme} from "../../../../theme";
import {StyleSheet, View} from "react-native";

export const StepThree = () => {
    const bigScreenSize = checkDeviceFontSize();
    return(
        <>
           <View style={{alignItems: 'center', marginTop: 20}}>
               <Text style={{marginLeft: 10, color: theme.colors.appBarTitleColor, fontFamily: 'BebasNeu', padding: 3, fontSize: bigScreenSize ? 17 : 18}}>2. Dodawanie sklepu</Text>
               <Card style={styles.card}>
                   <Text>Otwórz miejsce, w którym zapisałeś wygenerowane w poprzednim kroku klucze i je odpowiednio wklej w kolejnym etapie konfiguracji sklepu.</Text>
               </Card>

               <Card style={styles.card}>
                   <Text>Pamiętaj też o poprawnym ustawieniu adresu URL - "https://nazwa.pl" bez ukośnika na końcu. </Text>
               </Card>
           </View>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
        marginBottom: 5,
        padding: 10,
        borderRadius: 5,
        borderBottomColor: theme.colors.warning,
        borderStyle: 'solid',
        borderWidth: 1
    },
});