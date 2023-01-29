import accessEnv from "helpers/accessEnv";

/**
 * Modifies or overrides original Type/Interface's properties.
 */
export type TypeModifier<T, R> = Omit<T, keyof R> & R;

export type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

/**
 * Returns version name of the app
 */
export const getAppVersionName = (): string => {
    let version = `v.${accessEnv("MAJOR_VERSION")}.${accessEnv(
        "MINOR_VERSION",
    )}.${accessEnv("PATCH_VERSION")}`;
    if (accessEnv("PRE_RELEASE", undefined) !== undefined) {
        version = version.concat(`-${accessEnv("PRE_RELEASE")}`);
    }
    return version;
};

/**
 * Generate a UUID string
 * @returns a UUID
 */
export const createUUID = () => {
    let dt = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        // eslint-disable-next-line no-bitwise
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        // eslint-disable-next-line no-bitwise
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
};
