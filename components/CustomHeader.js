import React from 'react'
import {
    View
} from 'react-native'

function CustomHeader({ headerLeft, headerRight }) {
    return (
        <View >
            {headerLeft()}


            {headerRight && headerRight()}
        </View>
    )

}

export default CustomHeader
