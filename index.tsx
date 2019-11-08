import React from 'react';
import {Text, View, StyleProp, ViewStyle, StyleSheet, TextStyle} from 'react-native';

interface IProps {
    debug?:boolean;
    style?:StyleProp<ViewStyle>;
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
const WrappedText:React.FC<IProps> = ({debug, textStyle, style, children}) => {
    function renderWrappedText(text:string){
        const textMatrix = getTextMatrix(text);

        return(
            <View
                style={[
                    styles.container,
                    style,
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
                                    getDebugStyle(debug)
                                ]}
                            >
                                {
                                    rowText.map((colText,colIndex) =>
                                        colText !== "" &&
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
