import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabParamList } from '../../features/courses/type'

import { Home, BookOpen, CheckCircle, User } from 'lucide-react-native'
import HomeScreen from '../../features/courses/screens/HomeScreen'
import CoursesScreen from '../../features/courses/screens/CoursesScreen'
import EnrolledScreen from '../../features/courses/screens/EnrolledScreen'
import UserProfileScreen from '../../features/courses/screens/UserProfileScreen'

const Tab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Home') {
                        return <Home size={size} color={color} />
                    }
                    if (route.name === 'Courses') {
                        return <BookOpen size={size} color={color} />
                    }
                    if (route.name === 'Enrolled') {
                        return <CheckCircle size={size} color={color} />
                    }
                    return <User size={size} color={color} />
                },

                tabBarActiveTintColor: '#2563EB',
                tabBarInactiveTintColor: '#94A3B8',

                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    height: 65,
                    elevation: 8,
                    paddingTop: 5,
                    paddingBottom: 5,
                },
                tabBarItemStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                }

            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Courses" component={CoursesScreen} />
            <Tab.Screen name="Enrolled" component={EnrolledScreen} />
            <Tab.Screen name="Profile" component={UserProfileScreen} />
        </Tab.Navigator>
    )
}