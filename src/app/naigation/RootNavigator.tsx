import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../features/courses/type';
import CoursesScreen from '../../features/auth/screens/CoursesScreen';
import CourseDetailScreen from '../../features/auth/screens/CourseDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Courses"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F8FAFC' }, // modern light gray/blue background
        }}
      >
        <Stack.Screen name="Courses" component={CoursesScreen} />
        <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
