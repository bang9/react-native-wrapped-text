import React from "react";
import { Text, StyleProp, ViewStyle, TextStyle, TextProps } from "react-native";
interface IProps {
    debug?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    rowWrapperStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    TextComponent?: typeof Text | React.FC<TextProps>;
}
declare const WrappedText: React.FC<IProps>;
export default WrappedText;
