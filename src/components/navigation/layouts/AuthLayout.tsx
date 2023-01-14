import React, { FC } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { useAuthContext } from "components/providers/AuthProvider";
import { HomeStackNavigator, RootStackNavigator } from "navigation/navigators";

interface IAuthLayoutProps {}

const AuthLayout: FC<IAuthLayoutProps> = () => {
    const { authData: authCtxData } = useAuthContext();

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
