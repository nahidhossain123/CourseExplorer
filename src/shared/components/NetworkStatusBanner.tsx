import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type Props = {
    isConnected: boolean
}

export default function NetworkStatusBanner({ isConnected }: Props) {
    if (isConnected) return null

    return (
        <>
            {!isConnected && (
                <View style={[styles.statusBanner, styles.offlineBanner]}>
                    <Text style={styles.statusBannerText}>⚠️ Offline Mode — Showing cached courses</Text>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    statusBanner: {
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    offlineBanner: {
        backgroundColor: '#FFFBEB',
        borderBottomWidth: 1,
        borderBottomColor: '#FDE68A',
    },
    statusBannerText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#D97706',
    },
})