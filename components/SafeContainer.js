import React from 'react'
import { SafeAreaView } from 'react-native'

function SafeContainer({ children }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#eee", paddingBottom: 16 }}>
            {children}
        </SafeAreaView>
    )
}

export default SafeContainer