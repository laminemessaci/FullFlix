import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import HomeScreen from './src/screens/HomeScreen';
import {Provider} from 'react-redux';
import Store from './src/store/ConfigureStore';

const App = () => {
  return (
    <Provider store={Store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
