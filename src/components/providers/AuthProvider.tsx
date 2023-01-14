import React, { createContext, FC, ReactNode, useContext, useReducer } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface IAuthState {
    isAuthenticated: boolean;
    authUserEmail?: string;
}

interface IAuthenticateData {
    username: string;
    password: string;
}

interface IAuthProviderProps {
    children: ReactNode;
}

interface IAuthCtxProps {
    /**
     * Authentication related state data
     */
    authData: IAuthState;
    /**
     * Authorization function
     */
    authorize: (credentials: IAuthenticateData) => Promise<void>;
    /**
     * Handler function for Logout (token revocation & clearing secure storage data)
     */
    logout: () => void;
}

const AUTHORIZATION_DATA_STORE_KEY = "AUTH_STORED";

const defaultAuthState: IAuthState = {
    isAuthenticated: false,
};

const initialContext: IAuthCtxProps = {
    authData: defaultAuthState,
    authorize: async () => {},
    logout: () => {},
};

const AuthContext = createContext<IAuthCtxProps>(initialContext);

/**
 * Reducer function to update Context provider's auth state
 * @param state - current auth state
 * @param payload - New auth state data
 */
const authReducer = (state: IAuthState, payload: Partial<IAuthState>) => {
    return { ...state, ...payload };
};

const AuthCtxProvider: FC<IAuthProviderProps> = ({ children }) => {
    const [authState, dispatchAuthState] = useReducer(authReducer, defaultAuthState);

    const handleLogout = async () => {
        await AsyncStorage.removeItem(AUTHORIZATION_DATA_STORE_KEY);
        dispatchAuthState(defaultAuthState);
    };

    const handleAuthorization = async (credentials: IAuthenticateData) => {
        await AsyncStorage.setItem(
            AUTHORIZATION_DATA_STORE_KEY,
            JSON.stringify(credentials),
        );
        dispatchAuthState({
            isAuthenticated: true,
            authUserEmail: credentials.username,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                authData: authState,
                authorize: handleAuthorization,
                logout: handleLogout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook to utilize Auth context provider
 */
export const useAuthContext = () => useContext(AuthContext);

export default AuthCtxProvider;
