import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useCourseStore } from '../../../store/courseStore';
import { RootStackParamList } from '../../../features/courses/type';
import AppSafeArea from '../../../shared/components/layout/AppSafeArea';
import { fontSize, fontweight } from '../../../shared/theme/typography';
import { colors } from '../../../shared/theme/colors';
import { radius } from '../../../shared/theme/radius';
import { spacingX, spacingY } from '../../../shared/theme/spacing';
import { scale, verticalScale } from '../../../shared/utils/dimensions';

type CourseDetailRouteProp = RouteProp<RootStackParamList, 'CourseDetail'>;

const { width } = Dimensions.get('window');

export default function CourseDetailScreen() {
    const route = useRoute<CourseDetailRouteProp>();
    const navigation = useNavigation();
    const { courseId } = route.params;

    const course = useCourseStore((state) => state.courses.find((c) => c.courseId === courseId));
    //   const toggleEnrollment = useCourseStore((state) => );


    const [activeTab, setActiveTab] = useState<'Overview' | 'Curriculum' | 'Reviews'>('Overview');

    if (!course) {
        return (
            <AppSafeArea>
                <Text style={styles.errorText}>Course not found.</Text>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backBtnText}>Go Back</Text>
                </TouchableOpacity>
            </AppSafeArea>
        );
    }

    const handleEnrollToggle = () => {
        // toggleEnrollment(course.id);
    };

    const imageUrl = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop';

    return (
        <AppSafeArea>
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
                        style={[styles.actionBtn, course.isEnrolled ? styles.actionBtnEnrolled : styles.actionBtnNotEnrolled]}
                        onPress={handleEnrollToggle}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.actionBtnIcon, course.isEnrolled ? styles.actionBtnTextEnrolled : styles.actionBtnTextNotEnrolled]}>
                            {course.isEnrolled ? '✓' : '🎓'}
                        </Text>
                        <Text style={[styles.actionBtnText, course.isEnrolled ? styles.actionBtnTextEnrolled : styles.actionBtnTextNotEnrolled]}>
                            {course.isEnrolled ? 'Enrolled (Tap to Cancel)' : 'Enroll Now'}
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
                    <Text style={[styles.floatingHeaderBtnIcon, course.isEnrolled && styles.bookmarkFilled]}>
                        {course.isEnrolled ? '★' : '☆'}
                    </Text>
                </TouchableOpacity>
            </View>
        </AppSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingBottom: scale(40),
    },
    heroSection: {
        width: width,
        height: scale(280),
        position: 'relative',
        backgroundColor: colors.background,
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
        bottom: spacingY._24,
        left: spacingX._16,
        right: spacingX._16,
    },
    categoryBadge: {
        backgroundColor: 'rgba(184, 51, 51, 0.2)',
        alignSelf: 'flex-start',
        paddingHorizontal: spacingX._10,
        paddingVertical: spacingY._4,
        borderRadius: radius._6,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: spacingY._10,
    },
    categoryBadgeText: {
        color: colors.white,
        fontSize: fontSize._12,
        fontWeight: fontweight.bold,
        letterSpacing: 0.5,
    },
    heroTitle: {
        fontSize: fontSize._28,
        fontWeight: fontweight.extrabold,
        color: colors.white,
        lineHeight: fontSize._32,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: radius._4,
    },
    detailsCard: {
        backgroundColor: colors.surface,
        borderTopLeftRadius: radius._24,
        borderTopRightRadius: radius._24,
        marginTop: -20,
        paddingTop: spacingY._24,
        paddingHorizontal: spacingX._16,
    },
    instructorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surfaceSoft,
        padding: spacingX._12,
        borderRadius: radius._16,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: spacingY._20,
    },
    avatar: {
        width: scale(44),
        height: scale(44),
        borderRadius: radius._24,
    },
    instructorInfo: {
        flex: 1,
        marginLeft: spacingX._12,
    },
    instructorName: {
        fontSize: fontSize._14,
        fontWeight: fontweight.bold,
        color: colors.textDark,
    },
    instructorTitle: {
        fontSize: fontSize._12,
        color: colors.textMuted,
        marginTop: spacingY._2,
    },
    followBtn: {
        backgroundColor: colors.white,
        paddingHorizontal: spacingX._12,
        paddingVertical: spacingY._6,
        borderRadius: radius._8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    followBtnText: {
        fontSize: fontSize._12,
        fontWeight: fontweight.bold,
        color: colors.primary,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacingX._8,
        marginBottom: spacingY._24,
    },
    statBox: {
        flex: 1,
        backgroundColor: colors.surfaceSoft,
        borderRadius: radius._8,
        paddingVertical: spacingY._12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.borderSoft,
    },
    statIcon: {
        fontSize: fontSize._16,
        marginBottom: spacingY._4,
    },
    statVal: {
        fontSize: fontSize._14,
        fontWeight: fontweight.bold,
        color: colors.textDark,
    },
    statLabel: {
        fontSize: fontSize._10,
        color: colors.textSecondary,
        marginTop: spacingY._2,
    },
    actionBtn: {
        flexDirection: 'row',
        height: scale(52),
        borderRadius: radius._8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacingY._20,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: radius._8,
        elevation: 3,
    },
    actionBtnNotEnrolled: {
        backgroundColor: colors.primary,
    },
    actionBtnEnrolled: {
        backgroundColor: '#F1F5F9',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowOpacity: 0, // Disable shadow for enrolled
    },
    actionBtnIcon: {
        fontSize: fontSize._18,
        marginRight: spacingX._10,
    },
    actionBtnText: {
        fontSize: fontSize._16,
        fontWeight: fontweight.bold,
    },
    actionBtnTextNotEnrolled: {
        color: colors.white,
    },
    actionBtnTextEnrolled: {
        color: colors.textSecondary,
    },
    tabBar: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.borderSoft,
        marginBottom: spacingY._20,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacingY._12,
        borderBottomWidth: spacingY._2,
        borderBottomColor: 'transparent',
    },
    tabItemActive: {
        borderBottomColor: colors.primary,
    },
    tabText: {
        fontSize: fontSize._14,
        fontWeight: fontweight.semibold,
        color: colors.textSecondary,
    },
    tabTextActive: {
        color: colors.primary,
    },
    tabBody: {
        paddingBottom: spacingY._20,
    },
    sectionTitle: {
        fontSize: fontSize._16,
        fontWeight: fontweight.bold,
        color: colors.textDark,
        marginBottom: spacingY._10,
    },
    bodyDescription: {
        fontSize: fontSize._14,
        color: colors.textSecondary,
        lineHeight: fontSize._20,
        marginBottom: spacingY._24,
    },
    learnContainer: {
        marginBottom: spacingY._24,
    },
    learnItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacingY._12,
    },
    checkmarkCircle: {
        width: scale(20),
        height: verticalScale(20),
        borderRadius: radius._8,
        backgroundColor: colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacingX._10,
    },
    checkmark: {
        fontSize: fontSize._12,
        fontWeight: fontweight.extrabold,
        color: colors.primary,
    },
    learnText: {
        flex: 1,
        fontSize: fontSize._12,
        color: colors.textSecondary,
    },
    reqsContainer: {
        marginBottom: spacingY._10,
    },
    reqItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacingY._8,
    },
    bulletPoint: {
        fontSize: fontSize._14,
        color: colors.primary,
        fontWeight: fontweight.extrabold,
        marginRight: spacingX._8,
        marginTop: -2,
    },
    reqText: {
        flex: 1,
        fontSize: fontSize._12,
        color: colors.textSecondary,
        lineHeight: fontSize._18,
    },
    curriculumPlaceholderBox: {
        backgroundColor: colors.surfaceSoft,
        borderRadius: radius._12,
        padding: spacingX._12,
        marginBottom: spacingY._10,
        borderWidth: 1,
        borderColor: colors.border,
    },
    placeholderBoxTitle: {
        fontSize: fontSize._12,
        fontWeight: fontweight.bold,
        color: colors.textDark,
    },
    placeholderBoxSub: {
        fontSize: fontSize._12,
        color: colors.textMuted,
        marginTop: spacingY._4,
    },
    reviewBox: {
        backgroundColor: colors.surface,
        borderRadius: radius._12,
        padding: spacingX._12,
        marginBottom: spacingY._10,
        borderWidth: 1,
        borderColor: colors.border,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacingY._6,
    },
    reviewAuthor: {
        fontSize: fontSize._12,
        fontWeight: fontweight.bold,
        color: colors.textDark,
    },
    reviewStars: {
        fontSize: fontSize._10,
    },
    reviewComment: {
        fontSize: fontSize._12,
        color: colors.textLight,
        lineHeight: fontSize._18,
    },
    floatingHeader: {
        position: 'absolute',
        top: spacingY._20, // Height spacing for iOS status bar overlaps
        left: spacingX._16,
        right: spacingX._16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    floatingHeaderBtn: {
        width: scale(40),
        height: scale(40),
        borderRadius: radius._20,
        backgroundColor: colors.surfaceSoft,
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatingHeaderBtnIcon: {
        color: colors.white,
        fontSize: fontSize._18,
        fontWeight: fontweight.bold,
    },
    bookmarkFilled: {
        color: colors.warning,
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
    },
    errorText: {
        fontSize: fontSize._16,
        fontWeight: fontweight.medium,
        color: colors.textLight,
        marginBottom: spacingY._16,
    },
    backBtn: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacingX._20,
        paddingVertical: spacingY._10,
        borderRadius: radius._8,
    },
    backBtnText: {
        color: colors.white,
        fontSize: fontSize._14,
        fontWeight: fontweight.bold,
    },
});
