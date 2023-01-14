/**
 * Root/Startup related navigational stack
 */

import React, { FC } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { RootStackNavParamList } from "navigation/@types";
import { Login, Startup } from "screens";

const RootStack = createStackNavigator<RootStackNavParamList>();

export const RootStackNavigator: FC = () => {
    return (
        <RootStack.Navigator initialRouteName="Startup">
            <RootStack.Screen
                name="Startup"
                component={Startup}
                options={{ headerShown: false }}
            />
            <RootStack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
        </RootStack.Navigator>
    );
};
