import { useContext } from "react";

import { FullTheme, ButtonProps, ThemeContext } from "react-native-elements";
import { Colors } from "react-native-elements/dist/config/colors";
import { ThemeProps } from "react-native-elements/dist/config/ThemeProvider";
import { RecursivePartial } from "utils/core";

interface IExtendedThemeButtonProps extends Partial<ButtonProps> {
    titleAppearances?: {
        titleColors?: {
            primary: string;
        };
        fontFamily?: string;
    };
    colors?: {
        startupBtnGradientPrimary?: string;
        startupBtnGradientSecondary?: string;
        primary?: string;
        secondary?: string;
        alert?: string;
    };
}

interface IExtendedThemeColorProps extends RecursivePartial<Colors> {
    readonly darkBg: string;
    readonly startupBGPrimary: string;
    readonly startupBGSecondary: string;
}

export interface Theme extends Partial<FullTheme> {
    Button?: IExtendedThemeButtonProps;
    colors?: Partial<IExtendedThemeColorProps>;
}

export const useThemeContext = () => useContext<ThemeProps<Theme>>(ThemeContext);

const theme: Theme = {
    Button: {
        raised: true,
        titleAppearances: {
            titleColors: {
                primary: "#FFF",
            },
            fontFamily: "Montserrat",
        },
        colors: {
            startupBtnGradientPrimary: "#0AE2E2",
            startupBtnGradientSecondary: "#697EF9",
            primary: "#2089dc",
            secondary: "#2189dc",
            alert: "#f44336",
        },
    },
    colors: {
        darkBg: "#0F0F0F",
        startupBGPrimary: "#062E58",
        startupBGSecondary: "#041427",
    },
};

export default theme;
