import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { ColorConst, scaleH, scaleV } from '../ultis'

export const FormButton = ({
    title,
    titleColor,
    onPress,
    backgroundColor,
    borderColor,
    marginBottom
}) => {
    return (
        <TouchableOpacity
            style={[styles.btn, {
                borderColor: borderColor ? borderColor : ColorConst.NEUTRAL_LIGHT,
                borderWidth: borderColor ? 1 : 0,
                backgroundColor: backgroundColor ? backgroundColor : ColorConst.DEEP_GREEN,
                marginBottom: marginBottom ? marginBottom : 0
            }]}
            onPress={onPress}
        >
            <Text style={[styles.title, {
                color: titleColor ? titleColor : "#fff"
            }]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: 'rgba(64, 191, 255, 0.24)',
        shadowOffset: { width: 0, height: 3 },
        height: scaleV(55),
        elevation: 5
    },
    title: {
        fontSize: scaleH(14),
        fontWeight: '700',
        lineHeight: scaleV(25.2)
    }
})
