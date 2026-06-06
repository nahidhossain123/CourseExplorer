import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './naigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { database } from '../db/watermelon/database';
import { sync } from '../sync/engine';
import 'react-native-url-polyfill/auto';
import { bootstrapApp } from './bootstrap';

function App() {
  useEffect(() => {
    bootstrapApp();
  }, []);
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
