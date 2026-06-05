import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'

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