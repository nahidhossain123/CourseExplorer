import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LEVELS, SORT_OPTIONS } from '../../courses/constants';
import { useCourseStore } from '../../../store/courseStore';

export default function CourseFilter() {
    const { filters, setFilter, resetFilters } = useCourseStore();

    return (
        <View style={styles.filtersPanel}>

            {/* ================= PRICE STATUS SORT ================= */}
            <Text style={styles.filterTitle}>Price Model</Text>
            <View style={styles.filterGroup}>
                {(['all', 'free', 'premium'] as const).map((opt) => (
                    <TouchableOpacity
                        key={opt}
                        style={[
                            styles.filterChip,
                            filters.price === opt && styles.filterChipActive,
                        ]}
                        onPress={() => setFilter('price', opt)}
                    >
                        <Text
                            style={[
                                styles.filterChipText,
                                filters.price === opt && styles.filterChipTextActive,
                            ]}
                        >
                            {opt}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.filterTitle}>Enrollment Status</Text>
            <View style={styles.filterGroup}>
                {(['all', 'enrolled', 'not_enrolled'] as const).map((opt) => (
                    <TouchableOpacity
                        key={opt}
                        style={[
                            styles.filterChip,
                            filters.enrollment === opt && styles.filterChipActive,
                        ]}
                        onPress={() => setFilter('enrollment', opt)}
                    >
                        <Text
                            style={[
                                styles.filterChipText,
                                filters.enrollment === opt && styles.filterChipTextActive,
                            ]}
                        >
                            {opt}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* ================= DIFFICULTY LEVEL SORT ================= */}
            {/* <Text style={styles.filterTitle}>Course Level</Text>
            <View style={styles.filterGroup}>
                {(['all', ...LEVELS] as const).map((lvl) => (
                    <TouchableOpacity
                        key={lvl}
                        style={[
                            styles.filterChip,
                            filters.level === lvl && styles.filterChipActive,
                        ]}
                        onPress={() => setFilter('level', lvl)}
                    >
                        <Text
                            style={[
                                styles.filterChipText,
                                filters.level === lvl && styles.filterChipTextActive,
                            ]}
                        >
                            {lvl}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View> */}

            {/* ================= SORT BY ================= */}
            <Text style={styles.filterTitle}>Sort By</Text>
            <View style={styles.filterGroup}>
                {SORT_OPTIONS.map((opt) => (
                    <TouchableOpacity
                        key={opt.value}
                        style={[
                            styles.filterChip,
                            filters.sortBy === opt.value && styles.filterChipActive,
                        ]}
                        onPress={() => setFilter('sortBy', opt.value)}
                    >
                        <Text
                            style={[
                                styles.filterChipText,
                                filters.sortBy === opt.value && styles.filterChipTextActive,
                            ]}
                        >
                            {opt.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* ================= RESET ALL FILTERS ================= */}
            <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
                <Text style={styles.resetBtnText}>Clear All Filters</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    filtersPanel: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
    },
    filterTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#475569',
        marginTop: 8,
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    filterGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 8,
    },
    filterChip: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    filterChipActive: {
        backgroundColor: '#2563EB',
    },
    filterChipText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#475569',
    },
    filterChipTextActive: {
        color: '#FFFFFF',
    },
    resetBtn: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 12,
    },
    resetBtnText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#EF4444',
    },
});
