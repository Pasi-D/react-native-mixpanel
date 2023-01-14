import "react-native-gesture-handler";
import React, { FC } from "react";

import AuthProvider from "components/providers/AuthProvider";
import AuthLayout from "navigation/layouts/AuthLayout";
import { ThemeProvider } from "react-native-elements";
import { RootSiblingParent } from "react-native-root-siblings";
import theme from "themes";
import MixpanelProvider from "utils/analytics";

const App: FC = () => {
    return (
        <MixpanelProvider>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <RootSiblingParent>
                        <AuthLayout />
                    </RootSiblingParent>
                </AuthProvider>
            </ThemeProvider>
        </MixpanelProvider>
    );
};

export default App;
