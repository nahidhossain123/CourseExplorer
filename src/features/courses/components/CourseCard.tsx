import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CourseType } from '../../courses/type';
import { radius } from '../../../shared/theme/radius';
import { spacingX, spacingY } from '../../../shared/theme/spacing';
import { shadows } from '../../../shared/theme/shadows';
import { fontSize, fontweight } from '../../../shared/theme/typography';
import { colors } from '../../../shared/theme/colors';

interface CourseCardProps {
    course: CourseType;
    onPress: () => void;
    onEnrollPress: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = React.memo(({
    course,
    onPress,
    onEnrollPress,
}) => {
    // Simple stars helper
    const renderStars = (rating: number) => {
        const stars = [];
        const floorRating = Math.floor(rating);
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Text key={i} style={[styles.star, i <= floorRating ? styles.starFilled : styles.starEmpty]}>
                    ★
                </Text>
            );
        }
        return stars;
    };

    // Fallback image url if none is provided
    const imageUrl = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=300&auto=format&fit=crop';

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            <Image source={{ uri: imageUrl }} style={styles.image} />

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {course.title}
                </Text>

                <Text style={styles.instructor}>
                    by {course.instructorName}
                </Text>

                <View style={styles.metaRow}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{course.tags}</Text>
                    </View>

                    <View style={styles.ratingRow}>
                        <Text style={styles.ratingText}>{course.rating.toFixed(1)}</Text>
                        <View style={styles.starsContainer}>{renderStars(course.rating)}</View>
                    </View>
                </View>

                <View style={styles.priceRow}>
                    <Text style={styles.price}>
                        {course.priceUsd === 0 ? 'Free' : `$${course.priceUsd.toFixed(2)}`}
                    </Text>
                    <Text style={styles.duration}>
                        • {course.durationWeeks}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={[styles.enrollButton, course.isEnrolled ? styles.enrolledButton : styles.notEnrolledButton]}
                onPress={onEnrollPress}
                activeOpacity={0.7}
            >
                <Text style={[styles.enrollButtonText, course.isEnrolled ? styles.enrolledButtonTextActive : styles.notEnrolledButtonTextActive]}>
                    {course.isEnrolled ? 'Enrolled' : 'Enroll'}
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: radius._16,
        padding: spacingX._12,
        marginVertical: spacingY._8,
        marginHorizontal: spacingX._16,
        ...shadows.md,
        elevation: 2,
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: 88,
        height: 88,
        borderRadius: radius._12,
        backgroundColor: colors.borderSoft,
    },
    content: {
        flex: 1,
        marginLeft: spacingX._12,
        justifyContent: 'center',
        paddingRight: 60,
    },
    title: {
        fontSize: fontSize._16,
        fontWeight: fontweight.bold,
        color: colors.textPrimary,
        lineHeight: fontSize._20,
        marginBottom: 2,
    },
    instructor: {
        fontSize: fontSize._12,
        color: colors.textMuted,
        marginBottom: spacingY._8,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacingY._8,
        flexWrap: 'wrap',
        gap: spacingX._8,
    },
    badge: {
        backgroundColor: colors.primaryLight,
        paddingHorizontal: spacingX._8,
        paddingVertical: spacingY._2,
        borderRadius: radius._6,
    },
    badgeText: {
        fontSize: fontSize._10,
        fontWeight: '600',
        color: colors.primary,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: fontSize._12,
        fontWeight: fontweight.bold,
        color: colors.warning,
        marginRight: spacingX._4,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    star: {
        fontSize: fontSize._10,
        marginRight: spacingX._2,
    },
    starFilled: {
        color: colors.warning,
    },
    starEmpty: {
        color: colors.textGray,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: fontSize._12,
        fontWeight: fontweight.bold,
        color: '#0F172A',
    },
    duration: {
        fontSize: fontSize._12,
        color: '#64748B',
        marginLeft: spacingX._4,
    },
    enrollButton: {
        position: 'absolute',
        right: spacingX._12,
        bottom: spacingY._12,
        paddingHorizontal: spacingX._12,
        paddingVertical: spacingY._8,
        borderRadius: radius._8,
        minWidth: 72,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notEnrolledButton: {
        backgroundColor: colors.primary,
    },
    enrolledButton: {
        backgroundColor: colors.surfaceSoft,
        borderWidth: 1,
        borderColor: colors.border,
    },
    enrollButtonText: {
        fontSize: fontSize._12,
        fontWeight: fontweight.bold,
    },
    notEnrolledButtonTextActive: {
        color: colors.white,
    },
    enrolledButtonTextActive: {
        color: colors.textMuted,
    },
});
