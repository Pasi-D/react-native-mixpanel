/**
 * Login screen
 */

import React, { FC, useState } from "react";
import { View } from "react-native";

import { Button, Input } from "components/atoms";
import { useAuthContext } from "components/providers/AuthProvider";
import { RootStackNavProps } from "navigation/@types";
import LinearGradient from "react-native-linear-gradient";
import { useThemeContext } from "themes";

import useStyles from "./login.style";

interface ILoginProps extends RootStackNavProps<"Login"> {}

const Login: FC<ILoginProps> = () => {
    const { theme } = useThemeContext();
    const styles = useStyles(theme);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { authorize } = useAuthContext();

    const onPressLogin = async () => {
        await authorize({
            username,
            password,
        });
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
                </View>
            </LinearGradient>
        </View>
    );
};

export default Login;
