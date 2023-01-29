/**
 * Login screen
 */

import React, { FC, useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import { Button, Input, Text } from "components/atoms";
import { useAuthContext } from "components/providers/AuthProvider";
import { RootStackNavProps } from "navigation/@types";
import LinearGradient from "react-native-linear-gradient";
import { useThemeContext } from "themes";
import { EventPropertyNames, EventsTracked, useMixpanel } from "utils/analytics";

import useStyles from "./login.style";

interface ILoginProps extends RootStackNavProps<"Login"> {}

const Login: FC<ILoginProps> = ({ navigation }) => {
    const { theme } = useThemeContext();
    const styles = useStyles(theme);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { authorize } = useAuthContext();
    const { mixpanel, identifyMixpanelUser } = useMixpanel();

    const onPressLogin = async () => {
        if (!username && !password) {
            return;
        }
        await authorize({
            username,
            password,
        })
            .then(() => {
                identifyMixpanelUser({ username });
                mixpanel?.track(EventsTracked.LOGIN, {
                    [EventPropertyNames.LOGIN_SUCCESSFUL]: true,
                });
            })
            .catch(err => {
                mixpanel?.track(EventsTracked.LOGIN, {
                    [EventPropertyNames.LOGIN_SUCCESSFUL]: false,
                    [EventPropertyNames.LOGIN_ERROR]: err.message,
                });
            });
    };

    const onPressSignup = () => {
        navigation.navigate("Signup");
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
                <View style={styles.loginFieldsWrapper}>
                    <Input
                        placeholder="username"
                        inputStyle={styles.loginFieldText}
                        onChangeText={txt => setUsername(txt)}
                        value={username}
                        label={"Username"}
                    />
                    <Input
                        placeholder="password"
                        inputStyle={styles.loginFieldText}
                        onChangeText={txt => setPassword(txt)}
                        value={password}
                        secureTextEntry={true}
                        autoCorrect={false}
                        label={"Password"}
                    />
                    <Button
                        title={"Login"}
                        type="solid"
                        containerStyle={styles.loginButtonStyle}
                        onPress={onPressLogin}
                        disabled={!username || !password}
                    />
                    <TouchableWithoutFeedback onPress={onPressSignup}>
                        <Text style={styles.signUpText}>
                            Don't have an account ? Signup
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </LinearGradient>
        </View>
    );
};

export default Login;
