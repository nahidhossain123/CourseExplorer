import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

type Props = {
    value: string
    onChange: (text: string) => void
    placeholder?: string
}

export default function SearchInput({
    value,
    onChange,
    placeholder = 'Search...',
}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>🔍</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#94A3B8"
                value={value}
                onChangeText={onChange}
            />

            {value.length > 0 && (
                <TouchableOpacity onPress={() => onChange('')}>
                    <Text style={styles.clear}>✕</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 44,
    },
    icon: {
        marginRight: 6,
    },
    input: {
        flex: 1,
        color: '#0F172A',
    },
    clear: {
        fontSize: 16,
        paddingHorizontal: 6,
    },
})