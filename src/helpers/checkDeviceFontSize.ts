import {Dimensions, useWindowDimensions} from "react-native";

export const checkDeviceFontSize = () => {
    const {width, height} = useWindowDimensions();
    // Pobierz szerokość ekranu
    const screenWidth = Dimensions.get('window').width;

    // Pobierz skale czcionki systemowej (współczynnik)
    const fontScale = Dimensions.get('window').fontScale;

    // Ustal rozmiar czcionki XL (przykładowo)
    const fontSizeXL = 20;

    // Oblicz rzeczywisty rozmiar czcionki, uwzględniając skalę
    const actualFontSize = fontSizeXL * fontScale;

    // Ustaw bigScreenSize na true, jeśli rzeczywisty rozmiar czcionki jest większy niż założony próg
    const bigScreenSize = actualFontSize > 20; // Możesz dostosować próg według swoich potrzeb

    return bigScreenSize
}