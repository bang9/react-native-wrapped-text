import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
interface IProps {
    debug?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}
declare const WrappedText: React.FC<IProps>;
export default WrappedText;
