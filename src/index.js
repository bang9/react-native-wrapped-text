import React from "react";
import { Text, View, StyleSheet } from "react-native";
function getDebugStyle(debug) {
    return debug ? styles.debugStyle : {};
}
function getWordSpace(textLen, currentIndex) {
    return currentIndex !== textLen - 1 ? " " : "";
}
function getTextMatrix(text) {
    return text.split("\n").map(function(row) {
        return row.split(" ");
    });
}
//@ts-ignore
var WrappedText = function(_a) {
    var debug = _a.debug,
        containerStyle = _a.containerStyle,
        rowWrapperStyle = _a.rowWrapperStyle,
        textStyle = _a.textStyle,
        children = _a.children,
        TextComponent = _a.TextComponent;
    if (!children) {
        return null;
    }
    var TextRenderer = React.useMemo(
        function() {
            return TextComponent || Text;
        },
        [TextComponent]
    );
    var renderWrappedText = React.useCallback(function(text) {
        var textMatrix = getTextMatrix(text);
        return (
            <View
                style={[styles.container, containerStyle, getDebugStyle(debug)]}
            >
                {textMatrix.map(function(rowText, rowIndex) {
                    return (
                        <View
                            key={rowText + "-" + rowIndex}
                            style={[
                                styles.rowWrapper,
                                rowWrapperStyle,
                                getDebugStyle(debug)
                            ]}
                        >
                            {rowText.map(function(colText, colIndex) {
                                return (
                                    (colText !== "" ||
                                        (rowText.length === 1 &&
                                            colText === "")) && (
                                        <TextRenderer
                                            key={colText + "-" + colIndex}
                                            style={[
                                                textStyle,
                                                getDebugStyle(debug)
                                            ]}
                                        >
                                            {colText +
                                                getWordSpace(
                                                    rowText.length,
                                                    colIndex
                                                )}
                                        </TextRenderer>
                                    )
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        );
    }, []);
    if (typeof children === "string") {
        return renderWrappedText(children);
    }
    if (Array.isArray(children)) {
        return children.map(function(child) {
            if (typeof child === "string") {
                return renderWrappedText(child);
            } else {
                return child;
            }
        });
    }
    return children;
};
var styles = StyleSheet.create({
    container: {
        alignItems: "center",
        alignSelf: "center",
        width: "100%"
    },
    rowWrapper: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    debugStyle: {
        borderWidth: 0.5,
        borderColor: "rgba(255,60,60,0.7)"
    }
});
export default WrappedText;
