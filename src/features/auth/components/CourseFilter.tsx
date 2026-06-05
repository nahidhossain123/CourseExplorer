import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LEVELS, SORT_OPTIONS } from '../../courses/constants';

export default function CourseFilter() {
    const [priceFilter, setPriceFilter] = useState<'All' | 'Free' | 'Premium'>('All');
    const [enrollFilter, setEnrollFilter] = useState<'All' | 'Enrolled' | 'Not Enrolled'>('All');
    const [filtersExpanded, setFiltersExpanded] = useState(false);

    const resetAllFilters = () => {
        // setPriceFilter('All');
        // setEnrollFilter('All');
        // store.setSelectedLevel(null);
        // store.setSelectedSort(null);
        // setFiltersExpanded(false);
    };
    return (
        <View style={styles.filtersPanel}>
            {/* Category Dropdown/Selector equivalent - in panel */}
            <Text style={styles.filterTitle}>Price Model</Text>
            <View style={styles.filterGroup}>
                {(['All', 'Free', 'Premium'] as const).map((opt) => (
                    <TouchableOpacity
                        key={opt}
                        style={[styles.filterChip, priceFilter === opt && styles.filterChipActive]}
                        onPress={() => setPriceFilter(opt)}
                    >
                        <Text style={[styles.filterChipText, priceFilter === opt && styles.filterChipTextActive]}>
                            {opt}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.filterTitle}>Enrollment Status</Text>
            <View style={styles.filterGroup}>
                {(['All', 'Enrolled', 'Not Enrolled'] as const).map((opt) => (
                    <TouchableOpacity
                        key={opt}
                        style={[styles.filterChip, enrollFilter === opt && styles.filterChipActive]}
                        onPress={() => setEnrollFilter(opt)}
                    >
                        <Text style={[styles.filterChipText, enrollFilter === opt && styles.filterChipTextActive]}>
                            {opt}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.filterTitle}>Course Level</Text>
            <View style={styles.filterGroup}>
                {LEVELS.map((lvl, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.filterChip, index == 0 && styles.filterChipActive]}
                        onPress={() => { }}
                    >
                        <Text style={[styles.filterChipText, index == 0 && styles.filterChipTextActive]}>
                            {lvl}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.filterTitle}>Sort By</Text>
            <View style={styles.filterGroup}>
                {SORT_OPTIONS.map((opt) => (
                    <TouchableOpacity
                        key={opt.value}
                        style={[styles.filterChip, 'rating' === opt.value && styles.filterChipActive]}
                        onPress={() => { }}
                    >
                        <Text style={[styles.filterChipText, 'rating' === opt.value && styles.filterChipTextActive]}>
                            {opt.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.resetBtn} onPress={resetAllFilters}>
                <Text style={styles.resetBtnText}>Clear All Filters</Text>
            </TouchableOpacity>
        </View>
    )
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
