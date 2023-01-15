import React, { FC, useState } from "react";
import { View } from "react-native";

import { Button, Image, Text } from "components/atoms";
import { HomeStackNavProps } from "navigation/@types";
import { useThemeContext } from "themes";

import useStyles from "./imageAnalyzer.style";

interface ImageAnalyzerProps extends HomeStackNavProps<"Home"> {}

const placeHolderImage = require("assets/images/portrait-placeholder.jpg");

const ImageAnalyzer: FC<ImageAnalyzerProps> = () => {
    const { theme } = useThemeContext();
    const styles = useStyles(theme);

    const [image, setImage] = useState<any | null>(null);

    const onPressUpload = () => {};

    const onCameraPress = () => {};

    return (
        <View style={styles.pageWrapper}>
            <View style={styles.pageHeaderTitleWrapper}>
                <Text h1 style={styles.pageHeaderTitle}>
                    Upload Image
                </Text>
            </View>
            <View style={styles.pageBody}>
                <View style={styles.imageContainer}>
                    {image ? (
                        <Image source={image} style={styles.imageStyle} />
                    ) : (
                        <Image source={placeHolderImage} style={styles.imageStyle} />
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
            </View>
        </View>
    );
};

export default ImageAnalyzer;
