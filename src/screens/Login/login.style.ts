import { StyleSheet } from "react-native";

import { moderateScale } from "react-native-size-matters";
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
            marginHorizontal: moderateScale(10),
        },
        loginFieldText: {
            color: "white",
        },
        loginButtonStyle: {
            borderRadius: 30,
        },
        rootContainer: {
            flex: 1,
        },
    });

export default styles;
