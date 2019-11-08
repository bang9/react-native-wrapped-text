import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
function getDebugStyle(debug) {
    return debug ? styles.debugStyle : {};
}
function getWordSpace(textLen, currentIndex) {
    return currentIndex !== textLen - 1 ? ' ' : '';
}
function getTextMatrix(text) {
    return text.split('\n').map(function (row) { return row.split(' '); });
}
//@ts-ignore
var WordWrappedText = function (_a) {
    var debug = _a.debug, textStyle = _a.textStyle, style = _a.style, children = _a.children;
    function renderWrappedText(text) {
        var textMatrix = getTextMatrix(text);
        return (<View style={[
            styles.container,
            style,
            getDebugStyle(debug)
        ]}>
                {textMatrix.map(function (rowText, rowIndex) {
            return (<View key={rowText + "-" + rowIndex} style={[
                styles.rowWrapper,
                getDebugStyle(debug)
            ]}>
                                {rowText.map(function (colText, colIndex) {
                return colText !== "" &&
                    <Text key={colText + "-" + colIndex} style={[textStyle, getDebugStyle(debug)]}>
                                            {colText + getWordSpace(rowText.length, colIndex)}
                                        </Text>;
            })}
                            </View>);
        })}
            </View>);
    }
    if (typeof children === 'string') {
        return renderWrappedText(children);
    }
    if (Array.isArray(children)) {
        return children.map(function (child) {
            if (typeof child === 'string') {
                return renderWrappedText(child);
            }
            else {
                return child;
            }
        });
    }
    return children;
};
var styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
    },
    rowWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    debugStyle: {
        borderWidth: 0.5,
        borderColor: 'rgba(255,60,60,0.7)'
    }
});
export default WordWrappedText;
