import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthenticateData } from "components/providers/AuthProvider";

/**
 * Key used to store auth related data in async storage
 */
export const AUTHORIZATION_DATA_STORE_KEY = "AUTH_STORED";

export const saveCredentialsToStorage = async (credentials: IAuthenticateData) => {
    await AsyncStorage.setItem(AUTHORIZATION_DATA_STORE_KEY, JSON.stringify(credentials));
};

export const removeCredentialsFromStorage = async () => {
    await AsyncStorage.removeItem(AUTHORIZATION_DATA_STORE_KEY);
};

export const getCredentialsFromStorage = async (): Promise<IAuthenticateData | null> => {
    const credentialString = await AsyncStorage.getItem(AUTHORIZATION_DATA_STORE_KEY);
    if (credentialString) {
        return JSON.parse(credentialString);
    }
    return null;
};
