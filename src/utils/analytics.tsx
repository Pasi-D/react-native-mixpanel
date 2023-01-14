import React, { createContext, useContext, useEffect, useState } from "react";

import accessEnv from "helpers/accessEnv";
import { Mixpanel, MixpanelProperties } from "mixpanel-react-native";

interface MixpanelProviderProps {
    children: React.ReactNode;
}

// eslint-disable-next-line no-shadow
export enum EventsTracked {
    WELCOME = "Welcome",
}

type EventName = keyof typeof EventsTracked;

interface EventProperties extends MixpanelProperties {
    [EventsTracked.WELCOME]: Record<string, unknown>;
}

interface TailoredMixpanel extends Mixpanel {
    track: <T extends EventName>(
        eventName: T,
        properties: Partial<EventProperties[T]>,
    ) => void;
}

interface MixpanelCtxProps {
    /**
     * Mixpanel tracking instance
     */
    mixpanel: TailoredMixpanel | null;
}

const initialContext: MixpanelCtxProps = {
    mixpanel: null,
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

    return (
        <MixpanelContext.Provider value={{ mixpanel }}>
            {children}
        </MixpanelContext.Provider>
    );
};

export const useMixpanel = () => useContext(MixpanelContext);

export default MixpanelProvider;
