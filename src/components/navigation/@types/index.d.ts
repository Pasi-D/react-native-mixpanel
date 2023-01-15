/**
 * Navigation related types
 */

import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackNavParamList = {
    Startup: undefined;
    Login: undefined;
};

export type RootStackNavProps<T extends keyof RootStackNavParamList> = {
    navigation: StackNavigationProp<RootStackNavParamList, T>;
};

export type HomeStackNavParamList = {
    Home: undefined;
};

export type HomeStackNavProps<T extends keyof HomeStackNavParamList> = {
    navigation: StackNavigationProp<HomeStackNavParamList, T>;
};
