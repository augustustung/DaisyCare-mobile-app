import React, { useState } from 'react'
import {
    ImageBackground,
    View,
    Text,
    TextInput
} from 'react-native'
import { styles } from '../../style.home'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { scaleH, scaleV } from '../../../../ultis'

function Banner() {
    const [textSearch, setTextSearch] = useState('')

    return (
        <ImageBackground
            source={require('../../../../assets/cover.png')}
            style={styles.brandCard}
        >
            <View style={styles.header}>
                <View style={styles.bg} />
                <Text style={styles.title}>Daily Care</Text>
                <Text style={[styles.title,
                { fontWeight: '700', marginTop: scaleV(10) }]
                }>Chăm sóc sức khỏe toàn diện</Text>
            </View>
            <View style={styles.search}>
                <FontAwesome name="search" size={scaleH(24)} />
                <TextInput
                    style={[styles.input, {
                        fontWeight: textSearch.length > 0 ? '700' : '400'
                    }]}
                    value={textSearch}
                    onChangeText={(text) => setTextSearch(text)}
                    placeholder="Tìm phòng khám"
                />
            </View>
        </ImageBackground>
    )
}

export default Banner