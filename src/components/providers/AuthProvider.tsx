import React, {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    useContext,
    useReducer,
} from "react";

import { removeCredentialsFromStorage, saveCredentialsToStorage } from "utils/storage";

interface IAuthState {
    isAuthenticated: boolean;
    username?: string;
}

export interface IAuthenticateData {
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
     * Update Auth related state data
     */
    updateAuthData: (newAuthData: IAuthState) => void | Dispatch<Partial<IAuthState>>;
    /**
     * Handler function for Logout (token revocation & clearing secure storage data)
     */
    logout: () => void;
}

const defaultAuthState: IAuthState = {
    isAuthenticated: false,
};

const initialContext: IAuthCtxProps = {
    authData: defaultAuthState,
    authorize: async () => {},
    updateAuthData: () => {},
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
        await removeCredentialsFromStorage();
        dispatchAuthState(defaultAuthState);
    };

    const handleAuthorization = async (credentials: IAuthenticateData) => {
        try {
            await saveCredentialsToStorage(credentials);
            dispatchAuthState({
                isAuthenticated: true,
                username: credentials.username,
            });
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                authData: authState,
                authorize: handleAuthorization,
                updateAuthData: dispatchAuthState,
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
