import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { formatTime } from '../../../shared/utils/dateUtils';
import SearchInput from '../../../shared/components/SearchInput';
import CourseFilter from './CourseFilter';
import HorizontalPillSelector from '../../../shared/components/HorizontalPillSelector';
import { CATEGORIES } from '../../courses/constants';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCourseStore } from '../../../store/courseStore';
import { fontSize, fontweight } from '../../../shared/theme/typography';
import { colors } from '../../../shared/theme/colors';
import { spacingX, spacingY } from '../../../shared/theme/spacing';
import { radius } from '../../../shared/theme/radius';
import { scale } from '../../../shared/utils/dimensions';


type CourseHeaderPropsType = {
    onFilterClick: () => void,
    open: boolean
}
export default function CourseHeader({ onFilterClick, open }: CourseHeaderPropsType) {
    const { filters, setFilter, courses } = useCourseStore();
    let isConnected = true
    let lastSyncedAt = Date.now()
    const [search, setSearch] = useState("")

    return (

        <View style={styles.header}>
            <View style={styles.headerTitleRow}>
                <View>
                    <Text style={styles.logoText}>Course Explorer</Text>
                    <Text style={styles.greetingText}>Hello, Alex 👋</Text>
                </View>
                <View style={[styles.networkDot, isConnected ? styles.dotGreen : styles.dotOrange]} />
            </View>

            {/* Sync Metadata Row */}
            <View style={styles.syncMetaRow}>
                <Text style={styles.syncText}>
                    Last synced: {formatTime(lastSyncedAt)}
                </Text>
                {/* {store.syncStatus === 'syncing' && (
            <ActivityIndicator size="small" color="#2563EB" style={styles.syncSpinner} />
          )} */}
            </View>

            {/* Search Input and Filter Toggle */}
            <View style={styles.searchRow}>
                <SearchInput
                    value={filters.search}
                    onChange={(text) => setFilter('search', text)}
                />

                <TouchableOpacity
                    style={[styles.filterToggleBtn, open && styles.filterToggleBtnActive]}
                    onPress={() => {
                        onFilterClick()
                    }}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.filterToggleBtnIcon, open && styles.filterToggleBtnIconActive]}>
                        {open ? '✕' : '⚙️'}
                    </Text>
                </TouchableOpacity>
            </View>
            {/* {showFilters && <CourseFilter />} */}
            {/* <HorizontalPillSelector
                items={CATEGORIES}
                selected={filters.category}
                onSelect={(value) => setFilter('category', value)}
            /> */}

            <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>
                    {courses.length} {courses.length === 1 ? 'Course' : 'Courses'} Found
                </Text>
            </View>

            {/* {store.errorMessage && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {store.errorMessage}</Text>
        </View>
      )} */}
        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        backgroundColor: colors.white,
        paddingHorizontal: spacingX._16,
        paddingTop: spacingY._16,
        paddingBottom: spacingY._12,
        borderBottomWidth: spacingY._2,
        borderBottomColor: colors.border,
    },
    headerTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoText: {
        fontSize: fontSize._24,
        fontWeight: fontweight.bold,
        color: colors.primary,
        letterSpacing: -0.5,
    },
    greetingText: {
        fontSize: fontSize._14,
        color: colors.textMuted,
        marginTop: spacingY._2,
    },
    networkDot: {
        width: 10,
        height: 10,
        borderRadius: radius._6,
    },
    dotGreen: {
        backgroundColor: colors.success,
    },
    dotOrange: {
        backgroundColor: colors.warning,
    },
    syncMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacingY._6,
        marginBottom: spacingY._10,
    },
    syncText: {
        fontSize: fontSize._12,
        color: colors.textMuted,
    },
    syncSpinner: {
        marginLeft: spacingX._6,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: radius._12,
        paddingHorizontal: spacingX._12,
        height: scale(44),
    },
    searchIcon: {
        fontSize: fontSize._16,
        marginRight: spacingX._8,
    },
    searchInput: {
        flex: 1,
        fontSize: fontSize._14,
        color: colors.textPrimary,
        fontWeight: fontweight.medium,
        padding: 0, // Reset default padding in Android
    },
    clearSearchIcon: {
        fontSize: fontSize._14,
        fontWeight: fontweight.bold,
        color: colors.textMuted,
        paddingHorizontal: 4,
    },
    filterToggleBtn: {
        width: scale(44),
        height: scale(44),
        borderRadius: radius._12,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: spacingX._10,
    },
    filterToggleBtnActive: {
        backgroundColor: colors.primary,
    },
    filterToggleBtnIcon: {
        fontSize: fontSize._16,
    },
    filterToggleBtnIconActive: {
        color: colors.white,
    },
    filtersPanel: {
        backgroundColor: colors.white,
        paddingHorizontal: spacingX._16,
        paddingVertical: spacingY._12,
        borderBottomWidth: spacingX._2,
        borderBottomColor: colors.border,
    },
    filterTitle: {
        fontSize: fontSize._12,
        fontWeight: fontweight.bold,
        color: colors.textPrimary,
        marginTop: spacingY._8,
        marginBottom: spacingY._6,
        textTransform: 'uppercase',
    },
    filterGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacingX._8,
        marginBottom: spacingY._8,
    },
    filterChip: {
        backgroundColor: colors.white,
        paddingHorizontal: spacingX._12,
        paddingVertical: spacingY._6,
        borderRadius: radius._8,
    },
    filterChipActive: {
        backgroundColor: colors.primary,
    },
    filterChipText: {
        fontSize: fontSize._12,
        fontWeight: fontweight.semibold,
        color: colors.textPrimary,
    },
    filterChipTextActive: {
        color: colors.white,
    },
    resetBtn: {
        backgroundColor: colors.primaryLight,
        borderWidth: spacingX._2,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacingY._10,
        borderRadius: radius._12,
        marginTop: spacingY._12,
    },
    resetBtnText: {
        fontSize: fontSize._14,
        fontWeight: fontweight.bold,
        color: colors.error,
    },
    categoryScrollContainer: {
        backgroundColor: colors.white,
        paddingVertical: spacingY._10,
        borderBottomWidth: spacingX._2,
        borderBottomColor: colors.border,
    },
    categoryScroll: {
        paddingHorizontal: spacingX._16,
        gap: spacingX._8,
    },
    categoryPill: {
        backgroundColor: colors.white,
        paddingHorizontal: spacingX._16,
        paddingVertical: spacingY._8,
        borderRadius: radius._20,
        marginRight: spacingX._6,
    },
    categoryPillActive: {
        backgroundColor: colors.primary,
    },
    categoryPillText: {
        fontSize: fontSize._12,
        fontWeight: fontweight.semibold,
        color: colors.textSecondary,
    },
    categoryPillTextActive: {
        color: colors.white,
    },
    summaryContainer: {
        paddingTop: spacingY._12,
        paddingBottom: spacingY._4,
    },
    summaryText: {
        fontSize: fontSize._12,
        fontWeight: fontweight.bold,
        color: colors.textMuted,
    },
    errorContainer: {
        backgroundColor: colors.primaryLight,
        borderWidth: 1,
        borderColor: colors.error,
        paddingVertical: spacingY._10,
        marginHorizontal: spacingX._16,
        marginTop: spacingY._8,
        borderRadius: radius._8,
    },
    errorText: {
        fontSize: fontSize._12,
        fontWeight: fontweight.bold,
        color: colors.error,
    },
    listContent: {
        paddingBottom: spacingY._24,
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        fontSize: fontSize._14,
        color: colors.textMuted,
        marginTop: spacingY._8,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacingX._32,
        paddingVertical: spacingY._60,
    },
    emptyIcon: {
        fontSize: fontSize._48,
        marginBottom: spacingY._12,
    },
    emptyTitle: {
        fontSize: fontSize._18,
        fontWeight: fontweight.bold,
        color: colors.textPrimary,
        marginBottom: spacingY._6,
    },
    emptySubtitle: {
        fontSize: fontSize._14,
        color: colors.textMuted,
        textAlign: 'center',
        lineHeight: fontSize._20,
        marginBottom: spacingY._20,
    },
    emptyResetBtn: {
        backgroundColor: '#2563EB',
        paddingHorizontal: spacingX._18,
        paddingVertical: spacingY._10,
        borderRadius: radius._6,
    },
    emptyResetBtnText: {
        fontSize: fontSize._14,
        fontWeight: fontweight.bold,
        color: colors.white,
    },
});
