import { Dimensions, StyleSheet } from "react-native";

import { normalize } from "react-native-elements";
import { ms, mvs } from "react-native-size-matters";
import { Theme } from "themes";

const { height } = Dimensions.get("window");

const styles = (theme: Theme) =>
    StyleSheet.create({
        cameraButton: {
            height: height / 6,
            width: height / 6,
            margin: mvs(10),
            backgroundColor: "#2089dc",
        },
        imageButton: {
            height: height / 6,
            width: height / 6,
            margin: mvs(10),
            backgroundColor: "#2189dc",
        },
        imageContainer: {
            alignSelf: "center",
            backgroundColor: theme.colors?.grey5,
            height: height / 5,
            width: height / 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 360,
            marginTop: mvs(10),
            marginBottom: mvs(20),
            overflow: "hidden",
        },
        imageStyle: { width: ms(200), height: mvs(200) },
        pageWrapper: {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            backgroundColor: theme.colors?.startupBGPrimary,
        },
        pageHeaderTitleWrapper: {
            flex: 2,
            paddingTop: mvs(30),
            minHeight: mvs(80),
        },
        pageHeaderTitle: {
            fontSize: normalize(30),
            marginHorizontal: ms(20),
            color: theme.colors?.white,
        },
        pageBody: {
            flex: 5,
        },
        pictureButtonContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
        },
    });

export default styles;
