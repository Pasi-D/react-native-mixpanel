/**
 * Signup screen
 */

import React, { FC, useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import { Button, Input, Text } from "components/atoms";
import { useAuthContext } from "components/providers/AuthProvider";
import { RootStackNavProps } from "navigation/@types";
import LinearGradient from "react-native-linear-gradient";
import { useThemeContext } from "themes";
import { EventPropertyNames, EventsTracked, useMixpanel } from "utils/analytics";

import useStyles from "./signup.style";

interface ISignupProps extends RootStackNavProps<"Signup"> {}

const Signup: FC<ISignupProps> = ({ navigation }) => {
    const { theme } = useThemeContext();
    const styles = useStyles(theme);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState("");

    const { authorize } = useAuthContext();
    const { mixpanel, identifyMixpanelUser } = useMixpanel();

    const onPressSignup = async () => {
        if (!username && !password) {
            return;
        }
        await authorize({
            username,
            password,
        })
            .then(() => {
                mixpanel?.track(EventsTracked.SIGN_UP, {
                    [EventPropertyNames.SIGNUP_SUCCESSFUL]: true,
                });
                identifyMixpanelUser({ username });
            })
            .catch(err => {
                mixpanel?.track(EventsTracked.SIGN_UP, {
                    [EventPropertyNames.SIGNUP_SUCCESSFUL]: false,
                    [EventPropertyNames.SIGNUP_ERROR]: err.message,
                });
            });
    };

    const onPressLogin = () => {
        navigation.navigate("Login");
    };

    const isSignUpButtonDisabled = !fullName || !email || !username || !password;

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
                        placeholder="Full name"
                        inputStyle={styles.signupFieldText}
                        onChangeText={txt => setFullName(txt)}
                        value={fullName}
                        label={"Full Name"}
                    />
                    <Input
                        placeholder="email"
                        inputStyle={styles.signupFieldText}
                        onChangeText={txt => setEmail(txt)}
                        value={email}
                        label={"Email"}
                    />
                    <Input
                        placeholder="username"
                        inputStyle={styles.signupFieldText}
                        onChangeText={txt => setUsername(txt)}
                        value={username}
                        label={"Username"}
                    />
                    <Input
                        placeholder="Password"
                        inputStyle={styles.signupFieldText}
                        onChangeText={txt => setPassword(txt)}
                        value={password}
                        secureTextEntry={true}
                        autoCorrect={false}
                        label={"Password"}
                    />
                    <Button
                        title={"Sign Up"}
                        type="solid"
                        containerStyle={styles.signupButtonStyle}
                        onPress={onPressSignup}
                        disabled={isSignUpButtonDisabled}
                    />
                    <TouchableWithoutFeedback onPress={onPressLogin}>
                        <Text style={styles.loginText}>
                            Already have an account ? Login
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </LinearGradient>
        </View>
    );
};

export default Signup;
