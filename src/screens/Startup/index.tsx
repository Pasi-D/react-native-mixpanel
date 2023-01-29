/**
 * Startup screen
 */

import React, { FC, useRef, useEffect } from "react";
import { Animated, View } from "react-native";

import { Button } from "components/atoms";
import { RootStackNavProps } from "navigation/@types";
import { Text } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { useThemeContext } from "themes";
import { EventsTracked, useMixpanel } from "utils/analytics";
import { getAppVersionName } from "utils/core";

import useStyles from "./startup.style";

interface IStartupProps extends RootStackNavProps<"Startup"> {}

const Startup: FC<IStartupProps> = ({ navigation }) => {
    const { theme } = useThemeContext();
    const styles = useStyles(theme);

    const headerOpacity = useRef(new Animated.Value(0)).current;

    const versionName = getAppVersionName();
    const { mixpanel } = useMixpanel();

    useEffect(() => {
        Animated.timing(headerOpacity, {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
        }).start();
        return () => {
            mixpanel?.track(EventsTracked.WELCOME, {});
        };
    }, [headerOpacity, mixpanel]);

    const navigateToLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.rootContainer}>
            <LinearGradient
                colors={[
                    theme.colors?.startupBGSecondary as string,
                    theme.colors?.startupBGPrimary as string,
                ]}
                style={styles.linearGradientWrapper}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0.05, 0.95]}>
                <View style={styles.titleWrapper}>
                    <Animated.View style={{ opacity: headerOpacity }}>
                        <Text h1 style={styles.titleText}>
                            Image Analyzer
                        </Text>
                    </Animated.View>
                </View>
                <View style={styles.authButtonWrapper}>
                    <Button
                        title="Login"
                        type="clear"
                        buttonStyle={styles.loginButton}
                        titleStyle={styles.loginButtonText}
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                            colors: [
                                theme.Button?.colors?.startupBtnGradientPrimary as string,
                                theme.Button?.colors
                                    ?.startupBtnGradientSecondary as string,
                            ],
                            start: { x: 0.55, y: 0 },
                        }}
                        onPress={navigateToLogin}
                    />
                </View>
                <View style={styles.versionNumberWrapper}>
                    <Text style={styles.versionText}>{versionName}</Text>
                </View>
            </LinearGradient>
        </View>
    );
};

export default Startup;
