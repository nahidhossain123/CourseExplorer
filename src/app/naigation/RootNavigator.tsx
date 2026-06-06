import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../features/courses/type';
import BottomTabNavigator from './BottomTabNavigator';
import CourseDetailScreen from '../../features/courses/screens/CourseDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F8FAFC' },
        }}
      >
        {/* Main App (Tabs) */}
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />

        {/* Stack-only screens */}
        <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
