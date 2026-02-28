import { Colors, ThemeType } from "@/constants/Colors";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Appearance, ColorSchemeName } from "react-native";

type ThemeProvideProps = {
  children: ReactNode;
};

export type ThemeContextType = {
  colorScheme: ColorSchemeName;
  theme: ThemeType;
  setColorScheme: Dispatch<SetStateAction<ColorSchemeName>>;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider = ({ children }: ThemeProvideProps) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <ThemeContext.Provider value={{ colorScheme, theme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
