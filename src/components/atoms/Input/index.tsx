import React, { FC } from "react";

import { Input as RNEInput, InputProps as RNEInputProps } from "react-native-elements";

interface InputProps extends RNEInputProps {}

export const Input: FC<InputProps> = props => {
    return <RNEInput {...props} />;
};
