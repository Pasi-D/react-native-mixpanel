import React, { FC } from "react";

import { Button as RNEButton, ButtonProps } from "react-native-elements";

interface IButtonProps extends ButtonProps {}

export const Button: FC<IButtonProps> = props => {
    return <RNEButton {...props} />;
};
