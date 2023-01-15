import React, { FC } from "react";

import { Text as RNEText, TextProps } from "react-native-elements";

interface ITextProps extends TextProps {}

export const Text: FC<ITextProps> = props => {
    return <RNEText {...props} />;
};
