import { View } from 'lucide-react-native'
import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {
    children: React.ReactNode
    barStyle?: 'light-content' | 'dark-content'
    backgroundColor?: string
}

export default function AppSafeArea({
    children,
    barStyle = 'dark-content',
    backgroundColor = '#FFFFFF',
}: Props) {
    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})