import React, { useState } from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    Text
} from 'react-native'
import { SCREEN_HEIGHT, scaleV, scaleH } from '../ultis'
import { ColorConst } from '../ultis'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export const FormInput = ({
    title,
    value,
    setValue,
    uri,
    onFocus,
    disableEdit,
    onBlur,
    borderColor,
    marginBottom,
    left,
    secureTextEntry,
    ...rest
}) => {
    const [color, setColor] = useState(ColorConst.NEUTRAL_LIGHT)

    return (
        <View style={{
            marginBottom: marginBottom,
        }}>
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={[styles.fromGroup, { borderColor: borderColor ? borderColor : color }]}>
                {uri && <FontAwesome
                    name={uri}
                    size={scaleH(24)}
                    style={styles.leading}
                    color={borderColor ? borderColor : ColorConst.NEUTRAL_GREY}
                />}
                <TextInput
                    style={styles.input}
                    numberOfLines={1}
                    editable={disableEdit ? false : true}
                    selectTextOnFocus={disableEdit ? false : true}
                    onFocus={() => {
                        setColor(ColorConst.LIGHT_GREEN)
                        onFocus && onFocus()
                    }}
                    onBlur={() => {
                        setColor(ColorConst.NEUTRAL_LIGHT)
                        onBlur && onBlur()
                    }}
                    secureTextEntry={secureTextEntry ? secureTextEntry : false}
                    value={value}
                    placeholderTextColor={ColorConst.NEUTRAL_GREY}
                    onChangeText={(text) => setValue(text)}
                    autoCorrect={false}
                    {...rest}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    fromGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderRadius: 5,
        height: SCREEN_HEIGHT * 0.065
    },
    leading: {
        marginLeft: scaleH(16)
    },
    title: {
        marginBottom: scaleV(12),
        color: ColorConst.NEUTRAL_DARK,
        fontWeight: '700',
        fontSize: scaleH(14),
        lineHeight: scaleV(21)
    },
    input: {
        height: '100%',
        marginLeft: scaleH(10),
        width: scaleH(277),
        color: ColorConst.NEUTRAL_GREY,
        fontWeight: '700',
        fontSize: scaleH(12),
        lineHeight: scaleV(21.7),
        textAlignVertical: 'center'
    }
})