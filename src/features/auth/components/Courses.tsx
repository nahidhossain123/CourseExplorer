import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { BottomTabParamList, CourseType, RootStackParamList } from '../../courses/type';
import { CourseCard } from './CourseCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { useCourseStore } from '../../../store/courseStore';

export default function Courses() {
    const courses = useCourseStore((state) => state.courses);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isLoading, setIsloading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const processedCourses: CourseType[] = []
    const handleRefresh = () => {

    }
    const renderItem = useCallback(({ item }: { item: typeof processedCourses[number] }) => (
        <CourseCard
            course={item}
            onPress={() => navigation.navigate('CourseDetail', { courseId: item.courseId })}
            onEnrollPress={() => console.log()}
        />
    ), []);
    return (
        <View>
            {/* Error View Banner */}
            {/* {store.errorMessage && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {store.errorMessage}</Text>
        </View>
      )} */}

            {/* Core Course List */}
            {isLoading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#2563EB" />
                    <Text style={styles.loadingText}>Loading courses...</Text>
                </View>
            ) : (
                <FlatList
                    data={courses}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.courseId}
                    contentContainerStyle={styles.listContent}
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyIcon}>📚</Text>
                            <Text style={styles.emptyTitle}>No courses found</Text>
                            <Text style={styles.emptySubtitle}>
                                Try searching for something else or clearing the active filters.
                            </Text>
                            {/* <TouchableOpacity style={styles.emptyResetBtn} onPress={resetAllFilters}>
                <Text style={styles.emptyResetBtnText}>Reset All Filters</Text>
              </TouchableOpacity> */}
                        </View>
                    }
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({

    categoryPillTextActive: {
        color: '#FFFFFF',
    },
    summaryContainer: {
        paddingHorizontal: 16,
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
