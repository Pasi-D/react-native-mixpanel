import { Dimensions, StyleSheet } from "react-native";

import { normalize } from "react-native-elements";
import { ms, mvs } from "react-native-size-matters";
import { Theme } from "themes";

const { height } = Dimensions.get("window");

const styles = (theme: Theme) =>
    StyleSheet.create({
        analyzeButtonWrapper: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
        },
        cameraButton: {
            height: height / 6,
            width: height / 6,
            margin: mvs(10),
            backgroundColor: theme.Button?.colors?.primary,
        },
        cancelButton: {
            backgroundColor: theme.Button?.colors?.alert,
        },
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            opacity: 0.75,
        },
        imageButton: {
            height: height / 6,
            width: height / 6,
            margin: mvs(10),
            backgroundColor: theme.Button?.colors?.secondary,
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
        logout: {
            height: height / 6,
            width: height / 6,
            margin: mvs(10),
            color: theme.Button?.colors?.alert,
        },
        logoutButton: {
            backgroundColor: theme.Button?.colors?.alert,
        },
        logoutButtonWrapper: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: mvs(10),
        },
        modalView: {
            display: "flex",
            flex: 0.25,
            flexDirection: "column",
            backgroundColor: theme.colors?.white,
            borderRadius: ms(20),
            padding: ms(35),
            alignItems: "center",
            justifyContent: "center",
            shadowColor: theme.colors?.black,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        modalButtonWrapper: { padding: ms(15), backgroundColor: "transparent" },
        modalButtonRow: {
            flexDirection: "row",
        },
        pageBottom: { display: "flex", flex: 5, justifyContent: "center" },
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
