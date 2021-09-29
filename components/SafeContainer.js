import React from 'react'
import { SafeAreaView } from 'react-native'

function SafeContainer({ children }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            {children}
        </SafeAreaView>
    )
}

export default SafeContainer