import React from 'react'
import { SafeAreaView } from 'react-native'

function SafeContainer({ children, noPadding }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#eee", paddingBottom: noPadding ? 0 : 16 }}>
            {children}
        </SafeAreaView>
    )
}

export default SafeContainer