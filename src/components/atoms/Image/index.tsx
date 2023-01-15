import React, { FC } from "react";

import { Image as RNEImage, ImageProps as RNEImageProps } from "react-native-elements";

interface ImageProps extends RNEImageProps {}

export const Image: FC<ImageProps> = props => {
    return <RNEImage {...props} />;
};
