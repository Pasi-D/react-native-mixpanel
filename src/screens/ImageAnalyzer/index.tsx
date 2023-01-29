import React, { FC, useState } from "react";
import { ImageURISource, Modal, View } from "react-native";

import { Button, Image as RNImage, Text } from "components/atoms";
import { useAuthContext } from "components/providers/AuthProvider";
import { HomeStackNavProps } from "navigation/@types";
import ImagePicker, { Image } from "react-native-image-crop-picker";
import Toast from "react-native-root-toast";
import { useThemeContext } from "themes";
import { EventPropertyNames, EventsTracked, useMixpanel } from "utils/analytics";

import useStyles from "./imageAnalyzer.style";

interface ImageAnalyzerProps extends HomeStackNavProps<"Home"> {}

const placeHolderImage = require("assets/images/portrait-placeholder.jpg");

const ANALYZED_RESULTS = ["Not Hot Dog", "Hot Dog"];

const ImageAnalyzer: FC<ImageAnalyzerProps> = () => {
    const { theme } = useThemeContext();
    const styles = useStyles(theme);

    const { logout } = useAuthContext();
    const { mixpanel } = useMixpanel();

    const [image, setImage] = useState<ImageURISource | null>(null);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    const onPressUpload = () => {
        mixpanel?.track(EventsTracked.ANALYZE_IMAGE, {
            [EventPropertyNames.UPLOAD_BUTTON_PRESSED]: true,
        });
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        })
            .then(img => {
                setImage({
                    uri: (img as Image).path,
                    width: (img as Image).width,
                    height: (img as Image).height,
                });
                mixpanel?.track(EventsTracked.ANALYZE_IMAGE, {
                    [EventPropertyNames.UPLOAD_METHOD]: "Storage",
                });
            })
            .catch(error => {
                console.log("error", error?.message);
                mixpanel?.track(EventsTracked.ANALYZE_IMAGE, {
                    [EventPropertyNames.CANCELLED_UPLOAD_BUTTON_PRESS]: true,
                });
            });
    };

    const onCameraPress = () => {
        mixpanel?.track(EventsTracked.ANALYZE_IMAGE, {
            [EventPropertyNames.CAMERA_BUTTON_PRESSED]: true,
        });
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        })
            .then(img => {
                setImage({
                    uri: (img as Image).path,
                    width: (img as Image).width,
                    height: (img as Image).height,
                });
                mixpanel?.track(EventsTracked.ANALYZE_IMAGE, {
                    [EventPropertyNames.UPLOAD_METHOD]: "Back Camera",
                });
            })
            .catch(error => {
                console.log("error", error?.message);
                mixpanel?.track(EventsTracked.ANALYZE_IMAGE, {
                    [EventPropertyNames.CANCELLED_CAMERA_BUTTON_PRESS]: true,
                });
            });
    };

    const onPressLogout = () => {
        setIsLogoutModalVisible(true);
    };

    const onRequestCloseLogoutModal = () => {
        setIsLogoutModalVisible(false);
    };

    const onConfirmedLogout = () => {
        logout();
        Toast.show("Logged out", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            delay: 0,
            backgroundColor: "transparent",
            animation: true,
            hideOnPress: true,
            shadow: true,
        });
        setIsLogoutModalVisible(false);
    };

    const onCancelLogout = () => {
        setIsLogoutModalVisible(false);
    };

    const onPressAnalyze = () => {
        const preDeterminedTime = Math.floor(Math.random() * 10000);
        setTimeout(() => {
            const randomBinary = Math.round(Math.random());
            Toast.show(ANALYZED_RESULTS[randomBinary], {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,
                delay: 0,
                backgroundColor: randomBinary ? "green" : "red",
                animation: true,
                hideOnPress: true,
                shadow: true,
            });
            mixpanel?.track(EventsTracked.ANALYZE_IMAGE, {
                [EventPropertyNames.IS_ANALYZE_SUCCESS]: true,
                [EventPropertyNames.TIME_FOR_ANALYZE]: preDeterminedTime,
            });
        }, preDeterminedTime);
    };

    return (
        <View style={styles.pageWrapper}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isLogoutModalVisible}
                onRequestClose={onRequestCloseLogoutModal}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Are you sure ?</Text>
                        <View style={styles.modalButtonRow}>
                            <View style={styles.modalButtonWrapper}>
                                <Button
                                    title={"Yes"}
                                    type={"solid"}
                                    onPress={onConfirmedLogout}
                                />
                            </View>
                            <View style={styles.modalButtonWrapper}>
                                <Button
                                    title={"No"}
                                    type={"solid"}
                                    buttonStyle={styles.cancelButton}
                                    onPress={onCancelLogout}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.pageHeaderTitleWrapper}>
                <Text h1 style={styles.pageHeaderTitle}>
                    Upload Image
                </Text>
            </View>
            <View style={styles.pageBody}>
                <View style={styles.imageContainer}>
                    {image ? (
                        <RNImage source={image} style={styles.imageStyle} />
                    ) : (
                        <RNImage source={placeHolderImage} style={styles.imageStyle} />
                    )}
                </View>
                <View style={styles.pictureButtonContainer}>
                    <Button
                        title={"Upload Photo"}
                        type={"solid"}
                        style={styles.imageButton}
                        onPress={onPressUpload}>
                        <Text>Upload</Text>
                    </Button>
                    <Button
                        title={"Take from camera"}
                        type={"solid"}
                        style={styles.cameraButton}
                        onPress={onCameraPress}
                    />
                </View>
                <View style={styles.pageBottom}>
                    <View style={styles.analyzeButtonWrapper}>
                        <Button
                            title={"Analyze"}
                            onPress={onPressAnalyze}
                            type="solid"
                            disabled={!image}
                        />
                    </View>
                    <View style={styles.logoutButtonWrapper}>
                        <Button
                            title={"Logout"}
                            type={"solid"}
                            buttonStyle={styles.logoutButton}
                            style={styles.logout}
                            onPress={onPressLogout}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ImageAnalyzer;
