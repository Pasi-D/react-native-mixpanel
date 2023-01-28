import { StyleSheet } from "react-native";

import { normalize } from "react-native-elements";
import { ms, mvs } from "react-native-size-matters";
import { Theme } from "themes";

const styles = (theme: Theme) =>
    StyleSheet.create({
        linearGradientWrapper: {
            flex: 1,
            alignItems: "stretch",
            justifyContent: "space-between",
            width: "100%",
        },
        loginFieldsWrapper: {
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: ms(10),
        },
        signupFieldText: {
            color: "white",
        },
        signupButtonStyle: {
            borderRadius: 30,
        },
        rootContainer: {
            flex: 1,
        },
        loginText: {
            color: theme.colors?.primary,
            marginTop: mvs(15),
            fontSize: normalize(15),
        },
    });

export default styles;
