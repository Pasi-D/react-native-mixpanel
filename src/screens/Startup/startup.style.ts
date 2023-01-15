import { StyleSheet } from "react-native";

import { normalize } from "react-native-elements";
import { ms } from "react-native-size-matters";
import { Theme } from "themes";

const styles = (theme: Theme) =>
    StyleSheet.create({
        authButtonWrapper: {
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
        },
        linearGradientWrapper: {
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
        },
        loginButton: {
            width: ms(160),
            height: ms(40),
            borderRadius: 30,
        },
        loginButtonText: {
            color: (theme.Button as any).titleAppearances.titleColors.primary,
            fontSize: normalize(13),
            fontWeight: "bold",
            fontFamily: (theme.Button as Record<string, any>).titleAppearances.fontFamily,
        },
        rootContainer: {
            flex: 1,
        },
        titleText: {
            color: theme.Button?.titleAppearances?.titleColors?.primary,
            textAlign: "center",
        },
        titleWrapper: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        versionNumberWrapper: {
            alignSelf: "flex-end",
            paddingBottom: ms(5),
            paddingRight: ms(5),
        },
        versionText: {
            color: theme.Button?.titleAppearances?.titleColors?.primary,
            fontSize: normalize(12),
        },
    });

export default styles;
