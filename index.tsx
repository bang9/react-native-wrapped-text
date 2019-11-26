import React from 'react';
import {Text, View, StyleProp, ViewStyle, StyleSheet, TextStyle} from 'react-native';

interface IProps {
    debug?:boolean;
    containerStyle?:StyleProp<ViewStyle>;
    rowWrapperStyle?:StyleProp<ViewStyle>;
    textStyle?:StyleProp<TextStyle>;
}

function getDebugStyle(debug?:boolean) {
    return debug ? styles.debugStyle : {}
}

function getWordSpace(textLen:number, currentIndex:number) {
    return currentIndex !== textLen - 1 ? ' ' : ''
}

function getTextMatrix(text:string) {
    return text.split('\n').map(row => row.split(' '));
}

//@ts-ignore
const WrappedText:React.FC<IProps> = ({debug, containerStyle, rowWrapperStyle, textStyle, children}) => {
    if(!children){
        return null;
    }

    function renderWrappedText(text:string){
        const textMatrix = getTextMatrix(text);

        return(
            <View
                style={[
                    styles.container,
                    containerStyle,
                    getDebugStyle(debug)
                ]}
            >
                {
                    textMatrix.map((rowText,rowIndex) => {
                        return(
                            <View
                                key={`${rowText}-${rowIndex}`}
                                style={[
                                    styles.rowWrapper,
                                    rowWrapperStyle,
                                    getDebugStyle(debug)
                                ]}
                            >
                                {
                                    rowText.map((colText,colIndex) =>
                                        (colText !== "" || (rowText.length === 1 && colText === "")) &&
                                        <Text
                                            key={`${colText}-${colIndex}`}
                                            style={[textStyle, getDebugStyle(debug)]}
                                        >
                                            {colText + getWordSpace(rowText.length, colIndex)}
                                        </Text>
                                    )
                                }
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    if(typeof children === 'string'){
        return renderWrappedText(children);
    }

    if(Array.isArray(children)){
        return children.map(child => {
            if(typeof child === 'string'){
                return renderWrappedText(child);
            } else {
                return child;
            }
        });
    }

    return children;
};

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        alignSelf:'center',
        width:'100%',
    },
    rowWrapper: {
        flexDirection:'row',
        flexWrap:'wrap',
    },
    debugStyle:{
        borderWidth:0.5,
        borderColor:'rgba(255,60,60,0.7)'
    }
});

export default WrappedText;
