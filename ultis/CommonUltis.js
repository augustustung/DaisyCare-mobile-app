import { Text } from 'react-native'
import React from 'react'
import { ColorConst, scaleH, scaleV } from '.'


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