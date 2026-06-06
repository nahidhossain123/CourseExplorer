import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CourseType } from '../../courses/type';

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
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 16,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: 88,
        height: 88,
        borderRadius: 12,
        backgroundColor: '#E2E8F0',
    },
    content: {
        flex: 1,
        marginLeft: 14,
        justifyContent: 'center',
        paddingRight: 60, // Leave space for the enroll action button
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
        lineHeight: 20,
        marginBottom: 2,
    },
    instructor: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 6,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        flexWrap: 'wrap',
        gap: 8,
    },
    badge: {
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#2563EB',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#F59E0B',
        marginRight: 4,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    star: {
        fontSize: 10,
        marginRight: 1,
    },
    starFilled: {
        color: '#F59E0B',
    },
    starEmpty: {
        color: '#CBD5E1',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0F172A',
    },
    duration: {
        fontSize: 11,
        color: '#64748B',
        marginLeft: 4,
    },
    enrollButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        minWidth: 72,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notEnrolledButton: {
        backgroundColor: '#2563EB',
    },
    enrolledButton: {
        backgroundColor: '#F1F5F9',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    enrollButtonText: {
        fontSize: 11,
        fontWeight: '700',
    },
    notEnrolledButtonTextActive: {
        color: '#FFFFFF',
    },
    enrolledButtonTextActive: {
        color: '#64748B',
    },
});
