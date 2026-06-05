import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppSafeArea from '../../../shared/components/layout/AppSafeArea'
import CourseHeader from '../components/CourseHeader'
import Courses from '../components/Courses'

export default function CoursesScreen() {
    return (
        <AppSafeArea>
            <View>
                <CourseHeader />
                <Courses />
            </View>
        </AppSafeArea>
    )
}