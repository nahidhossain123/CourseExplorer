/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../src/app/App';

jest.mock('../src/app/naigation/RootNavigator', () => {
  const { Text } = require('react-native');
  const React = require('react');
  return () => <Text>Mock Root Navigator</Text>;
});

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
