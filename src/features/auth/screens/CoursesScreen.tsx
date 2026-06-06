import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppSafeArea from '../../../shared/components/layout/AppSafeArea'
import CourseHeader from '../components/CourseHeader'
import Courses from '../components/Courses'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import CourseFilter from '../components/CourseFilter'
import { useCourseStore } from '../../../store/courseStore'
import { useFocusEffect } from '@react-navigation/native'

export default function CoursesScreen() {
    const courses = useCourseStore((state) => state.courses);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [open, setOpen] = useState(false)

    const handleToggle = () => {
        setOpen(prev => {
            const next = !prev;

            if (next) {
                bottomSheetRef.current?.expand();
            } else {
                bottomSheetRef.current?.close();
            }

            return next;
        });
    };

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                pressBehavior="close"
            />
        ),
        []
    );

    useEffect(() => {
        console.log('courses', courses)
    }, [courses])

    useFocusEffect(
        useCallback(() => {
            return () => {
                bottomSheetRef.current?.close();
                setOpen(false);
            };
        }, [])
    );

    return (
        <>
            <View style={{ flex: 1 }}>
                <CourseHeader onFilterClick={handleToggle} open={open} />
                <Courses />
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                enablePanDownToClose={true}
                onChange={(index) => {
                    console.log('Checnage')
                    setOpen(!open)
                }}
                index={-1}
                snapPoints={["30%", "60%"]}
                backdropComponent={renderBackdrop}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <CourseFilter />
                </BottomSheetView>
            </BottomSheet>
        </>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
    },
})