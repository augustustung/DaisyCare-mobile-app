import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { ColorConst, scaleH, scaleV } from '../ultis'

function ButtonTag({ title, btnTitle, OnPress }) {
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <TouchableOpacity onPress={OnPress}>
                <Text style={styles.btnTitle}>{btnTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonTag

const styles = StyleSheet.create({
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    sectionTitle: {
        fontSize: scaleH(18),
        lineHeight: scaleV(21.5),
        fontWeight: '500',
        letterSpacing: 0.5
    },
    btnTitle: {
        color: ColorConst.DEEP_GREEN,
        fontSize: scaleH(16),
        letterSpacing: 0.5,
        fontWeight: '700',
        lineHeight: scaleV(21.5)
    },
})
