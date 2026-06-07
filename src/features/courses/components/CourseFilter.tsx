import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LEVELS, SORT_OPTIONS } from '../../courses/constants';
import { useCourseStore } from '../../../store/courseStore';
import { fontSize, fontweight } from '../../../shared/theme/typography';
import { colors } from '../../../shared/theme/colors';
import { spacingX, spacingY } from '../../../shared/theme/spacing';
import { radius } from '../../../shared/theme/radius';

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
        backgroundColor: colors.surface,
        paddingVertical: spacingY._12,
    },
    filterTitle: {
        fontSize: fontSize._12,
        fontWeight: fontweight.bold,
        color: colors.textMuted,
        marginTop: spacingY._8,
        marginBottom: spacingY._8,
        textTransform: 'uppercase',
    },
    filterGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacingX._8,
        marginBottom: spacingY._8,
    },
    filterChip: {
        backgroundColor: colors.surfaceSoft,
        paddingHorizontal: spacingX._12,
        paddingVertical: spacingX._8,
        borderRadius: radius._8,
    },
    filterChipActive: {
        backgroundColor: colors.primary,
    },
    filterChipText: {
        fontSize: fontSize._12,
        fontWeight: fontweight.bold,
        color: colors.textMuted,
    },
    filterChipTextActive: {
        color: colors.white,
    },
    resetBtn: {
        backgroundColor: colors.surfaceSoft,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacingX._8,
        borderRadius: radius._8,
        marginTop: spacingX._12,
    },
    resetBtnText: {
        fontSize: fontSize._12,
        fontWeight: fontweight.bold,
        color: colors.error,
    },
});
