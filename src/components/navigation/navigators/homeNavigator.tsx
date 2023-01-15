import React, { FC } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackNavParamList } from "navigation/@types";
import { ImageAnalyzer } from "screens";

interface IHomeStackRouteProps {}

const HomeStack = createStackNavigator<HomeStackNavParamList>();

export const HomeStackNavigator: FC<IHomeStackRouteProps> = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={ImageAnalyzer}
                options={{ headerShown: false }}
            />
        </HomeStack.Navigator>
    );
};
