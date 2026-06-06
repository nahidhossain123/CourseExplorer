import React from 'react'
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native'

type Props = {
    items: string[]
    selected: string
    onSelect: (item: string) => void
}

export default function HorizontalPillSelector({ items, selected, onSelect }: Props) {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
            >
                {items.map((item) => {
                    const isActive = selected === item

                    return (
                        <TouchableOpacity
                            key={item}
                            style={[styles.pill, isActive && styles.activePill]}
                            onPress={() => onSelect(item)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.text, isActive && styles.activeText]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    scroll: {

    },
    pill: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#E2E8F0',
        marginRight: 10,
    },
    activePill: {
        backgroundColor: '#2563EB',
    },
    text: {
        color: '#0F172A',
        fontSize: 13,
    },
    activeText: {
        color: '#fff',
        fontWeight: '600',
    },
})