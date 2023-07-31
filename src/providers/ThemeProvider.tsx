// Domyślny motyw
import {darkTheme, lightTheme} from "../theme";
import {Appearance} from "react-native";
import {createContext, useContext, useState} from "react";

interface ThemeProviderProps {
    children: React.ReactNode;
}

const defaultTheme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;

// Tworzymy kontekst, który będzie dostarczał wybrany motyw
const ThemeContext = createContext({
    theme: defaultTheme,
    toggleTheme: () => {},
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState(defaultTheme);

    // Funkcja do zmiany motywu między jasnym a ciemnym
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook do pobierania aktualnego motywu
export const useTheme = () => useContext(ThemeContext).theme;