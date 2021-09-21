import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return <StackNavigator />;
};

export default App;
