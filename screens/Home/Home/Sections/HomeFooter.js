import React from 'react'
import { Text, View, Linking, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { scaleH } from '../../../../ultis'
import { styles } from './SectionStyle'

const FB = "https://www.facebook.com/huytung.novers/"
const GITHUB = "https://github.com/augustustung"

const HomeFooter = () => {

    const _onOpenLink = async (link) => {
        await Linking.openURL(link)
    }

    return (
        <View style={styles.footerContainer}>
            <Text style={styles.copyright}>© 2021 Augustus Flynn. More infomation...</Text>
            <View style={styles.wrapper}>
                <TouchableOpacity
                    onPress={() => _onOpenLink(FB)}
                    style={[styles.wrapper, { marginRight: scaleH(12) }]}
                >
                    <FontAwesome5 name="facebook" size={20} color="#557ef0" />
                    <Text style={styles.social}>Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.wrapper}
                    onPress={() => _onOpenLink(GITHUB)}
                >
                    <FontAwesome5 name="github" size={20} color="#000" />
                    <Text style={styles.social}>Github</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default HomeFooter