import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Text from '../components/text/text'
import { color } from '../theme'

export default function PlanetScreen() {
    return (
        <SafeAreaView style={{ backgroundColor: color.black, flex: 1 }}>
            <Text>Planet App</Text>
        </SafeAreaView>
    )
}
