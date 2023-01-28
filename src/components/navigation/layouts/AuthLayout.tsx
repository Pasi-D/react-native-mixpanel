import React, { FC, useCallback, useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { ProgressIndicator } from "components/atoms";
import { useAuthContext } from "components/providers/AuthProvider";
import { HomeStackNavigator, RootStackNavigator } from "navigation/navigators";
import Toast from "react-native-root-toast";
import { getCredentialsFromStorage } from "utils/storage";

interface IAuthLayoutProps {}

const AuthLayout: FC<IAuthLayoutProps> = () => {
    const [loading, setLoading] = useState(true);

    const { authData: authCtxData, updateAuthData } = useAuthContext();

    const hydrateAuthData = useCallback(async () => {
        try {
            const credentials = await getCredentialsFromStorage();
            if (credentials) {
                updateAuthData({ isAuthenticated: true, username: credentials.username });
            }
            setLoading(false);
        } catch (error) {
            console.log("error :", error);
            setLoading(false);
            Toast.show("Error in authentication !", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                delay: 0,
                animation: true,
                hideOnPress: true,
                shadow: true,
            });
        }
    }, [updateAuthData]);

    useEffect(() => {
        hydrateAuthData();
    }, [hydrateAuthData]);

    if (loading) {
        return <ProgressIndicator />;
    }

    return (
        <NavigationContainer>
            {authCtxData.isAuthenticated ? (
                <HomeStackNavigator />
            ) : (
                <RootStackNavigator />
            )}
        </NavigationContainer>
    );
};

export default AuthLayout;
