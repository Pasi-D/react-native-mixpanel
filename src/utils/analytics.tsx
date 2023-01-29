/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from "react";

import { IAuthenticateData } from "components/providers/AuthProvider";
import accessEnv from "helpers/accessEnv";
import { Mixpanel, MixpanelProperties } from "mixpanel-react-native";

import { createUUID } from "./core";

type UploadMethods = "Front Camera" | "Back Camera" | "Storage";

interface MixpanelProviderProps {
    children: React.ReactNode;
}

// eslint-disable-next-line no-shadow
export enum EventsTracked {
    WELCOME = "Welcome",
    SIGN_UP = "Sign Up",
    LOGIN = "Login",
    ANALYZE_IMAGE = "Analyze Image",
}

// eslint-disable-next-line no-shadow
export enum EventPropertyNames {
    SIGNUP_SUCCESSFUL = "sign up successful",
    SIGNUP_ERROR = "sign up error",
    LOGIN_SUCCESSFUL = "login successful",
    LOGIN_ERROR = "login error",
    UPLOAD_METHOD = "upload method",
    TIME_FOR_ANALYZE = "time for analyze process",
    CANCELLED_UPLOAD_BUTTON_PRESS = "cancelled during upload button press",
    CANCELLED_CAMERA_BUTTON_PRESS = "cancelled during camera button press",
    CAMERA_BUTTON_PRESSED = "camera button pressed",
    UPLOAD_BUTTON_PRESSED = "upload button pressed",
    IS_ANALYZE_SUCCESS = "analyzed successfully",
}

// eslint-disable-next-line no-shadow
export enum UserIdentityProperties {
    USER_NAME = "username",
}

interface EventProperties extends MixpanelProperties {
    [EventsTracked.WELCOME]: Record<string, unknown>;
    [EventsTracked.SIGN_UP]: {
        [EventPropertyNames.SIGNUP_SUCCESSFUL]: boolean;
        [EventPropertyNames.SIGNUP_ERROR]?: string;
    };
    [EventsTracked.LOGIN]: {
        [EventPropertyNames.LOGIN_SUCCESSFUL]: boolean;
        [EventPropertyNames.LOGIN_ERROR]?: string;
    };
    [EventsTracked.ANALYZE_IMAGE]: {
        [EventPropertyNames.CAMERA_BUTTON_PRESSED]: boolean;
        [EventPropertyNames.UPLOAD_BUTTON_PRESSED]: boolean;
        [EventPropertyNames.UPLOAD_METHOD]: UploadMethods;
        [EventPropertyNames.TIME_FOR_ANALYZE]: number;
        [EventPropertyNames.CANCELLED_CAMERA_BUTTON_PRESS]: boolean;
        [EventPropertyNames.CANCELLED_UPLOAD_BUTTON_PRESS]: boolean;
        [EventPropertyNames.IS_ANALYZE_SUCCESS]: boolean;
    };
}

interface TailoredMixpanel extends Mixpanel {
    track: <T extends `${EventsTracked}`>(
        eventName: T,
        properties: Partial<EventProperties[T]>,
    ) => void;
}

interface MixpanelCtxProps {
    /**
     * Mixpanel tracking instance
     */
    mixpanel: TailoredMixpanel | null;
    /**
     * Identify mixpanel user & add user profile properties
     */
    identifyMixpanelUser: (user: Omit<IAuthenticateData, "password">) => void;
}

const initialContext: MixpanelCtxProps = {
    mixpanel: null,
    identifyMixpanelUser: () => {},
};

const MixpanelContext = createContext<MixpanelCtxProps>(initialContext);

const MixpanelProvider: React.FC<MixpanelProviderProps> = ({ children }) => {
    const [mixpanel, setMixpanel] = useState<TailoredMixpanel | null>(null);

    useEffect(() => {
        const mixpanelToken = accessEnv("MIXPANEL_PROJECT_TOKEN");
        const mixpanelInstance = new Mixpanel(mixpanelToken, false);
        mixpanelInstance.init();
        setMixpanel(mixpanelInstance);
    }, []);

    const identifyMixpanelUser = (user: Omit<IAuthenticateData, "password">) => {
        mixpanel?.identify(createUUID());
        mixpanel?.getPeople().set(UserIdentityProperties.USER_NAME, user.username);
    };

    return (
        <MixpanelContext.Provider value={{ mixpanel, identifyMixpanelUser }}>
            {children}
        </MixpanelContext.Provider>
    );
};

export const useMixpanel = () => useContext(MixpanelContext);

export default MixpanelProvider;
