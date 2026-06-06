import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { formatTime } from '../../../shared/utils/dateUtils';
import SearchInput from '../../../shared/components/SearchInput';
import CourseFilter from './CourseFilter';
import HorizontalPillSelector from '../../../shared/components/HorizontalPillSelector';
import { CATEGORIES } from '../../courses/constants';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';


type CourseHeaderPropsType = {
    onFilterClick: () => void,
    open: boolean
}
export default function CourseHeader({ onFilterClick, open }: CourseHeaderPropsType) {
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
                <SearchInput value={search} onChange={setSearch} />

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
            <HorizontalPillSelector items={CATEGORIES} selected='All' onSelect={() => {

            }} />

            <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>
                    {1} {1 === 1 ? 'Course' : 'Courses'} Found
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
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    headerTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 24,
        fontWeight: '800',
        color: '#2563EB',
        letterSpacing: -0.5,
    },
    greetingText: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 2,
    },
    networkDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    dotGreen: {
        backgroundColor: '#10B981',
    },
    dotOrange: {
        backgroundColor: '#F59E0B',
    },
    syncMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        marginBottom: 10,
    },
    syncText: {
        fontSize: 11,
        color: '#94A3B8',
    },
    syncSpinner: {
        marginLeft: 6,
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
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#0F172A',
        fontWeight: '500',
        padding: 0, // Reset default padding in Android
    },
    clearSearchIcon: {
        fontSize: 14,
        fontWeight: '700',
        color: '#94A3B8',
        paddingHorizontal: 4,
    },
    filterToggleBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    filterToggleBtnActive: {
        backgroundColor: '#2563EB',
    },
    filterToggleBtnIcon: {
        fontSize: 18,
    },
    filterToggleBtnIconActive: {
        color: '#FFFFFF',
    },
    filtersPanel: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
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
    categoryScrollContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    categoryScroll: {
        paddingHorizontal: 16,
        gap: 8,
    },
    categoryPill: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 6,
    },
    categoryPillActive: {
        backgroundColor: '#2563EB',
    },
    categoryPillText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#475569',
    },
    categoryPillTextActive: {
        color: '#FFFFFF',
    },
    summaryContainer: {
        paddingTop: 12,
        paddingBottom: 4,
    },
    summaryText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#64748B',
    },
    errorContainer: {
        backgroundColor: '#FEF2F2',
        borderWidth: 1,
        borderColor: '#FEE2E2',
        padding: 10,
        marginHorizontal: 16,
        marginTop: 8,
        borderRadius: 8,
    },
    errorText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#EF4444',
    },
    listContent: {
        paddingBottom: 24,
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 8,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingVertical: 60,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 6,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 20,
    },
    emptyResetBtn: {
        backgroundColor: '#2563EB',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 8,
    },
    emptyResetBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});
