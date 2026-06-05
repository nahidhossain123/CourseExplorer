import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabParamList } from '../../features/courses/type'
import HomeScreen from '../../features/auth/screens/HomeScreen'
import CoursesScreen from '../../features/auth/screens/CoursesScreen'
import UserProfileScreen from '../../features/auth/screens/UserProfileScreen'
import EnrolledScreen from '../../features/auth/screens/EnrolledScreen'
import { Home, BookOpen, CheckCircle, User } from 'lucide-react-native'

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
                    borderTopWidth: 0,
                    elevation: 8,
                    height: 60,
                },

                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 5,
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Courses" component={CoursesScreen} />
            <Tab.Screen name="Enrolled" component={EnrolledScreen} />
            <Tab.Screen name="Profile" component={UserProfileScreen} />
        </Tab.Navigator>
    )
}