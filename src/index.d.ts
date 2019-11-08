import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
interface IProps {
    debug?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    rowWrapperStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}
declare const WrappedText: React.FC<IProps>;
export default WrappedText;
