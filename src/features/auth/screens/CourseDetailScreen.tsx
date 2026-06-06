import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useCourseStore } from '../../../store/courseStore';
import { RootStackParamList } from '../../../features/courses/type';

type CourseDetailRouteProp = RouteProp<RootStackParamList, 'CourseDetail'>;

const { width } = Dimensions.get('window');

export default function CourseDetailScreen() {
    const route = useRoute<CourseDetailRouteProp>();
    const navigation = useNavigation();
    const { courseId } = route.params;

    // Reactively fetch course details from Zustand store
    const course = useCourseStore((state) => state.courses.find((c) => c.courseId === courseId));
    //   const toggleEnrollment = useCourseStore((state) => );

    // Tab State
    const [activeTab, setActiveTab] = useState<'Overview' | 'Curriculum' | 'Reviews'>('Overview');

    if (!course) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>Course not found.</Text>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backBtnText}>Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const handleEnrollToggle = () => {
        // toggleEnrollment(course.id);
    };

    const imageUrl = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop';

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>

                {/* Hero Section with Backdrop Image */}
                <View style={styles.heroSection}>
                    <Image source={{ uri: imageUrl }} style={styles.heroImage} />
                    {/* Translucent Wash Overlay */}
                    <View style={styles.heroOverlay} />

                    {/* Hero Content (Floating on top of Image) */}
                    <View style={styles.heroContentContainer}>
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryBadgeText}>{course.tags}</Text>
                        </View>
                        <Text style={styles.heroTitle}>{course.title}</Text>
                    </View>
                </View>

                {/* Course Core Details Card */}
                <View style={styles.detailsCard}>

                    {/* Instructor Block */}
                    <View style={styles.instructorContainer}>
                        <Image
                            source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructorName)}&background=EFF6FF&color=2563EB&bold=true&size=128` }}
                            style={styles.avatar}
                        />
                        <View style={styles.instructorInfo}>
                            <Text style={styles.instructorName}>{course.instructorName}</Text>
                            <Text style={styles.instructorTitle}>Senior Software Educator</Text>
                        </View>
                        <TouchableOpacity style={styles.followBtn} activeOpacity={0.7}>
                            <Text style={styles.followBtnText}>+ Follow</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Stats Grid */}
                    <View style={styles.statsGrid}>
                        <View style={styles.statBox}>
                            <Text style={styles.statIcon}>⭐</Text>
                            <Text style={styles.statVal}>{course.rating.toFixed(1)}</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statIcon}>👥</Text>
                            <Text style={styles.statVal}>12.4k</Text>
                            <Text style={styles.statLabel}>Students</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statIcon}>⏱️</Text>
                            <Text style={styles.statVal}>{course.durationWeeks}</Text>
                            <Text style={styles.statLabel}>Duration</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statIcon}>▶️</Text>
                            <Text style={styles.statVal}>{course.durationWeeks}</Text>
                            <Text style={styles.statLabel}>Lessons</Text>
                        </View>
                    </View>

                    {/* Enroll / Unenroll Action CTA */}
                    <TouchableOpacity
                        style={[styles.actionBtn, course.isPremium ? styles.actionBtnEnrolled : styles.actionBtnNotEnrolled]}
                        onPress={handleEnrollToggle}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.actionBtnIcon, course.isPremium ? styles.actionBtnTextEnrolled : styles.actionBtnTextNotEnrolled]}>
                            {course.isPremium ? '✓' : '🎓'}
                        </Text>
                        <Text style={[styles.actionBtnText, course.isPremium ? styles.actionBtnTextEnrolled : styles.actionBtnTextNotEnrolled]}>
                            {course.isPremium ? 'Enrolled (Tap to Cancel)' : 'Enroll Now'}
                        </Text>
                    </TouchableOpacity>

                    {/* Navigation Tabs (Overview, Curriculum, Reviews) */}
                    <View style={styles.tabBar}>
                        {(['Overview', 'Curriculum', 'Reviews'] as const).map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <TouchableOpacity
                                    key={tab}
                                    style={[styles.tabItem, isActive && styles.tabItemActive]}
                                    onPress={() => setActiveTab(tab)}
                                >
                                    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                                        {tab}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Tab Contents: Overview */}
                    {activeTab === 'Overview' && (
                        <View style={styles.tabBody}>
                            <Text style={styles.sectionTitle}>About this course</Text>
                            <Text style={styles.bodyDescription}>
                                {course.descriptionShort || 'Welcome to this complete learning journey! Master top-tier industry practices, solid architectural frameworks, and step-by-step implementations to level up your engineering workflow.'}
                            </Text>

                            {/* What You'll Learn Section */}
                            <View style={styles.learnContainer}>
                                <Text style={styles.sectionTitle}>What You'll Learn</Text>

                                <View style={styles.learnItem}>
                                    <View style={styles.checkmarkCircle}>
                                        <Text style={styles.checkmark}>✓</Text>
                                    </View>
                                    <Text style={styles.learnText}>Build robust applications using modern standards</Text>
                                </View>

                                <View style={styles.learnItem}>
                                    <View style={styles.checkmarkCircle}>
                                        <Text style={styles.checkmark}>✓</Text>
                                    </View>
                                    <Text style={styles.learnText}>Write clean, modular, and maintainable codebase</Text>
                                </View>

                                <View style={styles.learnItem}>
                                    <View style={styles.checkmarkCircle}>
                                        <Text style={styles.checkmark}>✓</Text>
                                    </View>
                                    <Text style={styles.learnText}>Implement performance optimizations and sync systems</Text>
                                </View>

                                <View style={styles.learnItem}>
                                    <View style={styles.checkmarkCircle}>
                                        <Text style={styles.checkmark}>✓</Text>
                                    </View>
                                    <Text style={styles.learnText}>Deploy production ready features in a systematic flow</Text>
                                </View>
                            </View>

                            {/* Requirements Section */}
                            <View style={styles.reqsContainer}>
                                <Text style={styles.sectionTitle}>Requirements</Text>
                                <View style={styles.reqItem}>
                                    <Text style={styles.bulletPoint}>•</Text>
                                    <Text style={styles.reqText}>Basic understanding of course-related languages</Text>
                                </View>
                                <View style={styles.reqItem}>
                                    <Text style={styles.bulletPoint}>•</Text>
                                    <Text style={styles.reqText}>A computer with active internet for setting up dependencies</Text>
                                </View>
                                <View style={styles.reqItem}>
                                    <Text style={styles.bulletPoint}>•</Text>
                                    <Text style={styles.reqText}>Willingness to learn, build projects, and practice daily</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Tab Contents: Curriculum Placeholder */}
                    {activeTab === 'Curriculum' && (
                        <View style={styles.tabBody}>
                            <Text style={styles.sectionTitle}>Curriculum Overview</Text>
                            <Text style={styles.bodyDescription}>
                                This course contains 8 comprehensive modules covering both fundamental concepts and complex patterns, designed to transition you from beginner to advanced.
                            </Text>

                            <View style={styles.curriculumPlaceholderBox}>
                                <Text style={styles.placeholderBoxTitle}>Module 1: Introduction & Fundamentals</Text>
                                <Text style={styles.placeholderBoxSub}>12 lessons • 4h 15m</Text>
                            </View>

                            <View style={styles.curriculumPlaceholderBox}>
                                <Text style={styles.placeholderBoxTitle}>Module 2: Structural Architecture & Patterns</Text>
                                <Text style={styles.placeholderBoxSub}>18 lessons • 8h 40m</Text>
                            </View>

                            <View style={styles.curriculumPlaceholderBox}>
                                <Text style={styles.placeholderBoxTitle}>Module 3: Advanced Optimization & Deployment</Text>
                                <Text style={styles.placeholderBoxSub}>22 lessons • 12h 10m</Text>
                            </View>
                        </View>
                    )}

                    {/* Tab Contents: Reviews Placeholder */}
                    {activeTab === 'Reviews' && (
                        <View style={styles.tabBody}>
                            <Text style={styles.sectionTitle}>Student Reviews</Text>
                            <Text style={styles.bodyDescription}>
                                Read from our community of students who have completed the bootcamp.
                            </Text>

                            <View style={styles.reviewBox}>
                                <View style={styles.reviewHeader}>
                                    <Text style={styles.reviewAuthor}>Jessie W.</Text>
                                    <Text style={styles.reviewStars}>⭐⭐⭐⭐⭐</Text>
                                </View>
                                <Text style={styles.reviewComment}>
                                    This course completely changed the way I build React apps! Super practical sync strategies.
                                </Text>
                            </View>

                            <View style={styles.reviewBox}>
                                <View style={styles.reviewHeader}>
                                    <Text style={styles.reviewAuthor}>Marcus K.</Text>
                                    <Text style={styles.reviewStars}>⭐⭐⭐⭐⭐</Text>
                                </View>
                                <Text style={styles.reviewComment}>
                                    Instructor explains architectural principles so clearly. Highly recommend for any dev looking to grow!
                                </Text>
                            </View>
                        </View>
                    )}

                </View>
            </ScrollView>

            {/* Floating Header (Absolute on Top) */}
            <View style={styles.floatingHeader}>
                <TouchableOpacity style={styles.floatingHeaderBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.floatingHeaderBtnIcon}>←</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.floatingHeaderBtn} onPress={handleEnrollToggle}>
                    <Text style={[styles.floatingHeaderBtnIcon, course.isPremium && styles.bookmarkFilled]}>
                        {course.isPremium ? '★' : '☆'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    heroSection: {
        width: width,
        height: 280,
        position: 'relative',
        backgroundColor: '#0F172A',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    heroOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(30, 41, 59, 0.55)', // wash out details for premium readability
    },
    heroContentContainer: {
        position: 'absolute',
        bottom: 24,
        left: 16,
        right: 16,
    },
    categoryBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        marginBottom: 10,
    },
    categoryBadgeText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    heroTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: '#FFFFFF',
        lineHeight: 32,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    detailsCard: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -20,
        paddingTop: 24,
        paddingHorizontal: 16,
    },
    instructorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        marginBottom: 20,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
    },
    instructorInfo: {
        flex: 1,
        marginLeft: 12,
    },
    instructorName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    instructorTitle: {
        fontSize: 11,
        color: '#64748B',
        marginTop: 1,
    },
    followBtn: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    followBtnText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#2563EB',
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
        marginBottom: 24,
    },
    statBox: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    statIcon: {
        fontSize: 16,
        marginBottom: 4,
    },
    statVal: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    statLabel: {
        fontSize: 10,
        color: '#64748B',
        marginTop: 2,
    },
    actionBtn: {
        flexDirection: 'row',
        height: 52,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 3,
    },
    actionBtnNotEnrolled: {
        backgroundColor: '#2563EB',
    },
    actionBtnEnrolled: {
        backgroundColor: '#F1F5F9',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowOpacity: 0, // Disable shadow for enrolled
    },
    actionBtnIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    actionBtnText: {
        fontSize: 15,
        fontWeight: '700',
    },
    actionBtnTextNotEnrolled: {
        color: '#FFFFFF',
    },
    actionBtnTextEnrolled: {
        color: '#64748B',
    },
    tabBar: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        marginBottom: 20,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabItemActive: {
        borderBottomColor: '#2563EB',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748B',
    },
    tabTextActive: {
        color: '#2563EB',
    },
    tabBody: {
        paddingBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 10,
    },
    bodyDescription: {
        fontSize: 14,
        color: '#475569',
        lineHeight: 22,
        marginBottom: 24,
    },
    learnContainer: {
        marginBottom: 24,
    },
    learnItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkmarkCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkmark: {
        fontSize: 11,
        fontWeight: '800',
        color: '#2563EB',
    },
    learnText: {
        flex: 1,
        fontSize: 13,
        color: '#475569',
    },
    reqsContainer: {
        marginBottom: 10,
    },
    reqItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    bulletPoint: {
        fontSize: 14,
        color: '#2563EB',
        fontWeight: '800',
        marginRight: 8,
        marginTop: -2,
    },
    reqText: {
        flex: 1,
        fontSize: 13,
        color: '#475569',
        lineHeight: 18,
    },
    curriculumPlaceholderBox: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    placeholderBoxTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#334155',
    },
    placeholderBoxSub: {
        fontSize: 11,
        color: '#64748B',
        marginTop: 4,
    },
    reviewBox: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    reviewAuthor: {
        fontSize: 12,
        fontWeight: '700',
        color: '#334155',
    },
    reviewStars: {
        fontSize: 10,
    },
    reviewComment: {
        fontSize: 12,
        color: '#475569',
        lineHeight: 18,
    },
    floatingHeader: {
        position: 'absolute',
        top: 40, // Height spacing for iOS status bar overlaps
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    floatingHeaderBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(15, 23, 42, 0.45)', // Translucent dark gray circle
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatingHeaderBtnIcon: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bookmarkFilled: {
        color: '#F59E0B',
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8FAFC',
    },
    errorText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#64748B',
        marginBottom: 16,
    },
    backBtn: {
        backgroundColor: '#2563EB',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    backBtnText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
});
