import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const BackButton = ({ onPress }) => {
    return (
        <FontAwesome
            name="arrow-left"
            color="#23887c"
            style={{ paddingLeft: 10 }}
            size={20}
            onPress={onPress}
        />
    )
}

export default BackButton
