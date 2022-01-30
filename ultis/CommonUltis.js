import { Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ColorConst, scaleH, scaleV, SCREEN_HEIGHT, SCREEN_WIDTH } from '.'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

export const ErrorText = (text) => (
    <Text style={{
        color: ColorConst.PRIMARY_RED,
        alignSelf: 'center',
        marginVertical: scaleV(16),
        fontSize: scaleH(16),
        fontWeight: '700'
    }}>{text}</Text>
)

export const EmptyComponent = (text) => (
    <Text style={{
        textAlign: 'center',
        color: ColorConst.DEEP_GREEN,
        fontWeight: '700',
        fontSize: scaleH(16),
        lineHeight: scaleV(21.5),
        letterSpacing: 0.5
    }}>{text}</Text>
)

export const headerLeft = ({ navigation, routeName, width }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                marginRight: scaleH(16),
                width: SCREEN_WIDTH * 0.72,
                height: SCREEN_HEIGHT * 0.106,
                alignItems: 'center'
            }}
            onPress={navigation.goBack}
        >
            <FontAwesome5Icon
                name="angle-left"
                style={{
                    marginHorizontal: SCREEN_WIDTH * 0.032,
                    width: scaleH(24),
                    height: scaleV(24)
                }}
            />
            <Text style={{
                width: width && SCREEN_WIDTH * width,
                fontWeight: '700',
                fontSize: scaleH(16),
                lineHeight: scaleV(24),
                overflow: 'hidden',
                letterSpacing: 0.5
            }} numberOfLines={1}>{routeName}</Text>
        </TouchableOpacity>)
}

export function currencyFormat(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " vnđ"
}