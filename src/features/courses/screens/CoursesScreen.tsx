import { View, StyleSheet } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import CourseFilter from '../components/CourseFilter'
import AppSafeArea from '../../../shared/components/layout/AppSafeArea'
import CourseHeader from '../components/CourseHeader'
import Courses from '../components/Courses'
import { spacingX } from '../../../shared/theme/spacing'

export default function CoursesScreen() {
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

    return (
        <AppSafeArea>
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
        </AppSafeArea>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: spacingX._36,
        alignItems: 'center',
    },
})